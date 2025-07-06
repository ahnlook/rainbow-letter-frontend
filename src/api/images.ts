import apiRequest from 'api';
import { ApiResponse } from 'types/Api';
import { ImageResponse } from 'types/image';
import DefaultImage from 'assets/Logo_256px.png';

const RESOURCE = '/api/images';

const getUploadPath = (type: string) => `/api/images/${type}`;

export const getImage = (key: string | undefined) => {
  if (!key) return DefaultImage;

  return `${process.env.REACT_APP_ASSETS_URL}/${key}`;
};

export const resisterImage = async (
  file: any,
  type: string
): ApiResponse<ImageResponse> => {
  const response = await apiRequest.post(`${getUploadPath(type)}`, file);

  return response;
};

export const deleteImage = async (key: string): ApiResponse<ImageResponse> => {
  const response = await apiRequest.delete(`${RESOURCE}/${key}`);

  return response;
};
