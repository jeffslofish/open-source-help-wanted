const express = require('express');
const axios = require('axios');
const path = require('path');
const querystring = require('querystring');
const fs = require('fs');
const { request } = require('https');
const { readFile } = require('fs');
const { resolve } = require('path');
const bodyParser = require("body-parser");

const app = express();

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const apiToken = process.env.API_TOKEN;
const port = process.env.PORT || 5000;

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Use body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());




const axiosGitHubGraphQL = axios.create({
  baseURL: 'https://api.github.com/graphql',
  headers: {
    Authorization: `bearer ${process.env.API_TOKEN}`,
  },
});

// Put all API endpoints under '/api'
app.post('/api/github/graphql', (req, res) => {
  console.log('/api/github/graphql');

  let firstOrLast = 'first';
  if (req.body.startCursor) {
    firstOrLast = 'last'
  } 
  const myQuery = `
query IssuesQuery($searchQuery: String!, $pageSize: Int, $startCursor: String, $endCursor: String) {
  search(query: $searchQuery, ${firstOrLast}: $pageSize, before: $startCursor, after: $endCursor, type: ISSUE) {
    issueCount
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    nodes {
      ... on Issue {
        repository {
          owner {
            url
            avatarUrl
          }
          languages(first: 5) {
            nodes {
              id
              name
              color
            }
          }
        }
        id
        state
        title
        body
        author {
          url
          avatarUrl
        }
        url
        title
        assignees(first: 10) {
          nodes {
            ... on User {
              id
              url
              avatarUrl
            }
          }
        }
        createdAt
        updatedAt
        body
        labels(first: 10) {
          totalCount
          nodes {
            id
            name
            color
          }
        }
      }
    }
  }
}
`;


  console.log(req.body);

  axiosGitHubGraphQL
    .post('', {
      query: myQuery,
      variables: {
        "searchQuery": 'jeffslofish', //`${req.query.labels}`,
        "pageSize": req.body.pageSize,
        "startCursor": req.body.startCursor,
        "endCursor": req.body.endCursor
      }
    })
    .then(result => res.send(result.data))
    .catch(err => console.log(err))
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  console.log('*');
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
