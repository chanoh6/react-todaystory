import { useQuery } from 'react-query';

const useFetchData = (apiFunc, key, staleTime = 300000, cacheTime = 3600000) => {
  // staleTime: 데이터가 만료되기 전까지의 시간 (기본값: 5분)
  // cacheTime: 데이터가 캐시되는 시간 (기본값: 1시간)

  // fetchData 함수: 로컬 스토리지에 데이터가 있으면 반환, 없으면 API 호출
  const fetchData = async () => {
    const storageKey = key;
    const storedData = localStorage.getItem(storageKey);
    const now = new Date().getTime();

    // 로컬 스토리지에 데이터가 있고, 만료되지 않았다면 해당 데이터 반환
    if (storedData) {
      const { lastFetched, data } = JSON.parse(storedData);
      if (now - lastFetched < staleTime) {
        return data;
      }
    }

    // 만료되었거나 데이터가 없다면 API 호출
    try {
      const response = await apiFunc();
      // API 호출 결과를 로컬 스토리지에 저장하고 반환
      localStorage.setItem(storageKey, JSON.stringify({ lastFetched: now, data: response }));
      return response;
    } catch (error) {
      throw error;
    }
  };

  // useQuery 훅을 사용하여 데이터 요청
  return useQuery(key, fetchData, {
    keepPreviousData: true,
    staleTime,
    cacheTime,
    onError: (error) => console.error(error),
  });
};

export default useFetchData;
