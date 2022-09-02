import PropTypes from 'prop-types';

const Pagination = ({
  totalCount,
  resultsPerPage,
  prevlickHandler,
  nextClickHandler,
  currentPage,
}) => {
  const totalPages =
    totalCount === 0 ? 0 : Math.floor(totalCount / resultsPerPage) + 1;

  return (
    <div style={{ width: '100%', textAlign: 'center' }}>
      {currentPage > 1 && (
        <button
          style={{ display: 'inline-block', marginRight: '20px' }}
          onClick={prevlickHandler}
        >
          Prev
        </button>
      )}
      {totalPages > 0 && (
        <p style={{ display: 'inline-block' }} className='total-count'>
          Displaying Page {currentPage} of {totalPages}
        </p>
      )}
      {currentPage < totalPages && (
        <button
          style={{ display: 'inline-block', marginLeft: '20px' }}
          onClick={nextClickHandler}
        >
          Next
        </button>
      )}
    </div>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalCount: PropTypes.number.isRequired,
  resultsPerPage: PropTypes.number.isRequired,
  prevlickHandler: PropTypes.func.isRequired,
  nextClickHandler: PropTypes.func.isRequired,
};

export default Pagination;
