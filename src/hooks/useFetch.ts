import { useEffect, useState } from "react";

import { ActionData, ActionKey, api, isErrorResponse } from "@/utils/api";

export const useFetch = (key: ActionKey) => {
  const [data, setData] = useState<ActionData[ActionKey]>();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setIsError(false);
      setError(null);

      try {
        const res = await api(key);

        if (isErrorResponse(res)) {
          setIsError(true);
          setError("AUTH_ERROR");
        } else {
          setData(res);
        }
      } catch (err) {
        setIsError(true);
        setError("FETCH_ERROR");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [key]);

  return { data, isLoading, isError, error };
};
