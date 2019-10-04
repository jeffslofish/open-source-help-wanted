import React from 'react';
import Avatar from './Avatar';
import Assignee from './Assignee';
import Labels from './Labels';
import Moment from 'react-moment';
import PropTypes from 'prop-types';

const Issue = ({
  issue: {
    user: { avatar_url },
    html_url,
    title,
    assignee,
    created_at,
    updated_at,
    labels,
    body
  }
}) => {
  return (
    <div className="issue">
      <h2>
        <a target="_blank" rel="noopener noreferrer" href={html_url}>
          {title}
        </a>
      </h2>
      <Avatar url={avatar_url} user_url={getUserUrlFromIssueUrl(html_url)} />
      <div>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={getRepoUrlFromIssueUrl(html_url)}
        >
          {getRepoNameFromIssueUrl(html_url)}
        </a>
        {assignee && <Assignee user={assignee} />}
        <div className="times">
          <div className="timeAgo">
            Created:&nbsp;
            <Moment fromNow parse="YYYY-MM-DDTHH:mm:ssZ">
              {created_at}
            </Moment>
          </div>
          <br />
          <div className="timeAgo">
            Updated:&nbsp;
            <Moment fromNow parse="YYYY-MM-DDTHH:mm:ssZ">
              {updated_at}
            </Moment>
          </div>
        </div>
      </div>
      <Labels labels={labels} />
      <p className="issue-body">
        {body
          ? body.length < maxBodyLength
            ? body
            : body.substr(0, maxBodyLength) + '...'
          : ''}
      </p>
    </div>
  );
};

const maxBodyLength = 500;

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
    repoName = matches[1] + '/' + matches[2];
  }
  return repoName;
}

Issue.propTypes = {
  issue: PropTypes.shape({
    html_url: PropTypes.string.isRequired,
    user: PropTypes.shape({
      avatar_url: PropTypes.string.isRequired
    }).isRequired,
    title: PropTypes.string.isRequired,
    assignee: PropTypes.shape({
      html_url: PropTypes.string.isRequired,
      avatar_url: PropTypes.string.isRequired
    }),
    created_at: PropTypes.string.isRequired,
    updated_at: PropTypes.string.isRequired,
    labels: PropTypes.array.isRequired,
    body: PropTypes.string
  }).isRequired
};

export default Issue;
