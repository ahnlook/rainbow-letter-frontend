import { createAsyncThunk } from '@reduxjs/toolkit';

import api from '../../../api';

export const fetchForeLetters = createAsyncThunk(
  'adminForeLetter/fetchLetters',
  async (_, { getState }) => {
    const { filterOption } = getState().adminForeLetterUi;

    const queryParams = new URLSearchParams({
      searchDate: filterOption.startDate,

      email: filterOption.email,

      page: filterOption.page,
      size: filterOption.size,
    });

    if (filterOption.status !== 'null') {
      queryParams.append('status', filterOption.status);
    }

    const response = await api.get(
      `/api/admins/pet-initiated-letters?${queryParams}`
    );
    return response.data;
  }
);

export const fetchLetter = createAsyncThunk(
  'adminForeLetter/fetchLetter',
  async (userId, petId, letterId) => {
    const queryParams = new URLSearchParams({
      user: userId,
      pet: petId,
    });

    const response = await api.get(
      `/api/admins/letters/${letterId}?${queryParams}`
    );
    return response;
  }
);

export const editReply = createAsyncThunk(
  'adminForeLetter/editReply',
  async ({ replyId, editedReply }, { getState }) => {
    const response = await api.put(
      `/api/admins/replies/${replyId}`,
      editedReply
    );

    const inspection = getState().adminForeLetters?.letters?.find(
      (letter) => letter.replyId === replyId
    )?.inspection;

    return { response, inspection };
  }
);

export const inspectReply = createAsyncThunk(
  'adminForeLetter/inspectReply',
  async (replyId) => {
    const response = await api.post(`/api/admins/replies/inspect/${replyId}`);
    return response;
  }
);

export const regenerateReply = createAsyncThunk(
  'adminForeLetter/regenerateReply',
  async (letterId) => {
    const response = await api.post(
      `/api/admins/pet-initiated-letters/generate/${letterId}`
    );
    return response;
  }
);

export const sendReply = createAsyncThunk(
  'adminForeLetter/sendReply',
  async (requests, { rejectWithValue }) => {
    const requestsArray = Array.isArray(requests) ? requests : [requests];

    const results = await Promise.allSettled(
      requestsArray.map((request) =>
        api.post(`/api/admins/pet-initiated-letters/submit/${request.letterId}`)
      )
    );

    const failed = results.filter((result) => result.status === 'rejected');
    if (failed.length > 0) {
      // NOTE: 실패한 요청의 수를 rejectWithValue와 함께 반환
      return rejectWithValue(failed.length);
    }
  }
);
