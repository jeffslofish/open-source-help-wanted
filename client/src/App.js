import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Issues from './components/Issues';
import InputElement from './components/InputElement';
import InputToggle from './components/InputToggle';
import Pagination from './components/Pagination';
import './App.css';

function App() {
  const [totalCount, setTotalCount] = useState(0);
  const sortDescOriginalValue = localStorage.getItem('sortDesc') ? JSON.parse(localStorage.getItem('sortDesc')) : true;
  const sortCreatedOrignalValue = localStorage.getItem('sortCreated') ? JSON.parse(localStorage.getItem('sortCreated')) : true;
  const issueAssignedOriginalValue = localStorage.getItem('issueAssigned') ? JSON.parse(localStorage.getItem('issueAssigned')) : false;
  const labelsOriginalValue = localStorage.getItem('labels') || '';
  const keywordsOriginalValue = localStorage.getItem('keywords') || '';
  const languageOriginalValue = localStorage.getItem('language') || '';
  const [sortDesc, setSortDesc] = useState(sortDescOriginalValue);
  const [sortCreated, setSortCreated] = useState(sortCreatedOrignalValue);
  const [issueAssigned, setIssueAssigned] = useState(issueAssignedOriginalValue);
  const [labelsValues, setLabelsValues] = useState(labelsOriginalValue);
  const [keywordsValues, setKeywordsValues] = useState(keywordsOriginalValue);
  const [languageValue, setLanguageValue] = useState(languageOriginalValue);
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

  const resultsPerPage = 10;

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
      localStorage.setItem('labels', labelsValues);
      localStorage.setItem('keywords', keywordsValues);
      localStorage.setItem('language', languageValue);

      
  
      // let keywordQuery = formatSearchTerms(keywordValues, '');
      let labelQuery = escape(formatSearchTerms(labelsValues, 'label:'));
      //let languageQuery = languageValue.length > 0 ? '+language:' + encodeURIComponent(languageValue) : '';
  
      // let maybePlus = '+';
      // if (keywordQuery === '' || labelQuery === '') {
      //   maybePlus = '';
      // }
  
      //let sortType = sortCreated ? 'created' : 'updated';
      //let sortOrder = sortDesc ? 'desc' : 'asc';
      //let issueAssignedState = issueAssigned ? '' : '+no:assignee';
      //let searchQuery = keywordQuery + maybePlus + labelQuery + languageQuery + '+type:issue+state:open' +
      //  issueAssignedState + '&page=' + page + '&sort=' + sortType + '&order=' + sortOrder + '&per_page=' + resultsPerPage;
  
      //let myRequest = new Request('/api/github/graphql?labels=' + labelQuery);
   
      axios.post('/api/github/graphql', {
        labels: labelQuery,
        pageSize: resultsPerPage,
        startCursor: startCursor,
        endCursor: endCursor
      }).then(function (response) {
  
      //fetch(myRequest).then(function (response) {
        //return response.json();
  
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
      labelsInputEl.current.value = labelsOriginalValue;
      keywordsInputEl.current.value = keywordsOriginalValue;
      languageInputEl.current.value = languageOriginalValue;
    }
  }, [sortDesc, sortCreated, issueAssigned, page, labelsValues, keywordsValues, languageValue, submitCount,
      labelsOriginalValue, keywordsOriginalValue, languageOriginalValue,
      sortDescOriginalValue, sortCreatedOrignalValue, issueAssignedOriginalValue
    ]);

  function handleSubmit(e) {
    e.preventDefault();

    setPage(1);
    setLabelsValues(labelsInputEl.current.value);
    setKeywordsValues(keywordsInputEl.current.value);
    setLanguageValue(languageInputEl.current.value);
    setSubmitCount(submitCount + 1);
  }

  function toggleSortType() {
    localStorage.setItem('sortCreated', !sortCreated);
    setSortCreated(!sortCreated);
  }

  function toggleSortOrder() {
    localStorage.setItem('sortDesc', !sortDesc);
    setSortDesc(!sortDesc);
  }

  function toggleIssueAssigned() {
    localStorage.setItem('issueAssigned', !issueAssigned);
    setIssueAssigned(!issueAssigned);
    
  }

  // const handleNextButton = () => { setPage(page + 1) };
  // const handlePrevButton = () => { setPage(page > 1 ? page - 1 : page) }

  const handleNextButton = () => { 
    setStartCursor(null);
    setSubmitCount(submitCount+1);
  };

  const handlePrevButton = () => { 
    //setStartCursor(startCursor);
    setEndCursor(null);
    setSubmitCount(submitCount+1);
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
              <button className="searchButton" type="submit">Search</button>
            </div>
            <div className="option-inputs">
              <InputToggle leftLabel={'Sort by updated time'} rightLabel={'Sort by created time'} value={sortCreated} clickHandler={toggleSortType} />
              <InputToggle leftLabel={'Oldest first'} rightLabel={'Newest first'} value={sortDesc} clickHandler={toggleSortOrder} />
              <InputToggle leftLabel={'Not Assigned'} rightLabel={'Possibly Assigned'} value={issueAssigned} clickHandler={toggleIssueAssigned} />
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
