import * as dotenv from 'dotenv'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();
import axios from 'axios';

export async function handler(event) {
  const params = new URLSearchParams(event.queryStringParameters);
  const oauthCode = params.get('oauthCode');
  let accessToken = params.get('accessToken');
  params.delete('oauthCode');
  params.delete('accessToken');
  if (accessToken === 'null') {
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
}
