import { useCallback, useEffect, useState } from "react";

import { ApiDict, ApiKeys, api, isErrorResponse } from "@/utils/api";

export const useFetch = (key: ApiKeys) => {
  const [data, setData] = useState<ApiDict[ApiKeys]>();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
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
  }, [key]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refetch = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return { data, isLoading, isError, error, refetch };
};
