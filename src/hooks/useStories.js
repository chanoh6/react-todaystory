import { useEffect, useState } from 'react';
import { useAPI } from 'context/APIContext';

const useDataFetching = (apiFunction, ...args) => {
  const { api } = useAPI();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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
        setTimeout(() => {
          setLoading(false);
        }, 300);
      }
    };

    fetchData().then((res) => setData(res));
  }, [...args]);

  return { loading, error, data };
};

export const useCategory = () => {
  return useDataFetching((api) => api.category());
};

export const useChannel = () => {
  return useDataFetching((api) => api.channel());
};

export const useTopStories = (size) => {
  return useDataFetching((api) => api.topStories(size));
};

export const useBestStories = (page, size) => {
  return useDataFetching((api) => api.bestStories(page, size), page, size);
};

export const useEditorsPick = () => {
  return useDataFetching((api) => api.editorsPick());
};

export const useCategoryStories = (cate, page, size) => {
  return useDataFetching((api) => api.categoryStories(cate, page, size), cate, page, size);
};

export const useChannelStories = (cp, page, size) => {
  return useDataFetching((api) => api.channelStories(cp, page, size), cp, page, size);
};

export const useHistoryStories = (idxList) => {
  return useDataFetching((api) => api.storiesByIndex(idxList), idxList);
};

export const useFavoriteStories = () => {};

export const useSearchStories = () => {};

export const useStory = (idx) => {
  return useDataFetching((api) => api.story(idx), idx);
};
