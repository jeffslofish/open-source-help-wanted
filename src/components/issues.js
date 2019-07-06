import React from 'react';
import Issue from './issue';

function Issues(props) {
  let issues = [];

  for (let issue of props.data) {
    issues.push(<Issue
      key={issue.id}
      title={issue.title}
      body={issue.body}
      html_url={issue.html_url}
      updated_at={issue.updated_at}
      labels={issue.labels}
      user={issue.user}
      assignee={issue.assignee}
    />);
  }

  return (
    <div>{issues}</div>
  )
}

export default Issues;
