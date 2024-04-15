import APIService2 from 'api/APIService2';
// import { useAPI } from 'context/APIContext';
import React, { useEffect, useState } from 'react';

const StoryTest = () => {
  const apiService = new APIService2();
  // const { api } = useAPI();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    apiService.topStories({ size: 6 }).then((res) => {
      setData(res);
      setLoading(false);
    });

    // const fetchData = async () => {
    //   try {
    //     const res = await apiService.topStories({ size: 6 });
    //     setData(res);
    //   } catch (e) {
    //     setError(e);
    //   } finally {
    //     setLoading(false);
    //   }
    // };

    // fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error...</div>;
  if (!data) return <div>No data...</div>;

  console.log(data);

  return <div>StoryTest</div>;
};

export default StoryTest;
