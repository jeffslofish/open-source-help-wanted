import { FunctionComponent, ReactNode, useReducer } from 'react';
import GithubContext from './GithubContext';
import GithubReducer from './githubReducer';
import { SEARCH_ISSUES, SET_LOADING, LOADING_ERROR } from '../types';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FormInput } from '../../@types/FormInput';

type Props = {
  children: ReactNode;
};

const GithubState: FunctionComponent<Props> = (props) => {
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

  const search = async (
    page: number,
    resultsPerPage: number,
    formInput: FormInput
  ) => {
    const {
      labels,
      keywords,
      language,
      sortType,
      sortOrder,
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

    const labelQuery = formatSearchTerms(labels, 'label:');
    const keywordQuery = formatSearchTerms(keywords, '');
    const languageQuery =
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
    const searchQuery =
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
      issueAssigned +
      '&page=' +
      page +
      '&sort=' +
      encodeURIComponent(sortType) +
      '&order=' +
      sortOrder +
      '&per_page=' +
      resultsPerPage;

    const myRequest = new Request(
      `/.netlify/functions/getissues?q=${searchQuery}&oauthCode=${oauthCode}&accessToken=${contextState.accessToken || localStorage.getItem("accessToken")}`
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
      typeof data === 'string' && toast.error(data);
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

function formatSearchTerms(searchTerms: string, label: string) {
  let query = '';

  if (searchTerms.length > 0) {
    const terms = searchTerms.split(',');

    for (const term of terms) {
      query += label + '"' + encodeURIComponent(term.trim()) + '"+';
    }
    if (query.length > 0) {
      query = query.slice(0, -1);
    }
  }
  return query;
}

export default GithubState;
