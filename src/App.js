import React, {Component} from 'react';
import Switch from 'react-toggle-switch';
import Issues from './components/issues';
import config from './config';
import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      totalCount: '',
      sortDesc: true,
      sortType: 'updated',
      issueAssigned: false,
      issues: [],
      labelValues: '',
      keywordValues: ''
    };

    this.toggleSortType = this.toggleSortType.bind(this);
    this.toggleSortOrder = this.toggleSortOrder.bind(this);
    this.toggleIssueAssigned = this.toggleIssueAssigned.bind(this);
    this.initiateAPICall = this.initiateAPICall.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleInputBlur = this.handleInputBlur.bind(this);
  }

  initiateAPICall(sortDesc, sortType, labelValues, keywordValues, issueAssigned) {
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

    let self = this;
    fetch(myRequest, myInit).then(function (response) {
      return response.json();
    }).then(function (data) {
      self.setState({
        totalCount: data.total_count,
        issues: data.items,
        sortDesc: sortDesc,
        sortType: sortType,
        labelValues: labelValues,
        issueAssigned: issueAssigned
      });
    });
  }

  render() {
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
                         onKeyPress={this.handleFormChange} onBlur={this.handleInputBlur}/>
                </div>
                <div className="input-component">
                  <label className="label-name">Keywords</label>
                  <input className="input-element" name="keywordValues" type="text"
                        placeholder="open source, forms"
                         onKeyPress={this.handleFormChange} onBlur={this.handleInputBlur}/>
                </div>
              </div>

              <div className="option-inputs">
                <div className="input-element">
                  <label>Sort by created time</label>
                  <Switch on={this.state.sortType === 'updated'} onClick={this.toggleSortType}/>
                  <label>Sort by updated time</label>
                </div>

                <div className="input-element">
                  <label>Oldest first</label>
                  <Switch on={this.state.sortDesc} onClick={this.toggleSortOrder}/>
                  <label>Newest first</label>
                </div>

                <div className="input-element">
                  <label>Not Assigned</label>
                  <Switch on={this.state.issueAssigned} onClick={this.toggleIssueAssigned}/>
                  <label>Possibly Assigned</label>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="app-body">
          <p className="total-count">Displaying {this.state.issues.length} of {this.state.totalCount ? this.state.totalCount : 0} issues.</p>
          <div className="app-results">
            <Issues data={this.state.issues}/>
          </div>
        </div>
        <footer>
          <p><a href="https://github.com/jeffslofish/open-source-help-wanted">Fork me on Github and contribute!</a></p>
        </footer>
      </div>
    );

  }

  toggleSortType() {
    let sortType = 'updated';
    if (this.state.sortType === 'updated') {
      sortType = 'created';
    }
    this.initiateAPICall(this.state.sortDesc, sortType, this.state.labelValues, this.state.keywordValues, this.state.issueAssigned);
  }

  toggleSortOrder() {
    this.initiateAPICall(!this.state.sortDesc, this.state.sortType, this.state.labelValues, this.state.keywordValues, this.state.issueAssigned);
  }

  toggleIssueAssigned() {
    this.initiateAPICall(this.state.sortDesc, this.state.sortType, this.state.labelValues, this.state.keywordValues, !this.state.issueAssigned);
  }

  handleFormChange(e) {
    if (e.key === 'Enter') {
      this.initiateAPICall(
        this.state.sortDesc,
        this.state.sortType,
        (e.target.name === 'labelValues') ? e.target.value : this.state.labelValues,
        (e.target.name === 'keywordValues') ? e.target.value : this.state.keywordValues,
        this.state.issueAssigned);
    }
  }

  handleInputBlur(e) {
    if (e.target.name === 'labelValues') {
      this.setState({labelValues: e.target.value});
    }
    if (e.target.name === 'keywordValues') {
      this.setState({keywordValues: e.target.value});
    }

  }
}

export default App;
