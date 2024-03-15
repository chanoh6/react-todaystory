import { useEffect, useState } from 'react';
import { useAPI } from 'context/APIContext';

const useDataFetching = (apiFunction, ...args) => {
  const { api } = useAPI();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    setData([]);

    try {
      const res = await apiFunction(api, ...args);
      return res;
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData().then((res) => {
      if (res.code === '0') {
        setData(res.data);
      } else {
        console.log(`API error: ${res.msg[process.env.REACT_APP_LOCALE]}`);
      }
    });
  }, [...args]);

  return { loading, error, data };
};

export const useCategory = () => {
  return useDataFetching((api) => api.category());
};

export const useChannel = () => {
  return useDataFetching((api) => api.channel());
};

export const useStory = (idx) => {
  return useDataFetching((api) => api.story(idx), idx);
};
