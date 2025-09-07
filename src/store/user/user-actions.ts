import { createAsyncThunk } from '@reduxjs/toolkit';

import api from 'api';

export const fetchUserInfo = createAsyncThunk(
  'user/fetchUserInfo',
  async (): Promise<any> => {
    const response = await api.get('/api/users/info');
    return response.data;
  }
);

export const updatePhoneNumber = createAsyncThunk(
  'user/updatePhoneNumber',
  async (phoneNumber: string, { rejectWithValue }): Promise<any> => {
    try {
      const response = await api.put('/api/users/phone-number', {
        phoneNumber,
      });
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue({
        message: '휴대폰 번호 업데이트에 실패했습니다.',
      });
    }
  }
);

export const deletePhoneNumber = createAsyncThunk(
  'user/deletePhoneNumber',
  async (): Promise<any> => {
    const response = await api.delete(`/api/users/phone-number`);
    return response.data;
  }
);
