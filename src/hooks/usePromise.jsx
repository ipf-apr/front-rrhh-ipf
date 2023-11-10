import { useEffect, useState } from "react";

export const usePromise = (fnc) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fnc()
      .then((data) => setData(data))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, [fnc]);

  return { data, loading, error, setData };
};
