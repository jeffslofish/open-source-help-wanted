import * as dotenv from 'dotenv';
dotenv.config();
import axios from 'axios';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

export async function handler(
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> {
  const { queryStringParameters: queryParam } = event;
  const accessToken = queryParam?.accessToken;

  if (!accessToken) {
    throw new Error(`Access token not specified`);
  }

  const config = {
    headers: { Authorization: 'bearer ' + accessToken },
    validateStatus: function () {
      return true;
    },
  };

  const gitHubParams = new URLSearchParams();
  if (!queryParam?.resource) {
    return {
      statusCode: 400,
      body: 'Error: Missing query string parameter "resource".',
    };
  }

  if (
    queryParam?.resource !== 'issues' &&
    queryParam?.resource !== 'repositories'
  ) {
    return {
      statusCode: 400,
      body: 'Error: Query string parameter "resource" must be "issues" or "repositories".',
    };
  }

  if (!queryParam?.q) {
    return {
      statusCode: 400,
      body: 'Error: Missing query string parameter "q".',
    };
  }

  gitHubParams.set('q', queryParam.q);
  queryParam?.page && gitHubParams.set('page', queryParam.page);
  queryParam?.sort && gitHubParams.set('sort', queryParam.sort);
  queryParam?.order && gitHubParams.set('order', queryParam.order);
  queryParam?.per_page && gitHubParams.set('per_page', queryParam.per_page);

  const res = await axios.get(
    `https://api.github.com/search/${queryParam.resource}?${gitHubParams}`,
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
}
