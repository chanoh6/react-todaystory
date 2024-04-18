import { useQuery } from 'react-query';

const useFetchData = (apiFunc, key, staleTime = 300000, cacheTime = 3600000) => {
  const fetchData = async () => {
    const storageKey = key;
    const storedData = localStorage.getItem(storageKey);
    const now = new Date().getTime();

    if (storedData) {
      const { lastFetched, data } = JSON.parse(storedData);
      if (now - lastFetched < staleTime) {
        return data;
      }
    }

    try {
      const response = await apiFunc();
      localStorage.setItem(storageKey, JSON.stringify({ lastFetched: now, data: response }));
      return response;
    } catch (error) {
      throw error;
    }
  };

  return useQuery(key, fetchData, {
    keepPreviousData: true,
    staleTime,
    cacheTime,
    onError: (error) => console.error(error),
  });
};

export default useFetchData;
