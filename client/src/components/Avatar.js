import React from 'react';
import PropTypes from 'prop-types';

function Avatar(props) {
  let imgStyle = {
    maxHeight: '100px',
    maxWidth: '100px'
  };

  return (
    <div className="avatar">
      <a href={props.user_url}><img style={imgStyle} src={props.url} alt="User Avatar"/></a>
    </div>
  );
}

Avatar.propTypes = {
  user_url: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
};

export default Avatar;

