const axios = require('axios');

exports.handler = async function (event, _context) {
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
    validateStatus: function (status) {
      return true;
    },
  };

  const res = await axios.get(
    `https://api.github.com/search/issues?${params}`,
    config
  );

  if (res.status !== 200) {
    return {
      statusCode: res.status,
      body: JSON.stringify(res.data.message),
    };
  } else {
    return {
      statusCode: 200,
      body: JSON.stringify({ ...res.data, accessToken }),
    };
  }
};
