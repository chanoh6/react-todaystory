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
  return useDataFetching((api) => api.categoryList());
};

export const useTopStories = () => {
  return useDataFetching((api) => api.top());
};

export const useBestStories = (start) => {
  return useDataFetching((api) => api.best(start), start);
};

export const useEditorsPick = () => {
  return useDataFetching((api) => api.editors());
};

export const useCategoryStories = (index) => {
  const category = useRef(null);
  const { loading, error, contents } = useDataFetching((api) => api.category(index), index);

  useEffect(() => {
    if (contents) {
      category.current = contents.category;
    }
  }, []);

  return { category, contents, loading, error };
};
