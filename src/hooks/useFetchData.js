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
      if (response.code !== '0') {
        throw new Error(`API error: ${response.msg[process.env.REACT_APP_LOCALE]}`);
      }

      const newData = response.data;
      localStorage.setItem(storageKey, JSON.stringify({ lastFetched: now, data: newData }));
      return newData;
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
