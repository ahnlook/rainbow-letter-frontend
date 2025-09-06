import { createAsyncThunk } from '@reduxjs/toolkit';

import api from '../../../api';

export const fetchPets = createAsyncThunk(
  'adminPet/fetchPets',
  async (email) => {
    const queryParams = new URLSearchParams({
      email,
    });

    const response = await api.get(`/api/pets/admin/list?${queryParams}`);
    return response.data;
  }
);
