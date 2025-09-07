import { createSlice } from '@reduxjs/toolkit';

import {
  fetchUserInfo,
  updatePhoneNumber,
  deletePhoneNumber,
} from 'store/user/user-actions';
import { Status, Error } from 'types/store';
import { User } from 'types/user';

type UserState = {
  user: User;
  status: Status;
  error: Error;
};

const initialState: UserState = {
  user: {
    id: '',
    email: '',
    phoneNumber: null,
    role: 'ROLE_USER',
    isPetInitiatedLetterEnabled: false,
  },
  status: 'idle',
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logOut(state) {
      state.user = initialState.user;
      state.status = initialState.status;
      state.error = initialState.error;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserInfo.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        state.status = 'success';
        state.user = action.payload;
      })
      .addCase(fetchUserInfo.rejected, (state, action) => {
        state.status = 'failed';
        if (action.error.message) {
          state.error = action.error.message;
        }
      })
      .addCase(updatePhoneNumber.fulfilled, (state, action) => {
        // API 응답에서 phoneNumber를 찾거나, 없으면 요청한 값 사용
        if (action.payload && action.payload.phoneNumber) {
          state.user.phoneNumber = action.payload.phoneNumber;
        } else {
          // API 응답에 phoneNumber가 없으면 요청한 값으로 업데이트
          state.user.phoneNumber = action.meta.arg;
        }
      })
      .addCase(deletePhoneNumber.fulfilled, (state) => {
        state.status = 'success';
        state.user.phoneNumber = null;
      });
  },
});

export const userActions = userSlice.actions;
export default userSlice;
