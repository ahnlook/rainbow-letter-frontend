/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isSaving: false,
  isSuccess: false,
  letterType: null,
  isSaveToImage: false,
};

const letterSlice = createSlice({
  name: 'letter',
  initialState,
  reducers: {
    setIsSaving(state, action) {
      state.isSaving = action.payload;
    },
    setIsSuccess(state) {
      state.isSaving = false;
      state.isSuccess = true;
    },
    setisFailed(state) {
      state.isSaving = false;
      state.isSuccess = false;
    },
    selectLetter(state, action) {
      state.letterType = action.payload;
    },
    saveToImage(state, action) {
      state.isSaveToImage = action.payload;
    },
  },
});

export const letterActions = letterSlice.actions;
export default letterSlice;