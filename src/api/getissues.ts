import * as dotenv from 'dotenv'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();
import axios from 'axios';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

export async function handler(
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> {
  const { queryStringParameters } = event;
  const oauthCode = queryStringParameters?.oauthCode;
  let accessToken: string | undefined | null =
    queryStringParameters?.accessToken;

  if (accessToken === 'null' || !accessToken) {
    const res = await axios({
      method: 'post',
      url: 'https://github.com/login/oauth/access_token',
      data: {
        client_id: process.env.REACT_APP_CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        code: oauthCode,
        redirect_uri: process.env.REACT_APP_REDIRECT_URI,
      },
    });

    const resParams = new URLSearchParams(res.data);
    accessToken = resParams.get('access_token');
  }
  const config = {
    headers: { Authorization: 'bearer ' + accessToken },
    validateStatus: function () {
      return true;
    },
  };

  const params = new URLSearchParams();
  if (queryStringParameters?.q) {
    params.set('q', queryStringParameters.q);
    queryStringParameters?.page &&
      params.set('page', queryStringParameters.page);
    queryStringParameters?.sort &&
      params.set('sort', queryStringParameters.sort);
    queryStringParameters?.order &&
      params.set('order', queryStringParameters.order);
    queryStringParameters?.per_page &&
      params.set('per_page', queryStringParameters.per_page);

    const res = await axios.get(
      `https://api.github.com/search/issues?${params}`,
      config
    );
    const body =
      res.status === 200
        ? JSON.stringify({ ...res.data, accessToken })
        : JSON.stringify(res.data.message);
    return {
      statusCode: res.status,
      body,
    };
  } else {
    return {
      statusCode: 400,
      body: 'Error: missing query string parameter "q"',
    };
  }
}
