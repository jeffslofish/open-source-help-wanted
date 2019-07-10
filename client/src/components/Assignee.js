import React from 'react';
import PropTypes from 'prop-types';

function Assignee(props) {
  let imgStyle = {
    maxHeight: '20px',
    maxWidth: '20px'
  };

  return (
    <a href={props.html_url}> <img src={props.avatar_url} style={imgStyle} alt="Assignee Img"/></a>
  );
}

Assignee.propTypes = {
  html_url: PropTypes.string.isRequired,
  avatar_url: PropTypes.string.isRequired
};

export default Assignee;
