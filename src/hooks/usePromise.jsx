import { useEffect, useState } from "react";

export const usePromise = (fnc) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fnc()
      .then((data) => setData(data))
      .catch((error) => {
        if (error?.message?.includes('Tu sesión expiró, volvé a iniciar sesión.')) {
          localStorage.removeItem('token');
        }
        setError(error)
      })
      .finally(() => setLoading(false));
  }, [fnc]);

  const mutateData = (data) => {
    setLoading(true)
    setData(data);
    setLoading(false)
  }

  return { data, loading, error, mutateData };
};
