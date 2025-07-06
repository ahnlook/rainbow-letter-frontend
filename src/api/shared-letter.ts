import apiRequest from 'api';
import { ApiResponse } from 'types/Api';
import { SharedLetterResponse, SharedLetterItemType } from 'types/letters';

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
  queryParams.append('randomSort', randomSort ? 'true' : 'false');

  const response = await apiRequest.get(
    `${RESOURCE}?${queryParams.toString()}`
  );

  if (response.data.length === 0) {
    return { sharedLetters: [], paginationInfo: { next: '' } };
  }

  return response.data;
};

export const getSampleSharedLetterList = async (): Promise<
  SharedLetterItemType[]
> => {
  const response = await apiRequest.get(`${RESOURCE}/sample`);

  return response.data;
};
