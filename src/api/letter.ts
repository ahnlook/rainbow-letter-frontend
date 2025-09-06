import apiRequest from 'api';
import {
  LetterRequest,
  LetterListResponse,
  LetterItemResponse,
} from 'types/letters';
import { ApiResponse } from 'types/Api';

const RESOURCE = '/api/letters';

export const getLetterList = async (
  petId: number | undefined
): ApiResponse<{
  letters: LetterListResponse[];
}> => {
  const response = await apiRequest.get(`${RESOURCE}/box?pet=${petId}`);

  return response;
};

export const getLetterListByDate = async (
  petId: number | undefined,
  startDate?: number | string,
  endDate?: number | string
): ApiResponse<{
  letters: LetterListResponse[];
}> => {
  const response = await apiRequest.get(
    `${RESOURCE}/box?pet=${petId}&start=${startDate}&end=${endDate}`
  );

  return response;
};

export const getLetter = async (
  id: string | undefined
): ApiResponse<LetterItemResponse> => {
  const response = await apiRequest.get(`${RESOURCE}/${id}`);

  return response;
};

export const getPreLetter = async (
  id: string | undefined
): ApiResponse<LetterItemResponse> => {
  const response = await apiRequest.get(`api/pet-initiated-letters/${id}`);

  return response;
};

export const sendLetter = async (
  id: number | undefined,
  letter: LetterRequest
) => {
  const response = await apiRequest.post(`${RESOURCE}?pet=${id}`, letter);

  return response;
};

export const getShareLetter = async (
  uuid: string | undefined
): ApiResponse<LetterItemResponse> => {
  const response = await apiRequest.get(`${RESOURCE}/share/${uuid}`);

  return response;
};

export const getSharePreLetter = async (
  uuid: string | undefined
): ApiResponse<LetterItemResponse> => {
  const response = await apiRequest.get(
    `api/pet-initiated-letters/share/${uuid}`
  );

  return response;
};

export const deleteLetter = async (id: number) => {
  const response = await apiRequest.delete(`/api/letters/${id}`);

  return response;
};

// For admin
export const getAdminLetterDetail = async (
  userId: number | string,
  petId: number | string,
  letterId: number | string
) => {
  const response = await apiRequest.get(
    `/api/admins/letters/${letterId}?user=${userId}&pet=${petId}`
  );
  return response;
};
