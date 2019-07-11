import React from 'react';
import PropTypes from 'prop-types';

function Assignee(props) {
  let imgStyle = {
    maxHeight: '20px',
    maxWidth: '20px'
  };

  return (
    <a href={props.url}> <img src={props.avatarUrl} style={imgStyle} alt="Assignee Img"/></a>
  );
}

Assignee.propTypes = {
  url: PropTypes.string.isRequired,
  avatarUrl: PropTypes.string.isRequired
};

export default Assignee;
