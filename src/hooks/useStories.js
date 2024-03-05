import { useEffect, useRef, useState } from 'react';
import { useAPI } from 'context/APIContext';

const useDataFetching = (apiFunction, ...args) => {
  const { api } = useAPI();
  const [contents, setContents] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      setContents(null);

      try {
        const result = await apiFunction(api, ...args);
        setContents(result);
      } catch (e) {
        setError(e);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 300);
      }
    };

    fetchData();
  }, []);

  return { loading, error, contents };
};

export const useCategory = () => {
  return useDataFetching((api) => api.category());
};

export const useTopStories = () => {
  return useDataFetching((api) => api.topStories());
};

export const useBestStories = (start) => {
  return useDataFetching((api) => api.bestStories(start), start);
};

export const useEditorsPick = () => {
  return useDataFetching((api) => api.editorsPick());
};

export const useCategoryStories = (index) => {
  const category = useRef(null);
  const { loading, error, contents } = useDataFetching((api) => api.categoryStories(index), index);

  useEffect(() => {
    if (contents) {
      category.current = contents.category;
    }
  }, [contents]);

  return { loading, error, category, contents };
};

export const useChannelStories = (index) => {};

export const useLikeStories = () => {};

export const useHistoryStories = () => {};
