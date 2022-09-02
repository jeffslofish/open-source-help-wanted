import { createContext } from 'react';
import { FormInput } from '../../@types/FormInput';
import { IIssue } from '../../@types/IIssue';

export interface IGithubContext {
  issues: IIssue[];
  totalCount: number;
  resultsPerPage: number;
  page: number;
  loading: boolean;
  accessToken: string | null;
  errorMessage: string;
  search: (
    page: number,
    resultsPerPage: number,
    formInput: FormInput
  ) => Promise<void>;
}

const GithubContext = createContext<IGithubContext | undefined>(undefined);

export default GithubContext;
