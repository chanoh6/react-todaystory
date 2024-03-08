import { useEffect, useRef, useState } from 'react';
import { useAPI } from 'context/APIContext';

const useDataFetching = (apiFunction, ...args) => {
  const { api } = useAPI();
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
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

    fetchData().then((res) => setContents(res));
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

export const useFavoriteStories = () => {};

export const useSearchStories = () => {};

export const useStory = (idx) => {
  return useDataFetching((api) => api.story(idx), idx);
};
