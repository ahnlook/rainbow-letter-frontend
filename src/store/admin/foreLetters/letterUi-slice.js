import { createSlice } from '@reduxjs/toolkit';

import { formatDateToYMD, getPastDate } from 'utils/date';
import { fetchForeLetters } from './letters-actions';

// type FilterOption = {
//   type: 'ALL' | 'WAIT' | 'COMPLETE';
//   startDate: string;
//   endDate: string;
//   page: number;
//   size: number;
//   email: string;
// };

// type LetterUi = {
//   filterOption: FilterOption;
//   totalPages: number;
//   status: 'idle' | 'loading' | 'success' | 'failed';
//   error: string | null;
// };

const TODAY = formatDateToYMD();
const DEFAULT_LETTERS_PER_PAGE = 50;

const initialState = {
  filterOption: {
    startDate: TODAY,
    page: 0,
    size: DEFAULT_LETTERS_PER_PAGE,
    email: '',
    status: 'null',
  },
  totalPages: 1,
  status: 'idle',
  error: null,
};

const adminLetterUiSlice = createSlice({
  name: 'adminForeLetterUi',
  initialState,
  reducers: {
    setFilterOption(state, action) {
      const isPageOnly =
        Object.keys(action.payload).length === 1 && 'page' in action.payload;

      if (isPageOnly) {
        state.filterOption.page = action.payload.page;
      } else {
        state.filterOption = {
          ...state.filterOption,
          ...action.payload,
          page: 0,
        };
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchForeLetters.fulfilled, (state, action) => {
      state.status = 'success';
      state.totalPages = action.payload.page.totalPages;
    });
  },
});

export const letterUiActions = adminLetterUiSlice.actions;
export default adminLetterUiSlice;
