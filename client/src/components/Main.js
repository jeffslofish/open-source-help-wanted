import React, { useState, useContext, useEffect } from 'react';
import GithubContext from '../context/github/GithubContext';
import InputElement from './InputElement';
import Pagination from './Pagination';
import Issues from './Issues';
import Logo from '../images/Searching_Logo.png';

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
  const [author, setAuthor] = useState('');
  const [user, setUser] = useState('');
  const [org, setOrg] = useState('');
  const [repo, setRepo] = useState('');
  const [assignee, setAssignee] = useState('');

  function scrollTop() {
    const element = document.querySelector('.results-container');
    const headerHeight = document.querySelector('.App-header').scrollHeight;
    const searchHeight = document.querySelector('.search-container')
      .scrollHeight;
    element.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
    window.scroll({
      top: headerHeight + searchHeight,
      left: 0,
      behavior: 'smooth',
    });
  }

  const handleNextButton = () => {
    scrollTop();
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
      state,
      user,
      org,
      repo,
      author,
      assignee
    );
  };
  const handlePrevButton = () => {
    scrollTop();
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
      state,
      user,
      org,
      repo,
      author,
      assignee
    );
  };
  const onSortTypeChange = (e) => setSortType(e.target.value);
  const onSortDescChange = (e) => setSortDesc(e.target.value);
  const onIssueAssignedChange = (e) => {
    if (e.target.value === 'false') {
      setAssignee('');
    }
    setIssueAssigned(e.target.value);
  };

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
    scrollTop();
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
      state,
      user,
      org,
      repo,
      author,
      assignee
    );
  };

  useEffect(() => {
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
      state,
      user,
      org,
      repo,
      author,
      assignee
    );
  }, []);

  return (
    <div className="App">
      <div className="App-header">
        <a href="/">
          <img src={Logo} class="main-logo" alt="Open Source Help Wanted" />
          <h2>Find issues you can work on in GitHub. Be a contributor!</h2>
        </a>
      </div>
      <div className="App-container">
        <div className="search-container">
          <form onSubmit={handleSubmit}>
            <div className="input-elements">
              <div className="label-search-box">
                <InputElement
                  label={'GitHub label names'}
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
                <button
                  className="expandButton"
                  type={'button'}
                  onClick={onExpand}
                >
                  Show Advanced Options
                </button>
              )}
              {expanded && (
                <button
                  className="expandButton"
                  type={'button'}
                  onClick={onCollapse}
                >
                  Hide Advanded Options
                </button>
              )}

              {expanded && (
                <div className="advanced-options">
                  <div className="label-search-box">
                    <InputElement
                      label={'Author'}
                      placeholder={'jeffslofish'}
                      text={author}
                      setText={setAuthor}
                    />

                    <InputElement
                      label={'User'}
                      placeholder={'jeffslofish'}
                      text={user}
                      setText={setUser}
                    />

                    <InputElement
                      label={'Org'}
                      placeholder={'slofish'}
                      text={org}
                      setText={setOrg}
                    />

                    <InputElement
                      label={'Repo'}
                      placeholder={'jeffslofish/open-source-help-wanted'}
                      text={repo}
                      setText={setRepo}
                    />

                    <InputElement
                      label={'Assignee'}
                      placeholder={'jeffslofish'}
                      text={assignee}
                      setText={(val) => {
                        setIssueAssigned('true');
                        setAssignee(val);
                      }}
                    />
                  </div>

                  <fieldset className="input-component">
                    <legend className="input-label-name">
                      Search for keywords in:{' '}
                    </legend>
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
                  <fieldset className="input-component">
                    <legend className="input-label-name">
                      Filter by type/status
                    </legend>
                    <select
                      className="input-element"
                      value={issueOrPullRequest}
                      onChange={onIssueOrPullRequestChange}
                    >
                      <option value={'issue'}>Is Issue</option>
                      <option value={'pr'}>Is Pull Request</option>
                      <option value={'either'}>Is Issue or Pull Request</option>
                    </select>
                    <select
                      className="input-element"
                      value={state}
                      onChange={onStateChange}
                    >
                      <option value={'open'}>Is Open</option>
                      <option value={'closed'}>Is Closed</option>
                      <option value={'either'}>Is Open or Closed</option>
                    </select>
                    <select
                      className="input-element"
                      value={issueAssigned}
                      onChange={onIssueAssignedChange}
                    >
                      <option value={false}>Not Assigned</option>
                      <option value={true}>Possibly Assigned</option>
                    </select>
                  </fieldset>

                  <fieldset>
                    <legend className="input-label-name">
                      Sorting Options
                    </legend>
                    <select
                      className="input-element"
                      value={sortType}
                      onChange={onSortTypeChange}
                    >
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

                    <select
                      className="input-element"
                      value={sortDesc}
                      onChange={onSortDescChange}
                    >
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
        <div className="results-container">
          {githubContext.loading && <div className="loading" />}
          <Pagination
            currentPage={githubContext.page}
            totalCount={githubContext.totalCount}
            resultsPerPage={githubContext.resultsPerPage}
            prevlickHandler={handlePrevButton}
            nextClickHandler={handleNextButton}
          />
          <div>
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
              Fork me on GitHub and contribute!
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}
