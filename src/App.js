import React, { useState, useEffect } from 'react';
import Switch from 'react-toggle-switch';
import Issues from './components/issues';
import './App.css';

function App() {
  const [totalCount, setTotalCount] = useState('');
  const [sortDesc, setSortDesc] = useState(true);
  const [sortType, setSortType] = useState('created');
  const [issueAssigned, setIssueAssigned] = useState(false);
  const [labelValues, setLabelValues] = useState('');
  const [keywordValues, setKeywordValues] = useState('');
  const [language, setLanguage] = useState('');
  const [issues, setIssues] = useState([]);

  const [labelValuesSearch, setLabelValuesSearch] = useState('');
  const [keywordValuesSearch, setKeywordValuesSeach] = useState('');
  const [languageSearch, setLanguageSearch] = useState('');

  useEffect(() => {
    if (keywordValuesSearch.length > 0 || labelValuesSearch.length > 0 || languageSearch.length > 0) {
      initiateAPICall(sortDesc, sortType, labelValuesSearch, keywordValuesSearch, languageSearch, issueAssigned);
    }
  }, [sortDesc, sortType, issueAssigned, labelValuesSearch, keywordValuesSearch, languageSearch]);

  function initiateAPICall(sortDesc, sortType, labelValues, keywordValues, language, issueAssigned) {
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
    let resultsPerPage = 25;
    let sortOrder = sortDesc ? 'desc' : 'asc';
    let issueAssignedState = issueAssigned ? '' : '+no:assignee';
    let searchQuery = keywordQuery + maybePlus + labelQuery + languageQuery + '+type:issue+state:open' +
      issueAssignedState + '&page=1&sort=' + sortType + '&order=' + sortOrder + '&per_page=' + resultsPerPage;

    let myRequest = new Request('http://localhost:3001/github/rest?q=' + searchQuery);

    

    fetch(myRequest).then(function (response) {
      return response.json();
    }).then(function (data) {
      setTotalCount(data.total_count);
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
              <div className="input-component">
                <label className="label-name">Github label names</label>
                <input className="input-element" name="labelValues" type="text"
                  placeholder="help wanted, bug" value={labelValues} onChange={handleLabelValuesChange} />
              </div>
              <div className="input-component">
                <label className="label-name">Keywords</label>
                <input className="input-element" name="keywordValues" type="text"
                  placeholder="open source, forms" value={keywordValues} onChange={handlekeywordValuesChange} />
              </div>
              <div className="input-component">
                <label className="label-name">Language</label>
                <input className="input-element" name="language" type="text"
                  placeholder="javascript" value={language} onChange={handleLanguageChange} />
              </div>
              <button className="searchButton" type="submit">Search</button>
            </div>

            <div className="option-inputs">
              <div className="input-element">
                <label>Sort by created time</label>
                <Switch on={sortType === 'updated'} onClick={toggleSortType} />
                <label>Sort by updated time</label>
              </div>

              <div className="input-element">
                <label>Oldest first</label>
                <Switch on={sortDesc} onClick={toggleSortOrder} />
                <label>Newest first</label>
              </div>

              <div className="input-element">
                <label>Not Assigned</label>
                <Switch on={issueAssigned} onClick={toggleIssueAssigned} />
                <label>Possibly Assigned</label>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div className="app-body">
        <p className="total-count">Displaying {issues.length} of {totalCount ? totalCount : 0} issues.</p>
        <div className="app-results">
          <Issues data={issues} />
        </div>
      </div>
      <footer>
        <p><a href="https://github.com/jeffslofish/open-source-help-wanted">Fork me on Github and contribute!</a></p>
      </footer>
    </div>
  );
}

export default App;
