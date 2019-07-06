import React from 'react';
import Avatar from './avatar';
import Assignee from './assignee';
import Labels from './labels';
import Moment from 'react-moment';

function Issue(props) {
  function getRepoUrlFromIssueUrl(html_url) {
    let pattern = /^https:\/\/github.com\/[^/]+\/[^/]+\//;
    let matches = html_url.match(pattern);
    let repoUrl = '';
    if (matches && matches.length > 0) {
      repoUrl = matches[0];
    }
    return repoUrl;
  }

  function getUserUrlFromIssueUrl(html_url) {
    let pattern = /^https:\/\/github.com\/[^/]+\//;
    let matches = html_url.match(pattern);
    let userUrl = '';
    if (matches && matches.length > 0) {
      userUrl = matches[0];
    }
    return userUrl;
  }

  function getRepoNameFromIssueUrl(html_url) {
    let pattern = /https:\/\/github.com\/([^/]+)\/([^/]+)\//;
    let matches = html_url.match(pattern);
    let repoName = '';
    if (matches && matches.length > 2) {
      repoName = matches[1] +  '/' + matches[2];
    }
    return repoName;
  }

  return (
    <div className="issue">
      <h2><a href={props.html_url}>{props.title}</a></h2>
      <Avatar url={props.user.avatar_url} user_url={getUserUrlFromIssueUrl(props.html_url)}/>
      <p>
        <a href={getRepoUrlFromIssueUrl(props.html_url)}>{getRepoNameFromIssueUrl(props.html_url)}</a>
        {props.assignee && 
          <Assignee html_url={props.assignee.html_url} avatar_url={props.assignee.avatar_url} />
        }
      </p>
      <Labels labels={props.labels}/>
      <p className="issue-body">{props.body}</p>
      <div className="timeAgo"><Moment fromNow parse="YYYY-MM-DDTHH:mm:ssZ">{props.updated_at}></Moment></div>
    </div>
  );
}

export default Issue;
