import apiRequest from 'api';

import { ApiResponse } from 'types/Api';
import {
  UserRequestData,
  LoginRequest,
  PasswordRequest,
  TokenResponse,
  PhoneNumberRequest,
  UserInfoResponse,
} from 'types/user';

const RESOURCE = '/api/users';

export const trySignUp = async (data: LoginRequest) => {
  const response = await apiRequest.post(`${RESOURCE}/create`, data);

  return response;
};

export const tryLogin = async (
  data: LoginRequest
): ApiResponse<TokenResponse> => {
  const response = await apiRequest.post(`${RESOURCE}/login`, data);

  return response;
};

export const authEmail = async (email: UserRequestData) => {
  const response = await apiRequest.post(`${RESOURCE}/find-password`, email);

  return response;
};

export const updatePassword = async (data: PasswordRequest) => {
  const response = await apiRequest.put(`${RESOURCE}/reset-password`, data);

  return response;
};

export const updatePhoneNumber = async (data: PhoneNumberRequest) => {
  const response = await apiRequest.put(`${RESOURCE}/phone-number`, data);

  return response;
};

export const deletePhoneNumber = async () => {
  const response = await apiRequest.delete(`${RESOURCE}/phone-number`);

  return response;
};

export const getUserInfo = async (): ApiResponse<UserInfoResponse> => {
  const response = await apiRequest.get(`${RESOURCE}/info`);

  return response;
};

export const deleteUser = async () => {
  const response = await apiRequest.delete(`${RESOURCE}`);

  return response;
};

export const getSharedLetterByMe = async (
  startDate: string,
  endDate: string
) => {
  const queryParams = new URLSearchParams();

  if (startDate) queryParams.append('startDate', startDate);
  if (endDate) queryParams.append('endDate', endDate);

  const response = await apiRequest.get(
    `${RESOURCE}/@me/shared-letters?${queryParams.toString()}`
  );

  return response.data;
};
