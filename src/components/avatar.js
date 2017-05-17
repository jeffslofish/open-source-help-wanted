import React, { Component } from 'react';

class Avatar extends Component {
  render() {

    let imgStyle = {
      maxHeight: '100px',
      maxWidth: '100px'
    };

    return (
      <div className="avatar">
        <a href={this.props.user_url}><img style={imgStyle} src={this.props.url} alt="User Avatar"/></a>
      </div>
    );
  }
}


export default Avatar;

