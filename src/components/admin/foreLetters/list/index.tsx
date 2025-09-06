import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import LetterTable from './LetterTable';
import Pagination from './Pagination';
import { fetchForeLetters } from 'store/admin/foreLetters/letters-actions';
import { AppDispatch } from 'store';

function ForeLetters() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchForeLetters());
  }, [dispatch]);

  return (
    <div className="w-full min-w-[37.5rem] text-solo-label">
      <LetterTable />
      <Pagination />
    </div>
  );
}

export default ForeLetters;
