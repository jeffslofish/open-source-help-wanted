import React, { useReducer } from 'react';
import GithubContext from './GithubContext';
import GithubReducer from './githubReducer';
import { SEARCH_ISSUES, SET_LOADING } from '../types';

const GithubState = (props) => {
  const initialState = {
    issues: [],
    totalCount: 0,
    resultsPerPage: 25,
    page: 1,
    loading: false,
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
    issueAssigned,
    inTitle,
    inBody,
    inComments,
    issueOrPullRequest,
    state,
    user,
    org,
    repo
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

    const userQuery = user.length ? 'user:' + encodeURIComponent(user) : '';
    const orgQuery = org.length ? 'org:' + encodeURIComponent(org) : '';
    const repoQuery = repo.length ? 'repo:' + encodeURIComponent(repo) : '';

    const inTitleQuery = inTitle ? ' in:title ' : '';
    const inBodyQuery = inBody ? ' in:body ' : '';
    const inCommentsQuery = inComments ? 'in:comments ' : '';

    let issueOrPullRequestQuery = ' ';
    if (issueOrPullRequest === 'issue') {
      issueOrPullRequestQuery = ' is:issue ';
    } else if (issueOrPullRequest === 'pr') {
      issueOrPullRequestQuery = ' is:pr ';
    }

    let stateQuery = ' ';
    if (state === 'open') {
      stateQuery = ' is:open ';
    } else if (state === 'closed') {
      stateQuery = ' is:closed ';
    }

    // Prevent issues that were somehow created or updated "in the future" to show up in results: only show past issues
    const today = new Date().toISOString().slice(0, 10);
    const pastIssueQuery = ` created:<=${today} updated:<=${today} `;

    let sortOrder = JSON.parse(sortDesc) ? 'desc' : 'asc';
    let issueAssignedState = JSON.parse(issueAssigned) ? '' : '+no:assignee';
    let searchQuery =
      keywordQuery +
      pastIssueQuery +
      inTitleQuery +
      inBodyQuery +
      inCommentsQuery +
      userQuery +
      orgQuery +
      repoQuery +
      issueOrPullRequestQuery +
      maybePlus +
      labelQuery +
      languageQuery +
      stateQuery +
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
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        dispatch({
          type: SEARCH_ISSUES,
          payload: {
            issues: data.items,
            totalCount: Number.parseInt(data.total_count, 10),
            page: page,
          },
        });
      })
      .catch(function (err) {
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
        search,
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
