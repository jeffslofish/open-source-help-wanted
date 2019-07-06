import React from 'react';

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

export default Avatar;

