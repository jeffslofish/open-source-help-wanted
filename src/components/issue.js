import React, { Component } from 'react';
import Avatar from './avatar';
import Labels from './labels';
import Moment from 'react-moment';

class Issue extends Component {

  getRepoUrlFromIssueUrl(html_url) {
    let pattern = /^https:\/\/github.com\/[^/]+\/[^/]+\//;
    let matches = html_url.match(pattern);
    let repoUrl = '';
    if (matches && matches.length > 0) {
      repoUrl = matches[0];
    }
    return repoUrl;
  }

  getUserUrlFromIssueUrl(html_url) {
    let pattern = /^https:\/\/github.com\/[^/]+\//;
    let matches = html_url.match(pattern);
    let userUrl = '';
    if (matches && matches.length > 0) {
      userUrl = matches[0];
    }
    return userUrl;
  }

  getRepoNameFromIssueUrl(html_url) {
    let pattern = /https:\/\/github.com\/([^/]+)\/([^/]+)\//;
    let matches = html_url.match(pattern);
    let repoName = '';
    if (matches && matches.length > 2) {
      repoName = matches[1] +  '/' + matches[2];
    }
    return repoName;
  }

  render() {
    return (
      <div className="issue">
        <h2><a href={this.props.html_url}>{this.props.title}</a></h2>
        <Avatar url={this.props.user.avatar_url} user_url={this.getUserUrlFromIssueUrl(this.props.html_url)}/>
        <p><a href={this.getRepoUrlFromIssueUrl(this.props.html_url)}>{this.getRepoNameFromIssueUrl(this.props.html_url)}</a></p>
        <Labels labels={this.props.labels}/>
        <p className="issue-body">{this.props.body}</p>
        <div className="timeAgo"><Moment fromNow parse="YYYY-MM-DDTHH:mm:ssZ">{this.props.updated_at}></Moment></div>
      </div>
    );
  }
}


export default Issue;
