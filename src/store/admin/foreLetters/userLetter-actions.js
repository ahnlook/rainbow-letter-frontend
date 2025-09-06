import { createAsyncThunk } from '@reduxjs/toolkit';

import api from '../../../api';

export const fetchUserLetters = createAsyncThunk(
  'adminUserForeLetter/fetchLetters',
  async (_, { getState }) => {
    const { filterOption } = getState().adminUserLetters;

    const queryParams = new URLSearchParams({
      type: filterOption.type,
      startDate: filterOption.startDate,
      endDate: filterOption.endDate,
      page: filterOption.page,
      size: filterOption.size,
      email: filterOption.email,
    });

    const response = await api.get(`/api/admins/letters/list?${queryParams}`);
    return response.data;
  }
);
