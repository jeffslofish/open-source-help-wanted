import React, { useReducer } from 'react';
import GithubContext from './GithubContext';
import GithubReducer from './githubReducer';
import { SEARCH_ISSUES, SET_LOADING } from '../types';

const GithubState = props => {
  const initialState = {
    issues: [],
    totalCount: 0,
    resultsPerPage: 25,
    page: 1,
    loading: false
  };

  const [state, dispatch] = useReducer(GithubReducer, initialState);

  const setLoading = () => dispatch({ type: SET_LOADING });

  const search = (
    page,
    resultsPerPage,
    labels,
    keywords,
    language,
    sortType,
    sortDesc,
    issueAssigned
  ) => {
    setLoading();

    let labelQuery = formatSearchTerms(labels, 'label:');
    let keywordQuery = formatSearchTerms(keywords, '');
    let languageQuery =
      language.length > 0 ? '+language:' + encodeURIComponent(language) : '';

    let maybePlus = '+';
    if (keywordQuery === '' || labelQuery === '') {
      maybePlus = '';
    }

    let sortOrder = JSON.parse(sortDesc) ? 'desc' : 'asc';
    let issueAssignedState = JSON.parse(issueAssigned) ? '' : '+no:assignee';
    let searchQuery =
      keywordQuery +
      maybePlus +
      labelQuery +
      languageQuery +
      '+type:issue+state:open' +
      issueAssignedState +
      '&page=' +
      page +
      '&sort=' +
      encodeURIComponent(sortType) +
      '&order=' +
      sortOrder +
      '&per_page=' +
      resultsPerPage;

    let myRequest = new Request('/api/github/rest?q=' + searchQuery);

    fetch(myRequest)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        dispatch({
          type: SEARCH_ISSUES,
          payload: {
            issues: data.items,
            totalCount: Number.parseInt(data.total_count, 10),
            page: page
          }
        });
      })
      .catch(function(err) {
        console.log(err); //TODO: proper error handling
      });
  };

  return (
    <GithubContext.Provider
      value={{
        issues: state.issues,
        totalCount: state.totalCount,
        resultsPerPage: state.resultsPerPage,
        page: state.page,
        loading: state.loading,
        search
      }}
    >
      {props.children}
    </GithubContext.Provider>
  );
};

function formatSearchTerms(searchTerms, label) {
  let query = '';

  if (searchTerms.length > 0) {
    let terms = searchTerms.split(',');

    for (let term of terms) {
      query += label + '"' + encodeURIComponent(term.trim()) + '"+';
    }
    if (query.length > 0) {
      query = query.slice(0, -1);
    }
  }
  return query;
}

export default GithubState;
