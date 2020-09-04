import { SEARCH_ISSUES, SET_LOADING } from '../types';

export default (state, action) => {
  switch (action.type) {
    case SEARCH_ISSUES:
      return {
        ...state,
        issues: action.payload.issues,
        totalCount: action.payload.totalCount,
        page: action.payload.page,
        loading: false,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};
