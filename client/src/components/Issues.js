import React from 'react';
import Issue from './Issue';

//TODO: get prop types validation working in this file.
function Issues(props) {

  const issues = props.data.map((value) => value.node);

  return issues.map(issue => {
    return (
      <Issue
        key={issue.id}
        title={issue.title}
        body={issue.body}
        html_url={issue.url}
        created_at={issue.createdAt}
        updated_at={issue.updatedAt}
        labels={issue.labels.nodes}
        author={issue.author}
        assignees={issue.assignees.edges}
      />
    )
  });
}

export default Issues;
