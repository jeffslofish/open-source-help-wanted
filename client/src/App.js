import React, { useState } from 'react';
import Issues from './components/Issues';
import InputElement from './components/InputElement';
import Pagination from './components/Pagination';
import './App.css';

const App = () => {
  const resultsPerPage = 25;

  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(null);

  const [issues, setIssues] = useState([]);
  const [page, setPage] = useState(1);
  const [labels, setLabels] = useState('');
  const [keywords, setKeywords] = useState('');
  const [language, setLanguage] = useState('');
  const [sortCreated, setSortCreated] = useState(true);
  const [sortDesc, setSortDesc] = useState(true);
  const [issueAssigned, setIssueAssigned] = useState(false);

  function formatSearchTerms(searchTerms, label) {
    let query = '';

    if (searchTerms.length > 0) {
      let terms = searchTerms.split(',');

      for (let term of terms) {
        query += label + '"' + encodeURIComponent(term.trim()) + '"+';
      }
      if (query.length > 0) {
        query = query.slice(0, -1);
      }
    }
    return query;
  }

  const search = page => {
    setLoading(true);

    let labelQuery = formatSearchTerms(labels, 'label:');
    let keywordQuery = formatSearchTerms(keywords, '');
    let languageQuery =
      language.length > 0 ? '+language:' + encodeURIComponent(language) : '';

    let maybePlus = '+';
    if (keywordQuery === '' || labelQuery === '') {
      maybePlus = '';
    }

    let sortType = JSON.parse(sortCreated) ? 'created' : 'updated';
    let sortOrder = JSON.parse(sortDesc) ? 'desc' : 'asc';
    let issueAssignedState = JSON.parse(issueAssigned) ? '' : '+no:assignee';
    let searchQuery =
      keywordQuery +
      maybePlus +
      labelQuery +
      languageQuery +
      '+type:issue+state:open' +
      issueAssignedState +
      '&page=' +
      page +
      '&sort=' +
      sortType +
      '&order=' +
      sortOrder +
      '&per_page=' +
      resultsPerPage;

    let myRequest = new Request('/api/github/rest?q=' + searchQuery);

    fetch(myRequest)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        setTotalCount(Number.parseInt(data.total_count, 10));
        setPage(page);
        setIssues(data.items);
        setLoading(false);
      })
      .catch(function(err) {
        console.log(err);
      });
  };

  function handleSubmit(e) {
    e.preventDefault();

    search(1);
  }

  const handleNextButton = () => search(page + 1);
  const handlePrevButton = () => search(page > 1 ? page - 1 : page);
  const onSortCreatedChange = e => setSortCreated(e.target.value);
  const onSortDescChange = e => setSortDesc(e.target.value);
  const onIssueAssignedChange = e => setIssueAssigned(e.target.value);

  return (
    <div className='App'>
      {loading && <div className='loading' />}
      <div className='App-header'>
        <h1>Open Source Help Wanted</h1>
        <h2>Find issues you can work on in Github. Be a contributor!</h2>
      </div>
      <div className='App-intro'>
        <form onSubmit={handleSubmit}>
          <div className='input-elements'>
            <div className='label-search-box'>
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
            <div className='options'>
              <select value={sortCreated} onChange={onSortCreatedChange}>
                <option value={true}>Sort by created time</option>
                <option value={false}>Sort by updated time</option>
              </select>
              <select value={sortDesc} onChange={onSortDescChange}>
                <option value={true}>Newest first</option>
                <option value={false}>Oldest first</option>
              </select>
              <select value={issueAssigned} onChange={onIssueAssignedChange}>
                <option value={false}>Not Assigned</option>
                <option value={true}>Possibly Assigned</option>
              </select>
              <button className='searchButton' type='submit'>
                Search
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className='app-body'>
        {totalCount !== null && <span>{totalCount} Results</span>}
        <Pagination
          currentPage={page}
          totalCount={totalCount}
          resultsPerPage={resultsPerPage}
          prevlickHandler={handlePrevButton}
          nextClickHandler={handleNextButton}
        />
        <div className='app-results'>
          <Issues issues={issues} />
        </div>
        <Pagination
          currentPage={page}
          totalCount={totalCount}
          resultsPerPage={resultsPerPage}
          prevlickHandler={handlePrevButton}
          nextClickHandler={handleNextButton}
        />
      </div>
      <footer>
        <p>
          <a href='https://github.com/jeffslofish/open-source-help-wanted'>
            Fork me on Github and contribute!
          </a>
        </p>
      </footer>
    </div>
  );
};

export default App;
