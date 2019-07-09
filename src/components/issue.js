import React from 'react';
import Avatar from './avatar';
import Assignee from './assignee';
import Labels from './labels';
import Moment from 'react-moment';
import PropTypes from 'prop-types';

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
      <div>
        <a href={getRepoUrlFromIssueUrl(props.html_url)}>{getRepoNameFromIssueUrl(props.html_url)}</a>
        {props.assignee && 
          <Assignee html_url={props.assignee.html_url} avatar_url={props.assignee.avatar_url} />
        }
        <div className="times">
          <div className="timeAgo">Created:<Moment fromNow parse="YYYY-MM-DDTHH:mm:ssZ">{props.created_at}</Moment></div>
          <div className="timeAgo">Updated:<Moment fromNow parse="YYYY-MM-DDTHH:mm:ssZ">{props.updated_at}</Moment></div>
        </div>
      </div>
      <Labels labels={props.labels}/>
      <p className="issue-body">{props.body}</p>
    </div>
  );
}

Issue.propTypes = {
  user: PropTypes.shape({
    avatar_url: PropTypes.string.isRequired,
  }),
  html_url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  assignee: PropTypes.shape({
    html_url: PropTypes.string.isRequired,
    avatar_url: PropTypes.string.isRequired
  }),
  created_at: PropTypes.string.isRequired,
  updated_at: PropTypes.string.isRequired,
  labels: PropTypes.array.isRequired,
  body: PropTypes.string.isRequired
};

export default Issue;
