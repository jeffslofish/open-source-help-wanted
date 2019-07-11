import React from 'react';
import Avatar from './Avatar';
import Assignee from './Assignee';
import Labels from './Labels';
import Moment from 'react-moment';
import PropTypes from 'prop-types';

function Issue(props) {
  const maxBodyLength = 500;
  const fillColor = (props.state === "OPEN") ? '#28a745' : '#cb2431';
  const assignees = props.assignees ? props.assignees.nodes.map(value => <Assignee key={value.id} url={value.url} avatarUrl={value.avatarUrl} />) : '';
  const languages = props.repository.languages.nodes.map(value => value.name).join(', ');

  function getRepoUrlFromIssueUrl(html_url) {
    let pattern = /^https:\/\/github.com\/[^/]+\/[^/]+\//;
    let matches = html_url.match(pattern);
    let repoUrl = '';
    if (matches && matches.length > 0) {
      repoUrl = matches[0];
    }
    return repoUrl;
  }

  function getRepoNameFromIssueUrl(html_url) {
    let pattern = /https:\/\/github.com\/([^/]+)\/([^/]+)\//;
    let matches = html_url.match(pattern);
    let repoName = '';
    if (matches && matches.length > 2) {
      repoName = matches[1] + '/' + matches[2];
    }
    return repoName;
  }

  return (
    <div className="issue">
      <h2><a href={props.html_url}>{props.title}</a></h2>
      <svg style={{fill: fillColor}} viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fillRule="evenodd" d="M7 10h2v2H7v-2zm2-6H7v5h2V4zm1.5 1.5l-1 1L12 9l4-4.5-1-1L12 7l-1.5-1.5zM8 13.7A5.71 5.71 0 0 1 2.3 8c0-3.14 2.56-5.7 5.7-5.7 1.83 0 3.45.88 4.5 2.2l.92-.92A6.947 6.947 0 0 0 8 1C4.14 1 1 4.14 1 8s3.14 7 7 7 7-3.14 7-7l-1.52 1.52c-.66 2.41-2.86 4.19-5.48 4.19v-.01z"></path></svg>
      <Avatar url={props.repository.owner.url} avatarUrl={props.repository.owner.avatarUrl} />
      <Avatar url={props.author.url} avatarUrl={props.author.avatarUrl} />
      <div>
        <a href={getRepoUrlFromIssueUrl(props.html_url)}>{getRepoNameFromIssueUrl(props.html_url)}</a>
        {assignees}
        <div className="times">
          <div className="timeAgo">Created:<Moment fromNow parse="YYYY-MM-DDTHH:mm:ssZ">{props.created_at}</Moment></div>
          <div className="timeAgo">Updated:<Moment fromNow parse="YYYY-MM-DDTHH:mm:ssZ">{props.updated_at}</Moment></div>
        </div>
      </div>
      <Labels labels={props.labels} />
      <p>{languages}</p>
      <p className="issue-body">{props.body.length < maxBodyLength ? props.body : props.body.substr(0, maxBodyLength) + '...'}</p>
    </div>
  );
}

Issue.propTypes = {
  author: PropTypes.shape({
    url: PropTypes.string.isRequired,
    avatarUrl: PropTypes.string.isRequired,
  }).isRequired,
  html_url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  assignees: PropTypes.shape({
    nodes: PropTypes.array
  }).isRequired,
  created_at: PropTypes.string.isRequired,
  updated_at: PropTypes.string.isRequired,
  labels: PropTypes.shape({
    nodes: PropTypes.array.isRequired
  }).isRequired,
  repository: PropTypes.shape({
    owner: PropTypes.shape({
      url: PropTypes.string.isRequired,
      avatarUrl: PropTypes.string.isRequired
    }),
    languages: PropTypes.shape({
    nodes: PropTypes.array.isRequired
    }).isRequired,
  }).isRequired,
  body: PropTypes.string.isRequired
};

export default Issue;
