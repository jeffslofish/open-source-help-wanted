import React, {Component} from 'react';
import Switch from 'react-toggle-switch';
import Issues from './components/issues';
import config from './config';
import './App.css';

class App extends Component {
  constructor() {
    super();

    const placeholderLabels =
      this.state = {
        totalCount: '',
        sortDesc: true,
        sortType: 'updated',
        issues: [],
        labelValues: 'help wanted, bug'
      };

    this.toggleSortType = this.toggleSortType.bind(this);
    this.toggleSortOrder = this.toggleSortOrder.bind(this);
    this.initiateAPICall = this.initiateAPICall.bind(this);
    this.handleLabelChange = this.handleLabelChange.bind(this);

    this.initiateAPICall(this.state.sortDesc, this.state.sortType, this.state.labelValues);
  }


  initiateAPICall(sortDesc, sortType, labelValues) {
    let myHeaders = new Headers({
      Authorization: 'token ' + config.apiToken
    });

    let myInit = {
      method: 'GET',
      headers: myHeaders,
      mode: 'cors'
    };

    let labelQuery = this.state.labelValues;
    if (labelValues) {
      let labels = labelValues.split(',');

      if (labels.length > 0) {
        labelQuery = '';
      }
      for (let label of labels) {
        labelQuery += 'label:"' + label.trim() + '"+';
      }

      //Remove last +
      labelQuery = labelQuery.slice(0, -1);
    }


    let resultsPerPage = 25;
    let sortOrder = sortDesc ? 'desc' : 'asc';
    let myRequest = new Request('https://api.github.com/search/issues?q=' + labelQuery + '&per_page=' + resultsPerPage + '&type=issue&state=open&page=1&sort=' + sortType + '&order=' + sortOrder);

    let self = this;
    fetch(myRequest, myInit).then(function (response) {
      return response.json();
    }).then(function (data) {
      console.log(data);
      self.setState({
        totalCount: data.total_count,
        issues: data.items,
        sortDesc: sortDesc,
        sortType: sortType,
        labelValues: labelValues
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

        <div className="app-body">
          <div className="App-intro">
            <p className="total-count">Displaying {this.state.issues.length} of {this.state.totalCount} issues.</p>

            <div className="input-elements">
              <div className="label-search-box">
                <label className="label-name">Github label names</label>
                <input className="input-element labelSearch" type="text" placeholder="help wanted, bug"
                       onKeyPress={this.handleLabelChange}/>
              </div>

              <label className="sorting-options">Sorting Options</label>
              <div className="sort-inputs">
                <div className="input-element">
                  sort by created time
                  <Switch on={this.state.sortType === 'updated'} onClick={this.toggleSortType}/>
                  sorty by updated time
                </div>

                <div className="input-element">
                  Oldest first
                  <Switch on={this.state.sortDesc} onClick={this.toggleSortOrder}/>
                  Newest first
                </div>
              </div>
            </div>
          </div>

          <div className="app-results">
            <Issues data={this.state.issues}/>
          </div>
        </div>
        <footer>
          <p><a href="https://github.com/jeffslofish/open-source-help-wanted">Fork me on Github!</a></p>
        </footer>
      </div>
    );

  }

  toggleSortType() {
    let sortType = 'updated';
    if (this.state.sortType === 'updated') {
      sortType = 'created';
    }
    this.initiateAPICall(this.state.sortDesc, sortType, this.state.labelValues);
  }

  toggleSortOrder() {
    this.initiateAPICall(!this.state.sortDesc, this.state.sortType, this.state.labelValues);
  }

  handleLabelChange(event) {
    if (event.key === 'Enter') {
      console.log('tagetvalue: ' + event.target.value);
      this.initiateAPICall(this.state.sortDesc, this.state.sortType, (event.target.value ? event.target.value : ' '));
    }
  }

}

export default App;
