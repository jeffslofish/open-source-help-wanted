import React from 'react';
import PropTypes from 'prop-types';

const Avatar = ({ url, user_url }) => {
  return (
    <div className='avatar'>
      <a href={user_url}>
        <img style={imgStyle} src={url} alt='' />
      </a>
    </div>
  );
};

let imgStyle = {
  maxHeight: '100px',
  maxWidth: '100px'
};

Avatar.propTypes = {
  user_url: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
};

export default Avatar;
