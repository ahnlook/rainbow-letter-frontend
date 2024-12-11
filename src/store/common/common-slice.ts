import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  lng: 'en',
};

const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setLng(state, action) {
      state.lng = action.payload;
    },
  },
});

export const modalActions = commonSlice.actions;
export default commonSlice;
