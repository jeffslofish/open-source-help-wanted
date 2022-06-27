const axios = require('axios');

exports.handler = function (event, _context, callback) {
  let params = new URLSearchParams(event.queryStringParameters);
  const query = `q=${params.get('q')}`;
  const apiToken = params.get('oauthCode');
  const configHeader = {
    headers: { Authorization: 'token ' + apiToken },
  };

  axios
    .get(`https://api.github.com/search/issues?${query}`, configHeader)
    .then((response) => {
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(response.data),
      });
    })
    .catch((error) => {
      console.log(error);
    });
};
