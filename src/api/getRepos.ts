import * as dotenv from 'dotenv';
dotenv.config();
import axios from 'axios';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

export async function handler(
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> {
  const { queryStringParameters } = event;
  const accessToken = queryStringParameters?.accessToken;

  if (!accessToken) {
    throw new Error(`Access token not specified`);
  }

  const config = {
    headers: { Authorization: 'bearer ' + accessToken },
    validateStatus: function () {
      return true;
    },
  };

  const params = new URLSearchParams();
  if (queryStringParameters?.q) {
    params.set('q', queryStringParameters?.q);
    queryStringParameters?.page &&
      params.set('page', queryStringParameters.page);
    queryStringParameters?.sort &&
      params.set('sort', queryStringParameters.sort);
    queryStringParameters?.order &&
      params.set('order', queryStringParameters.order);
    queryStringParameters?.per_page &&
      params.set('per_page', queryStringParameters.per_page);

    const res = await axios.get(
      `https://api.github.com/search/repositories?${params}`,
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
