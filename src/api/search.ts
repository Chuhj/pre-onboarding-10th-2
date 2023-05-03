import { BASE_URL, CACHE_NAME } from '../constants/constants';

const searchDisease = async (keyword: string) => {
  console.info('calling api');
  const response = await fetch(`${BASE_URL}/?name=${keyword}`);

  if (response.ok) {
    return response;
  }
  return Promise.reject(response);
};

export async function searchDiseaseWithCache(keyword: string) {
  const cache = await caches.open(CACHE_NAME);
  const cacheDataResponse = await cache.match(keyword);

  if (cacheDataResponse) return cacheDataResponse.json();

  const apiResponse = await searchDisease(keyword);
  cache.put(keyword, apiResponse.clone());
  return apiResponse.json();
}
