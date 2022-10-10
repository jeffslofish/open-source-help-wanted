import { FunctionComponent, ReactNode, useReducer } from 'react';
import GithubReposContext from './GithubReposContext';
import GithubReposReducer from './githubReposReducer';
import { SEARCH_REPOS, SET_LOADING, LOADING_ERROR } from '../types';
import { toast } from 'react-toastify';
import { RepoFormInput } from '../../@types/RepoFormInput';
import formatSearchTerms from '../../helpers/formatSearchTerms';

type Props = {
  children: ReactNode;
};

const GithubState: FunctionComponent<Props> = (props) => {
  const initialState = {
    repos: [],
    totalCount: 0,
    resultsPerPage: 100,
    page: 1,
    loading: false,
    errorMessage: '',
  };

  const [contextState, dispatch] = useReducer(GithubReposReducer, initialState);

  const setLoading = () => dispatch({ type: SET_LOADING });

  const search = async (
    page: number,
    resultsPerPage: number,
    formInput: RepoFormInput
  ) => {
    const { keywords, sortOrder, sortType, topics } = formInput;

    setLoading();

    const topicsQuery = formatSearchTerms(topics, 'topic:');
    const keywordQuery = formatSearchTerms(keywords, '');

    const searchQuery =
      keywordQuery +
      topicsQuery +
      '&page=' +
      page +
      '&sort=' +
      sortType +
      '&order=' +
      sortOrder +
      '&per_page=' +
      resultsPerPage;

    const myRequest = new Request(
      `/.netlify/functions/getRepos?q=${searchQuery}&accessToken=${localStorage.getItem(
        'accessToken'
      )}`
    );

    const response = await fetch(myRequest);

    if (response.ok) {
      const data = await response.json();
      dispatch({
        type: SEARCH_REPOS,
        payload: {
          repos: data.items,
          totalCount: Number.parseInt(data.total_count, 10),
          page: page,
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
    <GithubReposContext.Provider
      value={{
        repos: contextState.repos,
        totalCount: contextState.totalCount,
        resultsPerPage: contextState.resultsPerPage,
        page: contextState.page,
        loading: contextState.loading,
        errorMessage: contextState.errorMessage,
        search,
      }}
    >
      {props.children}
    </GithubReposContext.Provider>
  );
};

export default GithubState;
