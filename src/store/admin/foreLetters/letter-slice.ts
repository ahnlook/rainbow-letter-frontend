import { createSlice } from '@reduxjs/toolkit';
import { fetchLetter } from './letters-actions';
import { Letter } from 'types/letters';

interface AdminLetterState {
  letterData: Letter | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: AdminLetterState = {
  letterData: null,
  status: 'idle',
  error: null,
};

const adminLetterSlice = createSlice({
  name: 'adminForeLetter',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLetter.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLetter.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // state.letterData = action.payload;
      })
      .addCase(fetchLetter.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch letter';
      });
  },
});

export default adminLetterSlice;
