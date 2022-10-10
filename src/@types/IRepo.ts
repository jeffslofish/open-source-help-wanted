export interface IRepo {
  description: string;
  forks_count: number;
  full_name: string;
  html_url: string;
  id: number;
  issues_url: string;
  open_issues_count: number;
  owner: {
    avatar_url: string;
    html_url: string;
  };
  stargazers_count: number;
  topics: string[];
  watchers_count: number;
}
