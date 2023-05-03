import { BASE_URL } from '../constants/constants';

export const searchDisease = async (keyword: string) => {
  console.info('calling api');
  const response = await fetch(`${BASE_URL}/?name=${keyword}`);

  if (response.ok) {
    return response;
  }
  return Promise.reject(response);
};
