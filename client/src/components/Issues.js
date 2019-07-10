import React from 'react';
import Issue from './Issue';

//TODO: get prop types validation working in this file.
function Issues(props) {
  return props.data.map(issue => {
    return (
      <Issue
        key={issue.id}
        title={issue.title}
        body={issue.body}
        html_url={issue.html_url}
        created_at={issue.created_at}
        updated_at={issue.updated_at}
        labels={issue.labels}
        user={issue.user}
        assignee={issue.assignee}
      />
    )
  });
}

export default Issues;
