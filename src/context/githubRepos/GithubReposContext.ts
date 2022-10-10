import { createContext } from 'react';
import { IRepo } from '../../@types/IRepo';
import { RepoFormInput } from '../../@types/RepoFormInput';

export interface IGithubReposContext {
  repos: IRepo[];
  totalCount: number;
  resultsPerPage: number;
  page: number;
  loading: boolean;
  errorMessage: string;
  search: (
    page: number,
    resultsPerPage: number,
    formInput: RepoFormInput
  ) => Promise<void>;
}

const GithubReposContext = createContext<IGithubReposContext | undefined>(
  undefined
);

export default GithubReposContext;
