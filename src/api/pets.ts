import apiRequest from 'api';
import { ApiResponse } from 'types/Api';
import { PetResponse, PetsDashBoard } from 'types/pets';
import { PinnedLetterFormType } from 'view/letter/PinnedLetterForm';

const RESOURCE = '/api/pets';

export const getPetsDashBoard = async (): ApiResponse<{
  pets: PetsDashBoard[];
}> => {
  const response = await apiRequest.get(`${RESOURCE}/dashboard`);

  return response;
};

export const getPets = async (): ApiResponse<{ pets: PetResponse[] }> => {
  const response = await apiRequest.get(`${RESOURCE}`);

  return response;
};

export const getPet = async (id: number): Promise<any> => {
  const response = await apiRequest.get(`${RESOURCE}/${id}`);

  return response.data;
};

export const registerPet = async (pet: any): Promise<any> => {
  const response = await apiRequest.post(`${RESOURCE}`, pet);

  return response.data;
};

export const updatePet = async (pet: any, id: string): Promise<any> => {
  const response = await apiRequest.put(`${RESOURCE}/${id}`, pet);

  return response.data;
};

export const deletePet = async (id: string): Promise<any> => {
  const response = await apiRequest.delete(`${RESOURCE}/${id}`);

  return response.data;
};

export const getDashboard = async (): Promise<any> => {
  const response = await apiRequest.get(`${RESOURCE}/dashboard`);

  return response.data;
};

export const getLetterListByPet = async (
  petId: number,
  after: number | undefined,
  limit: number,
  startDate?: string,
  endDate?: string
) => {
  const queryParams = new URLSearchParams();

  queryParams.append('limit', limit.toString());
  if (after !== undefined) queryParams.append('after', after.toString());
  if (startDate) queryParams.append('startDate', startDate);
  if (endDate) queryParams.append('endDate', endDate);

  const response = await apiRequest.get(
    `${RESOURCE}/${petId}/letters?${queryParams.toString()}`
  );

  return response.data;
};

export const tryPinSharedLetter = async (
  petId: number | undefined,
  data: PinnedLetterFormType
): Promise<any> => {
  const response = await apiRequest.post(
    `${RESOURCE}/${petId}/shared-letters`,
    data
  );

  return response.data;
};
