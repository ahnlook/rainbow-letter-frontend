import apiRequest from 'api';
import { ApiResponse } from 'types/Api';
import { SharedLetterResponse } from 'types/letters';

const RESOURCE = '/api/shared-letters';

export const getSharedLetterList = async (
  after: number | undefined,
  limit: number,
  startDate: string,
  endDate: string,
  randomSort?: boolean
): Promise<SharedLetterResponse> => {
  const queryParams = new URLSearchParams();

  queryParams.append('limit', limit.toString());
  if (after !== undefined) queryParams.append('after', after.toString());
  if (startDate) queryParams.append('startDate', startDate);
  if (endDate) queryParams.append('endDate', endDate);
  if (randomSort) queryParams.append('randomSort', 'true');

  const response = await apiRequest.get(
    `${process.env.REACT_APP_UPLOAD_URL}${RESOURCE}?${queryParams.toString()}`
  );

  return response.data;
};

export const getSampleSharedLetterList =
  async (): Promise<SharedLetterResponse> => {
    const response = await apiRequest.get(
      `${process.env.REACT_APP_UPLOAD_URL}${RESOURCE}/sample`
    );

    return response.data;
  };
