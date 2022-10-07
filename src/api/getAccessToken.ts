import * as dotenv from 'dotenv';
dotenv.config();
import axios from 'axios';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

export async function handler(
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> {
  const { queryStringParameters } = event;
  const oauthCode = queryStringParameters?.oauthCode;

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
  const accessToken = resParams.get('access_token');

  if (accessToken) {
    return {
      statusCode: 200,
      body: accessToken,
    };
  }

  return {
    statusCode: 500,
    body: 'Unable to generate access token',
  };
}
