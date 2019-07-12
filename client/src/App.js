import React, { useState, useEffect, useRef } from 'react';
import Issues from './components/Issues';
import InputElement from './components/InputElement';
import Pagination from './components/Pagination';
import './App.css';

const App = () => {
  const [totalCount, setTotalCount] = useState(0);
  const [issues, setIssues] = useState([]);
  const [page, setPage] = useState(1);
  const [submitCount, setSubmitCount] = useState(0);

  const labelsInputEl = useRef(null);
  const keywordsInputEl = useRef(null);
  const languageInputEl = useRef(null);
  const sortCreatedInputEl = useRef(null);
  const sortDescInputEl = useRef(null);
  const issueAssignedInputEl = useRef(null);

  const resultsPerPage = 25;

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

  useEffect(() => {
    if (submitCount > 0) {
      localStorage.setItem('labels', labelsInputEl.current.value);
      localStorage.setItem('keywords', keywordsInputEl.current.value);
      localStorage.setItem('language', languageInputEl.current.value);
      localStorage.setItem('sortCreated', sortCreatedInputEl.current.value);
      localStorage.setItem('sortDesc', sortDescInputEl.current.value);
      localStorage.setItem('issueAssigned', issueAssignedInputEl.current.value);

      let keywordQuery = formatSearchTerms(keywordsInputEl.current.value, '');
      let labelQuery = formatSearchTerms(labelsInputEl.current.value, 'label:');
      let languageQuery =
        languageInputEl.current.value.length > 0
          ? '+language:' + encodeURIComponent(languageInputEl.current.value)
          : '';

      let maybePlus = '+';
      if (keywordQuery === '' || labelQuery === '') {
        maybePlus = '';
      }

      let sortType = JSON.parse(sortCreatedInputEl.current.value)
        ? 'created'
        : 'updated';
      let sortOrder = JSON.parse(sortDescInputEl.current.value)
        ? 'desc'
        : 'asc';
      let issueAssignedState = JSON.parse(issueAssignedInputEl.current.value)
        ? ''
        : '+no:assignee';
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
          setIssues(data.items);
        });
    } else {
      labelsInputEl.current.value = localStorage.getItem('labels') || '';
      keywordsInputEl.current.value = localStorage.getItem('keywords') || '';
      languageInputEl.current.value = localStorage.getItem('language') || '';
      //TODO: make function to do optional JSON parse
      sortCreatedInputEl.current.value = localStorage.getItem('sortCreated')
        ? JSON.parse(localStorage.getItem('sortCreated'))
        : true;
      sortDescInputEl.current.value = localStorage.getItem('sortDesc')
        ? JSON.parse(localStorage.getItem('sortDesc'))
        : true;
      issueAssignedInputEl.current.value = localStorage.getItem('issueAssigned')
        ? JSON.parse(localStorage.getItem('issueAssigned'))
        : false;
    }
  }, [submitCount, page]);

  function handleSubmit(e) {
    e.preventDefault();

    setPage(1);
    setSubmitCount(submitCount + 1);
  }

  const handleNextButton = () => {
    setPage(page + 1);
  };
  const handlePrevButton = () => {
    setPage(page > 1 ? page - 1 : page);
  };

  return (
    <div className='App'>
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
                reference={labelsInputEl}
              />
              <InputElement
                label={'Keywords'}
                placeholder={'open source, forms'}
                reference={keywordsInputEl}
              />
              <InputElement
                label={'Language'}
                placeholder={'javascript'}
                reference={languageInputEl}
              />
            </div>
            <div className='options'>
              <select ref={sortCreatedInputEl}>
                <option value={true}>Sort by created time</option>
                <option value={false}>Sort by updated time</option>
              </select>
              <select ref={sortDescInputEl}>
                <option value={true}>Newest first</option>
                <option value={false}>Oldest first</option>
              </select>
              <select ref={issueAssignedInputEl}>
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
        {submitCount > 0 && <span>{totalCount} Results</span>}
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
