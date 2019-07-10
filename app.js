const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');
const querystring = require('querystring');
const config = require('./config.js');
const app = express();

const port = process.env.PORT || 5000;

//todo maybe don't need this if we use proxy correctly
//app.use(cors()); 

// Serve static files from the React app
//app.use(express.static(path.join(__dirname, 'client/build')));

// Put all API endpoints under '/api'
app.get('/api/github/rest', (req, res) => {
  console.log('/api/github/rest');

  const query = querystring.stringify(req.query);
  const configHeader = {
    headers: { 'Authorization': "bearer " + config.apiToken }
  };

  axios.get(`https://api.github.com/search/issues?q=${query}`, configHeader)
    .then(response => {
      res.send(response.data)
    })
    .catch(error => {
      console.log(error);
    });
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  console.log('*');
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
