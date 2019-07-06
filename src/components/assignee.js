import React, { Component } from 'react';

class Assignee extends Component {
  render() {

    let imgStyle = {
      maxHeight: '20px',
      maxWidth: '20px'
    };

    return (
      <a href={this.props.html_url}> <img src={this.props.avatar_url} style={imgStyle} alt="Assignee Img"/></a>
    );
  }
}

export default Assignee;
