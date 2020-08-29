import React from 'react';
import Issue from './Issue';

//TODO: get prop types validation working in this file.
const Issues = ({ issues, filter }) => {
  return issues.map(issue => <Issue key={issue.id} issue={issue} filter={filter}/>);
};

export default Issues;
