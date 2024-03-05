import { useEffect, useState } from 'react';

export const useLoading = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 300);
  }, []);

  return { loading };
};
