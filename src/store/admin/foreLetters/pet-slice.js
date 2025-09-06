import { createSlice } from '@reduxjs/toolkit';

import { fetchPets } from './pet-actions.js';

const initialState = {
  pets: [],
  status: 'idle',
  error: null,
};

const adminPetSlice = createSlice({
  name: 'adminPet',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPets.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPets.fulfilled, (state, action) => {
        state.status = 'success';
        state.pets = action.payload;
      })
      .addCase(fetchPets.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const adminPetActions = adminPetSlice.actions;
export default adminPetSlice;
