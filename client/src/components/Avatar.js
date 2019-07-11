import React from 'react';
import PropTypes from 'prop-types';

function Avatar(props) {
  let imgStyle = {
    maxHeight: '100px',
    maxWidth: '100px'
  };

  return (
    <div className="avatar">
      <a href={props.url}><img style={imgStyle} src={props.avatarUrl} alt="User Avatar"/></a>
    </div>
  );
}

Avatar.propTypes = {
  avatarUrl: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
};

export default Avatar;

