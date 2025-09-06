import { createSlice } from '@reduxjs/toolkit';

import { formatDateToYMD } from 'utils/date';
import { fetchUserLetters } from './userLetter-actions.js';

// type Letter = {
//   id: Number,
//   email: String,
//   summary: String,
//   content: String,
//   reply: Reply | null,
//   createdAt: String | Date,
// isCheck: Boolean,
// }

// type Reply = {
//   id: Number,
//   summary: String,
//   content: String,
//   inspection: Boolean,
//   inspectionTime: String | Date | null,
//   timestamp: Date | null,
//   chatGptContent: String | null,
// }

const initialState = {
  letters: [],
  filterOption: {
    type: 'ALL',
    startDate: '2023-01-01',
    endDate: formatDateToYMD(),
    page: 0,
    size: 20,
    email: '',
  },
  status: 'idle',
  error: null,
};

const adminUserLettersSlice = createSlice({
  name: 'adminUserLetters',
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
    builder
      .addCase(fetchUserLetters.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserLetters.fulfilled, (state, action) => {
        state.status = 'success';
        state.letters = action.payload.content;
      })
      .addCase(fetchUserLetters.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const adminUserLetterActions = adminUserLettersSlice.actions;
export default adminUserLettersSlice;
