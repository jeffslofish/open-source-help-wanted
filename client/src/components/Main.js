import React, { useState, useContext } from 'react';
import GithubContext from '../context/github/GithubContext';
import InputElement from './InputElement';
import Pagination from './Pagination';
import Issues from './Issues';

export default function Main() {
  const githubContext = useContext(GithubContext);

  const [labels, setLabels] = useState('');
  const [keywords, setKeywords] = useState('');
  const [language, setLanguage] = useState('');
  const [sortType, setSortType] = useState('created');
  const [sortDesc, setSortDesc] = useState(true);
  const [issueAssigned, setIssueAssigned] = useState(false);
  const [inTitle, setInTitle] = useState(true);
  const [inBody, setInBody] = useState(true);
  const [inComments, setInComments] = useState(true);
  const [issueOrPullRequest, setIssueOrPullRequest] = useState('issue');
  const [state, setState] = useState('open');
  const [expanded, setExpanded] = useState(false);

  const handleNextButton = () => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });

    githubContext.search(
      githubContext.page + 1,
      githubContext.resultsPerPage,
      labels,
      keywords,
      language,
      sortType,
      sortDesc,
      issueAssigned,
      inTitle,
      inBody,
      inComments,
      issueOrPullRequest,
      state
    );
  };
  const handlePrevButton = () => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
    githubContext.search(
      githubContext.page > 1 ? githubContext.page - 1 : githubContext.page,
      githubContext.resultsPerPage,
      labels,
      keywords,
      language,
      sortType,
      sortDesc,
      issueAssigned,
      inTitle,
      inBody,
      inComments,
      issueOrPullRequest,
      state
    );
  };
  const onSortTypeChange = (e) => setSortType(e.target.value);
  const onSortDescChange = (e) => setSortDesc(e.target.value);
  const onIssueAssignedChange = (e) => setIssueAssigned(e.target.value);
  const onInTitleChange = (e) => setInTitle(e.target.checked);
  const onInBodyChange = (e) => setInBody(e.target.checked);
  const onInCommentsChange = (e) => setInComments(e.target.checked);
  const onIssueOrPullRequestChange = (e) =>
    setIssueOrPullRequest(e.target.value);
  const onStateChange = (e) => setState(e.target.value);

  const onExpand = (e) => {
    e.preventDefault();
    setExpanded(true);
  };

  const onCollapse = (e) => {
    e.preventDefault();
    setExpanded(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    githubContext.search(
      1,
      25,
      labels,
      keywords,
      language,
      sortType,
      sortDesc,
      issueAssigned,
      inTitle,
      inBody,
      inComments,
      issueOrPullRequest,
      state
    );
  };

  return (
    <div className="App">
      {githubContext.loading && <div className="loading" />}
      <div className="App-header">
        <h1>Open Source Help Wanted</h1>
        <h2>Find issues you can work on in Github. Be a contributor!</h2>
      </div>
      <div className="App-intro">
        <form onSubmit={handleSubmit}>
          <div className="input-elements">
            <div className="label-search-box">
              <InputElement
                label={'Github label names'}
                placeholder={'help wanted, bug'}
                text={labels}
                setText={setLabels}
              />
              <InputElement
                label={'Keywords'}
                placeholder={'open source, forms'}
                text={keywords}
                setText={setKeywords}
              />
              <InputElement
                label={'Language'}
                placeholder={'javascript'}
                text={language}
                setText={setLanguage}
              />
            </div>

            {!expanded && (
              <button onClick={onExpand}>Show Advanced Options</button>
            )}
            {expanded && (
              <button onClick={onCollapse}>Hide Advanded Options</button>
            )}

            {expanded && (
              <div className="advanced-options">
                <div className="options"></div>
                <fieldset>
                  <legend>Search for keywords in: </legend>
                  <label>
                    <input
                      type="checkbox"
                      checked={inTitle}
                      onChange={onInTitleChange}
                    />
                    title
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      checked={inBody}
                      onChange={onInBodyChange}
                    />
                    body
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      checked={inComments}
                      onChange={onInCommentsChange}
                    />
                    comments
                  </label>
                </fieldset>
                <select
                  value={issueOrPullRequest}
                  onChange={onIssueOrPullRequestChange}
                >
                  <option value={'issue'}>Is Issue</option>
                  <option value={'pr'}>Is Pull Request</option>
                  <option value={'either'}>Is Issue or Pull Request</option>
                </select>
                <select value={state} onChange={onStateChange}>
                  <option value={'open'}>Is Open</option>
                  <option value={'closed'}>Is Closed</option>
                  <option value={'either'}>Is Open or Closed</option>
                </select>
                <select value={issueAssigned} onChange={onIssueAssignedChange}>
                  <option value={false}>Not Assigned</option>
                  <option value={true}>Possibly Assigned</option>
                </select>

                <fieldset>
                  <legend>Sorting Options</legend>
                  <select value={sortType} onChange={onSortTypeChange}>
                    <option value={'created'}>Sort by created time</option>
                    <option value={'updated'}>Sort by updated time</option>
                    <option value={'comments'}>
                      Sort by number of comments
                    </option>
                    <option value={'reactions'}>
                      Sort by number of reactions
                    </option>
                    <option value={'interactions'}>
                      Sort by number of interactions
                    </option>
                    <option value={'reactions-+1'}>
                      Sort by number of +1s
                    </option>
                    <option value={'reactions--1'}>
                      Sort by number of -1s
                    </option>
                    <option value={'reactions-smile'}>
                      Sort by number of smiles
                    </option>
                    <option value={'reactions-thinking_face'}>
                      Sort by number of thinking faces
                    </option>
                    <option value={'reactions-heart'}>
                      Sort by number of hearts
                    </option>
                    <option value={'reactions-tada'}>
                      Sort by number of tadas
                    </option>
                  </select>

                  <select value={sortDesc} onChange={onSortDescChange}>
                    <option value={true}>Sort Descending</option>
                    <option value={false}>Sort Ascending</option>
                  </select>
                </fieldset>
              </div>
            )}

            <button className="searchButton" type="submit">
              Search
            </button>
          </div>
        </form>
      </div>
      <div className="app-body">
        <Pagination
          currentPage={githubContext.page}
          totalCount={githubContext.totalCount}
          resultsPerPage={githubContext.resultsPerPage}
          prevlickHandler={handlePrevButton}
          nextClickHandler={handleNextButton}
        />
        <div className="app-results">
          <Issues issues={githubContext.issues} />
        </div>
        <Pagination
          currentPage={githubContext.page}
          totalCount={githubContext.totalCount}
          resultsPerPage={githubContext.resultsPerPage}
          prevlickHandler={handlePrevButton}
          nextClickHandler={handleNextButton}
        />
      </div>
      <footer>
        <p>
          <a href="https://github.com/jeffslofish/open-source-help-wanted">
            Fork me on Github and contribute!
          </a>
        </p>
      </footer>
    </div>
  );
}
