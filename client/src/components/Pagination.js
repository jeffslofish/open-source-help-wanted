import React from 'react';
import PropTypes from 'prop-types';

function Pagination(props) {
  const totalPages =  props.totalCount === 0 ? 0 : Math.floor(props.totalCount / props.resultsPerPage) + 1;

  return (
    <div style={{width: '100%', textAlign: 'center'}}>
      {props.hasPrevPage &&
        <button style={{display: 'inline-block', marginRight: '20px'}} onClick={props.prevlickHandler}>Prev</button>
      }
      {totalPages > 0 &&
        <p style={{display: 'inline-block'}} className="total-count">Displaying Page {props.currentPage} of {totalPages}</p>
      }
      {props.hasNextPage &&
        <button style={{display: 'inline-block', marginLeft: '20px'}} onClick={props.nextClickHandler}>Next</button>
      }
    </div>
  );
}

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalCount: PropTypes.number.isRequired,
  resultsPerPage: PropTypes.number.isRequired,
  prevlickHandler: PropTypes.func.isRequired,
  nextClickHandler: PropTypes.func.isRequired
};

export default Pagination;
