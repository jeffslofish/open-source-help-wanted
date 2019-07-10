import React, { useState, useEffect, useRef } from 'react';
import Issues from './components/Issues';
import InputElement from './components/InputElement';
import InputToggle from './components/InputToggle';
import Pagination from './components/Pagination';
import './App.css';

function App() {
  const [totalCount, setTotalCount] = useState(0);
  const [sortDesc, setSortDesc] = useState(true);
  const [sortType, setSortType] = useState('created');
  const [issueAssigned, setIssueAssigned] = useState(false);
  const [labelsValues, setLabelsValues] = useState('');
  const [keywordValues, setKeywordValues] = useState('');
  const [languageValue, setLanguageValue] = useState('');
  const [issues, setIssues] = useState([]);
  const [page, setPage] = useState(1);
  const [submitCount, setSubmitCount] = useState(0);

  const labelsInputEl = useRef(null);
  const keywordsInputEl = useRef(null);
  const languageInputEl = useRef(null);

  const resultsPerPage = 25;

  useEffect(() => {
    if (submitCount > 0) {
      initiateAPICall(sortDesc, sortType, labelsValues, keywordValues, languageValue, issueAssigned, page);
    }
  }, [sortDesc, sortType, issueAssigned, page, labelsValues, keywordValues, languageValue, submitCount]);

  function initiateAPICall(sortDesc, sortType, labelsValues, keywordValues, languageValue, issueAssigned, page) {
    function formatSearchTerms(searchTerms, label) {
      let query = '';

      if (searchTerms.length > 0) {
        let terms = searchTerms.split(',');

        for (let term of terms) {
          query += label + '"' + term.trim() + '"+';
        }
        if (query.length > 0) {
          query = query.slice(0, -1);
        }
      }
      return query;
    }

    let keywordQuery = formatSearchTerms(keywordValues, '');
    let labelQuery = formatSearchTerms(labelsValues, 'label:');
    let languageQuery = languageValue.length > 0 ? '+language:' + languageValue : '';

    let maybePlus = '+';
    if (keywordQuery === '') {
      maybePlus = '';
    }

    let sortOrder = sortDesc ? 'desc' : 'asc';
    let issueAssignedState = issueAssigned ? '' : '+no:assignee';
    let searchQuery = keywordQuery + maybePlus + labelQuery + languageQuery + '+type:issue+state:open' +
      issueAssignedState + '&page=' + page + '&sort=' + sortType + '&order=' + sortOrder + '&per_page=' + resultsPerPage;

    let myRequest = new Request('/api/github/rest?q=' + searchQuery);

    fetch(myRequest).then(function (response) {
      return response.json();
    }).then(function (data) {
      setTotalCount(Number.parseInt(data.total_count, 10));
      setIssues(data.items);
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    setLabelsValues(labelsInputEl.current.value);
    setKeywordValues(keywordsInputEl.current.value);
    setLanguageValue(languageInputEl.current.value);
    setSubmitCount(submitCount + 1);
  }

  function toggleSortType() {
    let sortTypeParam = sortType;
    if (sortTypeParam === 'updated') {
      sortTypeParam = 'created';
    } else {
      sortTypeParam = 'updated';
    }

    setSortType(sortTypeParam);
  }

  function toggleSortOrder() {
    setSortDesc(!sortDesc);
  }

  function toggleIssueAssigned() {
    setIssueAssigned(!issueAssigned);
  }

  const handleNextButton = () => { setPage(page + 1) };
  const handlePrevButton = () => { setPage(page > 1 ? page - 1 : page) }

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
              <InputToggle leftLabel={'Sort by created time'} rightLabel={'Sort by updated time'} value={sortType === 'updated'} clickHandler={toggleSortType} />
              <InputToggle leftLabel={'Oldest first'} rightLabel={'Newest first'} value={sortDesc} clickHandler={toggleSortOrder} />
              <InputToggle leftLabel={'Not Assigned'} rightLabel={'Possibly Assigned'} value={issueAssigned} clickHandler={toggleIssueAssigned} />
            </div>
          </div>
        </form>
      </div>
      <div className="app-body">
        <Pagination currentPage={page} totalCount={totalCount} resultsPerPage={resultsPerPage} prevlickHandler={handlePrevButton} nextClickHandler={handleNextButton} />
        <div className="app-results">
          <Issues data={issues} />
        </div>
        <Pagination currentPage={page} totalCount={totalCount} resultsPerPage={resultsPerPage} prevlickHandler={handlePrevButton} nextClickHandler={handleNextButton} />
      </div>
      <footer>
        <p><a href="https://github.com/jeffslofish/open-source-help-wanted">Fork me on Github and contribute!</a></p>
      </footer>
    </div>
  );
}

export default App;
