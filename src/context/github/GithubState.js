import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import GithubContext from './GithubContext';
import GithubReducer from './githubReducer';
import { SEARCH_ISSUES, SET_LOADING, LOADING_ERROR } from '../types';
import { useLocation } from 'react-router-dom';

const GithubState = (props) => {
  const initialState = {
    issues: [],
    totalCount: 0,
    resultsPerPage: 100,
    page: 1,
    loading: false,
    accessToken: null,
    errorMessage: '',
  };

  const [contextState, dispatch] = useReducer(GithubReducer, initialState);

  const setLoading = () => dispatch({ type: SET_LOADING });

  const queryParamSearch = useLocation().search;
  const oauthCode = new URLSearchParams(queryParamSearch).get('code');

  const search = async (page, resultsPerPage, formInput) => {
    const {
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
      repo,
      author,
      assignee,
    } = formInput;
    setLoading();

    let labelQuery = formatSearchTerms(labels, 'label:');
    let keywordQuery = formatSearchTerms(keywords, '');
    let languageQuery =
      language.length > 0 ? '+language:' + encodeURIComponent(language) : '';

    let maybePlus = '+';
    if (keywordQuery === '' || labelQuery === '') {
      maybePlus = '';
    }

    const authorQuery = author.length
      ? `author:${encodeURIComponent(author)} `
      : '';
    const userQuery = user.length ? `user:${encodeURIComponent(user)} ` : '';
    const orgQuery = org.length ? `org:${encodeURIComponent(org)} ` : '';
    const repoQuery = repo.length ? `repo:${encodeURIComponent(repo)} ` : '';
    const assigneeQuery = assignee.length
      ? `assignee:${encodeURIComponent(assignee)} `
      : '';

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
      authorQuery +
      userQuery +
      orgQuery +
      repoQuery +
      assigneeQuery +
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

    let myRequest = new Request(
      `/.netlify/functions/getissues?q=${searchQuery}&oauthCode=${oauthCode}&accessToken=${contextState.accessToken}`
    );

    const response = await fetch(myRequest);

    if (response.ok) {
      const data = await response.json();

      dispatch({
        type: SEARCH_ISSUES,
        payload: {
          issues: data.items,
          totalCount: Number.parseInt(data.total_count, 10),
          page: page,
          accessToken: data.accessToken,
        },
      });
    } else {
      console.log('ERROR: ');
      const data = await response.json();
      console.log(data);

      dispatch({
        type: LOADING_ERROR,
        payload: {
          message: data,
        },
      });
    }
  };

  return (
    <GithubContext.Provider
      value={{
        issues: contextState.issues,
        totalCount: contextState.totalCount,
        resultsPerPage: contextState.resultsPerPage,
        page: contextState.page,
        loading: contextState.loading,
        accessToken: contextState.accessToken,
        errorMessage: contextState.errorMessage,
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

GithubState.propTypes = {
  children: PropTypes.object,
};

export default GithubState;
