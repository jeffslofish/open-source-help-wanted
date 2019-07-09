const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');
const querystring = require('querystring');
const config = require('./config.js');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());

var configHeader = {
  headers: { 'Authorization': "bearer " + config.apiToken }
};

app.get('/github/rest', (req, res) => {
  const query = querystring.stringify(req.query);

  console.log(query);

  axios.get(`https://api.github.com/search/issues?q=${query}`, configHeader)
    .then(response => {
      //console.log(response);
      res.send(response.data)
    })
    .catch(error => {
      console.log(error);
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
