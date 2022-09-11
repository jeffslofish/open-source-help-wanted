type Props = {
  currentPage: number;
  totalCount: number;
  resultsPerPage: number;
  prevlickHandler: () => void;
  nextClickHandler: () => void;
};

const Pagination = ({
  totalCount,
  resultsPerPage,
  prevlickHandler,
  nextClickHandler,
  currentPage,
}: Props) => {
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

export default Pagination;
