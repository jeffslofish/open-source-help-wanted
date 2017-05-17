import React, { Component } from 'react';
import Issue from './issue';

class Issues extends Component {
  render() {
    let issues = [];

    for (let issue of this.props.data) {
      issues.push(<Issue
        key={issue.id}
        title={issue.title}
        body={issue.body}
        html_url={issue.html_url}
        updated_at={issue.updated_at}
        labels={issue.labels}
        user={issue.user}
      />);
    }

    return (
      <div>{issues}</div>
    )
  }
}


export default Issues;
