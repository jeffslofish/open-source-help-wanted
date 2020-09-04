const axios = require('axios');
const querystring = require('querystring');

exports.handler = function (event, _context, callback) {
  if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
  }

  const apiToken = process.env.API_TOKEN;
  const query = querystring.stringify(event.queryStringParameters);

  // Only use an authorization header if there is an apiToken defined from the .env file
  const configHeader =
    typeof apiToken === 'undefined'
      ? null
      : {
          headers: { Authorization: 'bearer ' + apiToken },
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
