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

  const handleNextButton = () => {

    window.scroll({
      top:0,
      left:0,
      behavior: 'smooth'
    })

    githubContext.search(
      githubContext.page + 1,
      githubContext.resultsPerPage,
      labels,
      keywords,
      language,
      sortType,
      sortDesc,
      issueAssigned
    );
  }
  const handlePrevButton = () => {
    window.scroll({
      top:0,
      left:0,
      behavior: 'smooth'
  })
    githubContext.search(
      githubContext.page > 1 ? githubContext.page - 1 : githubContext.page,
      githubContext.resultsPerPage,
      labels,
      keywords,
      language,
      sortType,
      sortDesc,
      issueAssigned
    );
  }
  const onSortTypeChange = e => setSortType(e.target.value);
  const onSortDescChange = e => setSortDesc(e.target.value);
  const onIssueAssignedChange = e => setIssueAssigned(e.target.value);

  const handleSubmit = e => {
    e.preventDefault();

    githubContext.search(
      1,
      25,
      labels,
      keywords,
      language,
      sortType,
      sortDesc,
      issueAssigned
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
            <button className="searchButton" type="submit">
              Search
            </button>
          </div>

          <div className="options">
            <select value={sortType} onChange={onSortTypeChange}>
              <option value={'created'}>Sort by created time</option>
              <option value={'updated'}>Sort by updated time</option>
              <option value={'comments'}>Sort by number of comments</option>
              <option value={'reactions'}>Sort by number of reactions</option>
              <option value={'interactions'}>Sort by number of interactions</option>
              <option value={'reactions-+1'}>Sort by number of +1s</option>
              <option value={'reactions--1'}>Sort by number of -1s</option>
              <option value={'reactions-smile'}>Sort by number of smiles</option>
              <option value={'reactions-thinking_face'}>Sort by number of thinking faces</option>
              <option value={'reactions-heart'}>Sort by number of hearts</option>
              <option value={'reactions-tada'}>Sort by number of tadas</option>
            </select>
            <select value={sortDesc} onChange={onSortDescChange}>
              <option value={true}>Sort Descending</option>
              <option value={false}>Sort Ascending</option>
            </select>
            <select value={issueAssigned} onChange={onIssueAssignedChange}>
              <option value={false}>Not Assigned</option>
              <option value={true}>Possibly Assigned</option>
            </select>
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
