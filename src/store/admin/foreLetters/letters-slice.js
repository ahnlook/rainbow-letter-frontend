import { createSlice } from '@reduxjs/toolkit';

import { fetchForeLetters } from './letters-actions';

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
  status: 'idle',
  error: null,
};

const adminLettersSlice = createSlice({
  name: 'adminForeLetters',
  initialState,
  reducers: {
    toggleLetterCheck(state, action) {
      const letter = state.letters.find(
        (letter) => letter.id === action.payload
      );
      if (letter) {
        letter.isChecked = !letter.isChecked;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchForeLetters.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchForeLetters.fulfilled, (state, action) => {
        state.status = 'success';
        state.letters = action.payload.content.map((letter) => ({
          ...letter,
          isChecked: false,
        }));
      })
      .addCase(fetchForeLetters.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const adminForeLetterActions = adminLettersSlice.actions;
export default adminLettersSlice;
