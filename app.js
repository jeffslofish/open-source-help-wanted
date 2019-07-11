const express = require('express');
const axios = require('axios');
const path = require('path');
const querystring = require('querystring');
const fs = require('fs');
const { request } = require('https')
const { readFile } = require('fs')
const { resolve } = require('path')

const app = express();

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const apiToken = process.env.API_TOKEN;
const port = process.env.PORT || 5000;

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

const myQuery = `query IssuesQuery($searchQuery: String!, $pageSize: Int) {
  search(query: $searchQuery, first: $pageSize, type: ISSUE) {
    issueCount
    edges {
      cursor
      node {
        ... on Issue {
          id
          title
          body
          author {
            url
            avatarUrl
          }
          url
          title
          assignees(first: 10) {
            edges {
              node {
                ... on User {
                  id
                  url
                  avatarUrl
                }
              }
            }
          }
          createdAt
          updatedAt
          body
          labels(first: 10) {
            totalCount
            nodes {
              name
              color
            }
          }
        }
      }
    }
  }
}
`;

const axiosGitHubGraphQL = axios.create({
  baseURL: 'https://api.github.com/graphql',
  headers: {
    Authorization: `bearer ${process.env.API_TOKEN}`,
  },
});

// Put all API endpoints under '/api'
app.get('/api/github/rest', (req, res) => {
  console.log('/api/github/rest');

  axiosGitHubGraphQL
    .post('', {
      query: myQuery,
      variables: {
        "searchQuery": "test",
        "pageSize": 25
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
