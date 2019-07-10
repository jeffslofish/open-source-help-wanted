import React, { useState, useEffect } from 'react';
import Issues from './components/Issues';
import InputElement from './components/InputElement';
import './App.css';
import InputToggle from './components/InputToggle';
import Pagination from './components/Pagination';

function App() {
  const [totalCount, setTotalCount] = useState(0);
  const [sortDesc, setSortDesc] = useState(true);
  const [sortType, setSortType] = useState('created');
  const [issueAssigned, setIssueAssigned] = useState(false);
  const [labelValues, setLabelValues] = useState('');
  const [keywordValues, setKeywordValues] = useState('');
  const [language, setLanguage] = useState('');
  const [issues, setIssues] = useState([]);
  const [page, setPage] = useState(1);

  const [labelValuesSearch, setLabelValuesSearch] = useState('');
  const [keywordValuesSearch, setKeywordValuesSeach] = useState('');
  const [languageSearch, setLanguageSearch] = useState('');

  const resultsPerPage = 25;

  useEffect(() => {
    if (keywordValuesSearch.length > 0 || labelValuesSearch.length > 0 || languageSearch.length > 0) {
      initiateAPICall(sortDesc, sortType, labelValuesSearch, keywordValuesSearch, languageSearch, issueAssigned, page);
    }
  }, [sortDesc, sortType, issueAssigned, labelValuesSearch, keywordValuesSearch, languageSearch, page]);

  function initiateAPICall(sortDesc, sortType, labelValues, keywordValues, language, issueAssigned, page) {
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
    let labelQuery = formatSearchTerms(labelValues, 'label:');
    let languageQuery = language.length > 0 ? '+language:' + language : '';

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
      setSortDesc(sortDesc);
      setSortType(sortType);
      setLabelValues(labelValues);
      setIssueAssigned(issueAssigned);
      setIssues(data.items);
    });
  }

  function handleLabelValuesChange(event) {
    setLabelValues(event.target.value);
  }

  function handlekeywordValuesChange(event) {
    setKeywordValues(event.target.value);
  }

  function handleLanguageChange(event) {
    setLanguage(event.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    setPage(1);
    setLabelValuesSearch(labelValues);
    setKeywordValuesSeach(keywordValues);
    setLanguageSearch(language);
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
              <InputElement label={'Github label names'} placeholder={'help wanted, bug'} value={labelValues} changeHandler={handleLabelValuesChange} />
              <InputElement label={'Keywords'} placeholder={'open source, forms'} value={keywordValues} changeHandler={handlekeywordValuesChange} />
              <InputElement label={'Language'} placeholder={'javascript'} value={language} changeHandler={handleLanguageChange} />
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
