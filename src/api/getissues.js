const axios = require('axios');

exports.handler = function (event, _context, callback) {
  let params = new URLSearchParams(event.queryStringParameters);
  const query = `q=${params.get('q')}`;
  const page = params.get('page');
  const sort = params.get('sort');
  const order = params.get('order');
  const perPage = params.get('per_page');
  const oauthCode = params.get('oauthCode');
  const accessToken = params.get('accessToken');
  const masterQuery = `q=${params.get(
    'q'
  )}&page=${page}&sort=${sort}&order=${order}&per_page=${perPage}`;

  function getIssues(query, accessToken, callback) {
    const configHeader = {
      headers: { Authorization: 'bearer ' + accessToken },
    };

    axios
      .get(`https://api.github.com/search/issues?${query}`, configHeader)
      .then((response) => {
        if (response.status !== 200) {
          callback(null, {
            statusCode: response.status,
            body: JSON.stringify(response.data.message),
          });
        } else {
          const data = { ...response.data, accessToken };

          callback(null, {
            statusCode: 200,
            body: JSON.stringify(data),
          });
        }
      })
      .catch((error) => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          //console.log('not 200');
          //console.log(error.response.data);
          //console.log(error.response.status);
          //console.log(error.response.headers);

          if (error.response.data.message) {
            callback(null, {
              statusCode: error.response.status,
              body: JSON.stringify({ message: error.response.data.message }),
            });
          }
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log('no data received');
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('unkown error');
          console.log('Error', error.message);
        }
        //console.log(error.config);
      });
  }

  if (accessToken !== 'null') {
    console.log('access token not null');
    getIssues(masterQuery, accessToken, callback);
  } else {
    console.log('access token is null');
    axios({
      method: 'post',
      url: 'https://github.com/login/oauth/access_token',
      data: {
        client_id: process.env.REACT_APP_CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        code: oauthCode,
        redirect_uri: process.env.REACT_APP_REDIRECT_URI,
      },
    })
      .then((res) => {
        console.log(res.data);

        const params2 = new URLSearchParams(res.data);
        const accessToken = params2.get('access_token');

        console.log('access token inside: ', accessToken);

        getIssues(masterQuery, accessToken, callback);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //

  // https: if (oauthCode) {
  //   fetch(`https://gitstar.herokuapp.com/authenticate/${code}`)
  //     .then((response) => response.json())
  //     .then(({ token }) => {
  //       this.setState({
  //         token,
  //         status: STATUS.FINISHED_LOADING,
  //       });
  //     });
  // }
};
