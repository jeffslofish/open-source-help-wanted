export interface FormInput {
  labels: string;
  keywords: string;
  language: string;
  sortType: string;
  sortOrder: 'asc' | 'desc';
  inTitle: boolean;
  inBody: boolean;
  inComments: boolean;
  issueOrPullRequest: string;
  state: string;
  author: string;
  user: string;
  org: string;
  repo: string;
  assignee: string;
  issueAssigned: '' | '+no:assignee';
  filterFake: true;
  upTime: true;
}
