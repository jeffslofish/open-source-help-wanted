import React, { Component } from 'react';
import Labels from './labels';
import Moment from 'react-moment';

class Issue extends Component {
  render() {
    return (
      <div className="issue">
        <h2><a href={this.props.html_url}>{this.props.title}</a></h2>
        <Labels labels={this.props.labels}/>
        <p className="issueBody">{this.props.body}</p>
        <div><Moment fromNow parse="YYYY-MM-DDTHH:mm:ssZ">{this.props.updated_at}></Moment></div>
        <div>{this.props.updated_at}</div>
      </div>
    );
  }
}


export default Issue;
