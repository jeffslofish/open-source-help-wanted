import { IRepo } from '../../@types/IRepo';
import { LOADING_ERROR, SEARCH_REPOS, SET_LOADING } from '../types';

type State = {
  repos: IRepo[];
  totalCount: number;
  page: number;
  resultsPerPage: number;
  loading: boolean;
  errorMessage: string;
};

type Action =
  | {
      type: 'SEARCH_REPOS';
      payload: {
        repos: IRepo[];
        totalCount: number;
        page: number;
      };
    }
  | { type: 'SET_LOADING' }
  | {
      type: 'LOADING_ERROR';
      payload: {
        message: string;
      };
    };

export default (state: State, action: Action): State => {
  switch (action.type) {
    case SEARCH_REPOS: {
      return {
        ...state,
        repos: action.payload.repos,
        totalCount: action.payload.totalCount,
        page: action.payload.page,
        loading: false,
        errorMessage: '',
      };
    }
    case SET_LOADING:
      return {
        ...state,
        loading: true,
        errorMessage: '',
      };
    case LOADING_ERROR:
      return {
        ...state,
        errorMessage: action.payload?.message,
        loading: false,
      };
    default:
      return state;
  }
};
