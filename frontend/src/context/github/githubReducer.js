import { LOADING_ERROR, SEARCH_ISSUES, SET_LOADING } from '../types';

export default (state, action) => {
  switch (action.type) {
    case SEARCH_ISSUES:
      return {
        ...state,
        issues: action.payload.issues,
        totalCount: action.payload.totalCount,
        page: action.payload.page,
        accessToken: action.payload.accessToken,
        loading: false,
        errorMessage: '',
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
        errorMessage: '',
      };
    case LOADING_ERROR:
      return {
        ...state,
        errorMessage: action.payload.message,
        loading: false,
      };
    default:
      return state;
  }
};
