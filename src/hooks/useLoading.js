import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useLoading = () => {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 300);
  }, [location]);

  return loading;
};
