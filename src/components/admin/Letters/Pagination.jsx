import { useSelector, useDispatch } from 'react-redux';

import { letterUiActions } from '../../../store/admin/letterUi-slice';
import { fetchLetters } from '../../../store/admin/letters-actions';
import doubleArrowLeft from '../../../assets/admin/doubleArrowLeft.svg';
import doubleArrowRight from '../../../assets/admin/doubleArrowRight.svg';

function Pagination() {
  const dispatch = useDispatch();
  const {
    filterOption: { page: currentPage },
    totalPages,
  } = useSelector((state) => state.adminLetterUi);

  const getPaginationNumbers = () => {
    const maxPagesToShow = 10;
    const halfPagesToShow = Math.floor(maxPagesToShow / 2);
    let startPage;
    let endPage;

    if (totalPages <= maxPagesToShow) {
      startPage = 0;
      endPage = totalPages - 1;
    } else {
      startPage = Math.max(
        0,
        Math.min(currentPage - halfPagesToShow, totalPages - maxPagesToShow)
      );
      endPage = Math.min(startPage + maxPagesToShow - 1, totalPages - 1);

      if (endPage - startPage + 1 < maxPagesToShow) {
        startPage = Math.max(0, endPage - maxPagesToShow + 1);
      }
    }

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, index) => startPage + index
    );
  };

  const handlePageChange = (newPage) => {
    dispatch(letterUiActions.setFilterOption({ page: newPage }));
    dispatch(fetchLetters());
  };

  return (
    <div className="mt-2.5 flex items-center justify-center space-x-2 pb-7">
      {totalPages > 10 && (
        <button
          className="size-7 rounded"
          type="button"
          disabled={currentPage === 0}
          onClick={() => handlePageChange(0)}
        >
          <img src={doubleArrowLeft} alt="<<" />
        </button>
      )}
      {getPaginationNumbers().map((number) => (
        <button
          className={`size-7 rounded ${
            currentPage === number ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
          key={number}
          type="button"
          onClick={() => {
            handlePageChange(number);
          }}
        >
          {number + 1}
        </button>
      ))}
      {totalPages > 10 && (
        <button
          className="size-7 rounded"
          type="button"
          disabled={currentPage === totalPages - 1}
          onClick={() => handlePageChange(totalPages - 1)}
        >
          <img src={doubleArrowRight} alt=">>" />
        </button>
      )}
    </div>
  );
}

export default Pagination;
