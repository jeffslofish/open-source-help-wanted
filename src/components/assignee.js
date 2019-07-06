import React from 'react';

function Assignee(props) {
  let imgStyle = {
    maxHeight: '20px',
    maxWidth: '20px'
  };

  return (
    <a href={props.html_url}> <img src={props.avatar_url} style={imgStyle} alt="Assignee Img"/></a>
  );
}

export default Assignee;
