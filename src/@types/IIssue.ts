export interface IIssue {
  id: number;
  html_url: string;
  user: {
    avatar_url: string;
    html_url: string;
  };
  title: string;
  assignee: {
    html_url: string;
    avatar_url: string;
  };
  created_at: string;
  updated_at: string;
  labels: [
    {
      color: string;
      name: string;
    }
  ];
  body: string;
  draft: boolean;
  state: string;
}
