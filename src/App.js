import React, { useState } from 'react';
import Switch from 'react-toggle-switch';
import Issues from './components/issues';
import config from './config';
import './App.css';

export default function App() {
  const [totalCount, setTotalCount] = useState('');
  const [sortDesc, setSortDesc] = useState(true);
  const [sortType, setSortType] = useState('created');
  const [issueAssigned, setIssueAssigned] = useState(false);
  const [labelValues, setLabelValues] = useState('');
  const [keywordValues, setKeywordValues] = useState('');
  const [issues, setIssues] = useState([]);

  function initiateAPICall(sortDesc, sortType, labelValues, keywordValues, issueAssigned) {
    let myHeaders = new Headers({
      Authorization: 'token ' + config.apiToken
    });

    let myInit = {
      method: 'GET',
      headers: myHeaders,
      mode: 'cors'
    };

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

    let maybePlus = '+';
    if (keywordQuery === '') {
      maybePlus = '';
    }
    let resultsPerPage = 25;
    let sortOrder = sortDesc ? 'desc' : 'asc';
    let issueAssignedState = issueAssigned ? '' : '+no:assignee';
    let searchQuery = keywordQuery + maybePlus + labelQuery + '+type:issue+state:open' + issueAssignedState + '&page=1&sort=' + sortType + '&order=' + sortOrder + '&per_page=' + resultsPerPage;
    let myRequest = new Request('https://api.github.com/search/issues?q=' + searchQuery);

    fetch(myRequest, myInit).then(function (response) {
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

  return (
    <div className="App">
      <div className="App-header">
        <h1>Open Source Help Wanted</h1>
        <h2>Find issues you can work on in Github. Be a contributor!</h2>
      </div>
      <div className="App-intro">
        <form>
          <div className="input-elements">
            <div className="label-search-box">
              <div className="input-component">
              <label className="label-name">Github label names</label>
                <input className="input-element" name="labelValues" type="text"
                        placeholder="help wanted, bug"
                        onKeyPress={handleFormChange} onBlur={handleInputBlur}/>
              </div>
              <div className="input-component">
                <label className="label-name">Keywords</label>
                <input className="input-element" name="keywordValues" type="text"
                      placeholder="open source, forms"
                        onKeyPress={handleFormChange} onBlur={handleInputBlur}/>
              </div>
            </div>

            <div className="option-inputs">
              <div className="input-element">
                <label>Sort by created time</label>
                <Switch on={sortType === 'updated'} onClick={toggleSortType}/>
                <label>Sort by updated time</label>
              </div>

              <div className="input-element">
                <label>Oldest first</label>
                <Switch on={sortDesc} onClick={toggleSortOrder}/>
                <label>Newest first</label>
              </div>

              <div className="input-element">
                <label>Not Assigned</label>
                <Switch on={issueAssigned} onClick={toggleIssueAssigned}/>
                <label>Possibly Assigned</label>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div className="app-body">
        <p className="total-count">Displaying {issues.length} of {totalCount ? totalCount : 0} issues.</p>
        <div className="app-results">
          <Issues data={issues}/>
        </div>
      </div>
      <footer>
        <p><a href="https://github.com/jeffslofish/open-source-help-wanted">Fork me on Github and contribute!</a></p>
      </footer>
    </div>
  );

  function toggleSortType() {
    let sortTypeParam = sortType;
    if (sortTypeParam === 'updated') {
      sortTypeParam = 'created';
    } else {
      sortTypeParam = 'updated';
    }

    initiateAPICall(sortDesc, sortTypeParam, labelValues, keywordValues, issueAssigned);
  }

  function toggleSortOrder() {
    initiateAPICall(!sortDesc, sortType, labelValues, keywordValues, issueAssigned);
  }

  function toggleIssueAssigned() {
    initiateAPICall(sortDesc, sortType, labelValues, keywordValues, !issueAssigned);
  }

  function handleFormChange(e) {
    if (e.key === 'Enter') {
      initiateAPICall(
        sortDesc,
        sortType,
        (e.target.name === 'labelValues') ? e.target.value : labelValues,
        (e.target.name === 'keywordValues') ? e.target.value : keywordValues,
        issueAssigned);
    }
  }

  function handleInputBlur(e) {
    if (e.target.name === 'labelValues') {
      setLabelValues(e.target.value);
    }
    if (e.target.name === 'keywordValues') {
      setKeywordValues(e.target.value);
    }
  }
}
