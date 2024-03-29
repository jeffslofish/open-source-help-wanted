import { useState } from 'react';
import Avatar from './Avatar';
import Assignee from './Assignee';
import Labels from './Labels';
import Moment from 'react-moment';
import ReactMarkdown from 'react-markdown';

type Props = {
  issue: {
    id: number;
    html_url: string;
    user: {
      avatar_url: string;
      html_url: string;
    };
    title: string;
    assignee: {
      html_url: string;
      avatar_url: string;
    };
    created_at: string;
    updated_at: string;
    labels: [
      {
        color: string;
        name: string;
      }
    ];
    body: string;
    draft: boolean;
    state: string;
  };
  filter: boolean;
  upTime: boolean;
};

const Issue = ({
  issue: {
    user: { avatar_url, html_url: user_html_url },
    html_url,
    title,
    assignee,
    created_at,
    updated_at,
    labels,
    body,
    draft,
    state,
  },
  filter: filterFake,
  upTime
}: Props) => {
  const [issueOpen, setIssueOpen] = useState({ open: false, text: 'more...' });
  function openIssue() {
    if (issueOpen.open === false) {
      setIssueOpen({
        open: true,
        text: '...less',
      });
    } else {
      setIssueOpen({ open: false, text: 'more...' });
    }
  }

  // Checks for known sources of fake issues
  const repoName = getRepoNameFromIssueUrl(html_url);

  const isFakeIssue = () => {
    // pddemo/demo creates a new fake issue every minute
    if (repoName === 'pddemo/demo') {
      return true;
    }
    // Avatar url 10575 is GitHub Learning Lab which creates issues as pieces of tutorials for users to follow as
    // they create projects.
    if (avatar_url === 'https://avatars0.githubusercontent.com/in/10572?v=4') {
      return true;
    }
    return false;
  };

  if (isFakeIssue() === true && filterFake === true) {
    // filterFake is an option in advanced search
    //console.log("Excluded " + repoName + " - " + title + " - for being a test, tutorial or fake issue");
    return null;
  }

  const isupTimeRepo = () => {
    // uptime status issues that are automatically generated
    if (title.endsWith("is down")) {
      return true;
    }
    return false;
  };

  if(upTime && isupTimeRepo()) {
    return null;
  }
  return (
    <div className='issue'>
      <div className='issue-header'>
        <Avatar url={avatar_url} user_url={user_html_url} />
        <div className='main'>
          <p className='issue-title'>
            <a target='_blank' rel='noopener noreferrer' href={html_url}>
              {draft === undefined && state === 'open' && (
                <svg
                  height='16'
                  className='octicon octicon-issue-opened open flex-shrink-0'
                  viewBox='0 0 16 16'
                  version='1.1'
                  width='16'
                  aria-hidden='true'
                >
                  <path
                    fillRule='evenodd'
                    d='M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8zm9 3a1 1 0 11-2 0 1 1 0 012 0zm-.25-6.25a.75.75 0 00-1.5 0v3.5a.75.75 0 001.5 0v-3.5z'
                  ></path>
                </svg>
              )}
              {draft === undefined && state === 'closed' && (
                <svg
                  height='16'
                  className='octicon octicon-issue-closed closed flex-shrink-0'
                  viewBox='0 0 16 16'
                  version='1.1'
                  width='16'
                  aria-hidden='true'
                >
                  <path
                    fillRule='evenodd'
                    d='M1.5 8a6.5 6.5 0 0110.65-5.003.75.75 0 00.959-1.153 8 8 0 102.592 8.33.75.75 0 10-1.444-.407A6.5 6.5 0 011.5 8zM8 12a1 1 0 100-2 1 1 0 000 2zm0-8a.75.75 0 01.75.75v3.5a.75.75 0 11-1.5 0v-3.5A.75.75 0 018 4zm4.78 4.28l3-3a.75.75 0 00-1.06-1.06l-2.47 2.47-.97-.97a.749.749 0 10-1.06 1.06l1.5 1.5a.75.75 0 001.06 0z'
                  ></path>
                </svg>
              )}
              {draft !== undefined && state === 'open' && (
                <svg
                  height='16'
                  className='octicon octicon-git-pull-request open flex-shrink-0'
                  viewBox='0 0 16 16'
                  version='1.1'
                  width='16'
                  aria-hidden='true'
                >
                  <path
                    fillRule='evenodd'
                    d='M7.177 3.073L9.573.677A.25.25 0 0110 .854v4.792a.25.25 0 01-.427.177L7.177 3.427a.25.25 0 010-.354zM3.75 2.5a.75.75 0 100 1.5.75.75 0 000-1.5zm-2.25.75a2.25 2.25 0 113 2.122v5.256a2.251 2.251 0 11-1.5 0V5.372A2.25 2.25 0 011.5 3.25zM11 2.5h-1V4h1a1 1 0 011 1v5.628a2.251 2.251 0 101.5 0V5A2.5 2.5 0 0011 2.5zm1 10.25a.75.75 0 111.5 0 .75.75 0 01-1.5 0zM3.75 12a.75.75 0 100 1.5.75.75 0 000-1.5z'
                  ></path>
                </svg>
              )}
              {draft !== undefined && state === 'closed' && (
                <svg
                  height='16'
                  className='octicon octicon-git-pull-request closed flex-shrink-0'
                  viewBox='0 0 16 16'
                  version='1.1'
                  width='16'
                  aria-hidden='true'
                >
                  <path
                    fillRule='evenodd'
                    d='M7.177 3.073L9.573.677A.25.25 0 0110 .854v4.792a.25.25 0 01-.427.177L7.177 3.427a.25.25 0 010-.354zM3.75 2.5a.75.75 0 100 1.5.75.75 0 000-1.5zm-2.25.75a2.25 2.25 0 113 2.122v5.256a2.251 2.251 0 11-1.5 0V5.372A2.25 2.25 0 011.5 3.25zM11 2.5h-1V4h1a1 1 0 011 1v5.628a2.251 2.251 0 101.5 0V5A2.5 2.5 0 0011 2.5zm1 10.25a.75.75 0 111.5 0 .75.75 0 01-1.5 0zM3.75 12a.75.75 0 100 1.5.75.75 0 000-1.5z'
                  ></path>
                </svg>
              )}{' '}
              {title}
            </a>
          </p>

          <div className='issue-details'>
            <div className='issue-repo'>
              <a
                target='_blank'
                rel='noopener noreferrer'
                href={getRepoUrlFromIssueUrl(html_url)}
              >
                {getRepoNameFromIssueUrl(html_url)}
              </a>
              {assignee && <Assignee user={assignee} />}
              <Labels labels={labels} />
            </div>
            <div className='issue-times'>
              <div className='issue-time-ago'>
                Created:&nbsp;
                <Moment fromNow parse='YYYY-MM-DDTHH:mm:ssZ'>
                  {created_at}
                </Moment>
              </div>
              <div className='issue-time-ago'>
                Updated:&nbsp;
                <Moment fromNow parse='YYYY-MM-DDTHH:mm:ssZ'>
                  {updated_at}
                </Moment>
              </div>
            </div>
            {body && (
              <button className='moreButton' onClick={openIssue}>
                {issueOpen.text}
              </button>
            )}
          </div>
        </div>
      </div>

      {issueOpen.open && (
        <div className='issue-body'>
          {body && <ReactMarkdown>{body}</ReactMarkdown>}
        </div>
      )}
    </div>
  );
};

function getRepoUrlFromIssueUrl(html_url: string) {
  const pattern = /^https:\/\/github.com\/[^/]+\/[^/]+\//;
  const matches = html_url.match(pattern);
  let repoUrl = '';
  if (matches && matches.length > 0) {
    repoUrl = matches[0];
  }
  return repoUrl;
}

function getRepoNameFromIssueUrl(html_url: string) {
  const pattern = /https:\/\/github.com\/([^/]+)\/([^/]+)\//;
  const matches = html_url.match(pattern);
  let repoName = '';
  if (matches && matches.length > 2) {
    repoName = matches[1] + '/' + matches[2];
  }
  return repoName;
}

export default Issue;
