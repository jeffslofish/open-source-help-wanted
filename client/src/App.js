import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Issues from './components/Issues';
import InputElement from './components/InputElement';
import Pagination from './components/Pagination';
import './App.css';


function App() {
  const [totalCount, setTotalCount] = useState(0);
  const [response, setResponse] = useState([]);
  const [page, setPage] = useState(1);
  const [startCursor, setStartCursor] = useState(null);
  const [endCursor, setEndCursor] = useState(null);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPrevPage, setHasPrevPage] = useState(false);
  const [submitCount, setSubmitCount] = useState(0);

  const labelsInputEl = useRef(null);
  const keywordsInputEl = useRef(null);
  const languageInputEl = useRef(null);
  const assignedInputEl = useRef(null);
  const statusInputEl = useRef(null);

  const resultsPerPage = 10;

  function formatSearchTerms(searchTerms, label) {
    let query = '';

    if (searchTerms.length > 0) {
      let terms = searchTerms.split(',');

      for (let term of terms) {
        query += label + '"' + term.trim() + '" ';
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
      localStorage.setItem('language', languageInputEl.current.value );
      localStorage.setItem('status', statusInputEl.current.value);
      localStorage.setItem('assigned', assignedInputEl.current.checked);

      let keywordsQuery = keywordsInputEl.current.value;
      let labelQuery = formatSearchTerms(labelsInputEl.current.value, 'label:');
      let languageQuery = languageInputEl.current.value.length > 0 ? 'language:' + languageInputEl.current.value : '';
      let assignedQuery = assignedInputEl.current.checked ? '' : 'no:assignee';
      
      let statusQuery;
      switch (statusInputEl.current.value) {
        case 'open':
          statusQuery = 'is:open';
          break;
        case 'closed':
          statusQuery = 'is:closed';
          break;
        default:
          statusQuery = '';
      }

      let searchQuery = `${keywordsQuery} ${labelQuery} ${languageQuery} ${assignedQuery} ${statusQuery}`;

      axios.post('/api/github/graphql', {
        query: searchQuery,
        pageSize: resultsPerPage,
        startCursor: startCursor,
        endCursor: endCursor
      }).then(function (response) {
        return response.data;
      }).then(function (data) {
        setTotalCount(data.data.search.issueCount);
        setStartCursor(data.data.search.pageInfo.startCursor);
        setEndCursor(data.data.search.pageInfo.endCursor);
        setHasNextPage(data.data.search.pageInfo.hasNextPage);
        setHasPrevPage(data.data.search.pageInfo.hasPreviousPage);
        setResponse(data.data.search.nodes);
      });
    } else {
      labelsInputEl.current.value = localStorage.getItem('labels') || '';
      keywordsInputEl.current.value = localStorage.getItem('keywords') || '';
      languageInputEl.current.value = localStorage.getItem('language') || '';
      statusInputEl.current.value = localStorage.getItem('status') || 'open';
      assignedInputEl.current.checked = localStorage.getItem('assigned') ? JSON.parse(localStorage.getItem('assigned')) : false;
    }
    // We only want certain things to trigger useEffect, not everything it technically depends on
    // eslint-disable-next-line
  }, [submitCount]);

  function handleSubmit(e) {
    e.preventDefault();

    setPage(1);
    setStartCursor(null);
    setEndCursor(null);
    setSubmitCount(submitCount + 1);
  }

  const handleNextButton = () => {
    setStartCursor(null);
    setSubmitCount(submitCount + 1);
  };

  const handlePrevButton = () => {
    setEndCursor(null);
    setSubmitCount(submitCount + 1);
  };

  return (
    <div className="App">
      <div className="App-header">
        <h1>Open Source Help Wanted</h1>
        <h2>Find issues you can work on in Github. Be a contributor!</h2>
      </div>
      <div className="App-intro">
        <form onSubmit={handleSubmit}>
          <div className="input-elements">
            <div className="label-search-box">
              <InputElement label={'Github label names'} placeholder={'help wanted, bug'} reference={labelsInputEl} />
              <InputElement label={'Keywords'} placeholder={'open source, forms'} reference={keywordsInputEl} />
              <InputElement label={'Language'} placeholder={'javascript'} reference={languageInputEl} />
              <select ref={statusInputEl}>
                <option value="open">Open</option>
                <option value="closed">Closed</option>
                <option value="either">Open or Closed</option>
              </select>
              <p><input type="checkbox" ref={assignedInputEl} />Possibly Assigned?</p>
              <button className="searchButton" type="submit">Search</button>
            </div>
          </div>
        </form>
      </div>
      <div className="app-body">
        <Pagination currentPage={page} totalCount={totalCount} resultsPerPage={resultsPerPage} prevlickHandler={handlePrevButton} nextClickHandler={handleNextButton} hasPrevPage={hasPrevPage} hasNextPage={hasNextPage} />
        <div className="app-results">
          <Issues data={response} />
        </div>
        <Pagination currentPage={page} totalCount={totalCount} resultsPerPage={resultsPerPage} prevlickHandler={handlePrevButton} nextClickHandler={handleNextButton} hasPrevPage={hasPrevPage} hasNextPage={hasNextPage} />
      </div>
      <footer>
        <p><a href="https://github.com/jeffslofish/open-source-help-wanted">Fork me on Github and contribute!</a></p>
      </footer>
    </div>
  );
}

export default App;
