import { IIssue } from '../../@types/IIssue';
import { LOADING_ERROR, SEARCH_ISSUES, SET_LOADING } from '../types';

type State = {
  issues: IIssue[];
  totalCount: number;
  page: number;
  resultsPerPage: number;
  accessToken: string | null;
  loading: boolean;
  errorMessage: string;
};

type Action =
  | {
    type: 'SEARCH_ISSUES';
    payload: {
      issues: IIssue[];
      totalCount: number;
      page: number;
      accessToken: string | null;
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
    case SEARCH_ISSUES: {
      localStorage.setItem('accessToken', action.payload.accessToken || "");
      return {
        ...state,
        issues: action.payload.issues,
        totalCount: action.payload.totalCount,
        page: action.payload.page,
        accessToken: action.payload.accessToken,
        loading: false,
        errorMessage: '',
      }
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
