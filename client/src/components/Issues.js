import React from 'react';
import Issue from './Issue';

//TODO: get prop types validation working in this file.
function Issues(props) {
  const issues = props.data;

  return issues.map(issue => {
    if (issue.id) { //Sometimes node is empty
      return (
        <Issue
          key={issue.id}
          title={issue.title}
          body={issue.body}
          html_url={issue.url}
          created_at={issue.createdAt}
          updated_at={issue.updatedAt}
          labels={issue.labels}
          languages={issue.languages}
          author={issue.author}
          assignees={issue.assignees}
          repository={issue.repository}
        />
      )
    } 
      return '';
  });
}

export default Issues;
