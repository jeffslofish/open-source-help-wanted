import React from 'react';
import PropTypes from 'prop-types';

function Pagination(props) {
  return (
    <div>
      {props.currentPage > 1 &&
        <button onClick={props.prevlickHandler}>Prev</button>
      }
      {props.currentPage < props.totalPages &&
        <button onClick={props.nextClickHandler}>Next</button>
      }
    </div>
  );
}

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  prevlickHandler: PropTypes.func.isRequired,
  nextClickHandler: PropTypes.func.isRequired
};

export default Pagination;
