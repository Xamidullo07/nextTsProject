"use client";

import { useEffect, useState, useCallback } from "react";
import axios, { AxiosError } from "axios";
import { baseUrl } from "@/utils/api";

function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setError(null);
    setLoading(true);
    try {
      const res = await axios.get<T>(baseUrl + url, {
        headers: {
          "x-auth-token": `${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });

      setData(res.data);
    } catch (error) {
      const err = error as AxiosError;
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, error, loading, refetch: fetchData };
}

export default useFetch;
