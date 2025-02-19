"use client";

import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";

function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  async function fetchData() {
    setError(null);
    setLoading(true);
    try {
      const res = await axios.get<T>(url);
      setData(res.data);
    } catch (error) {
      const err = error as AxiosError;
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return { data, error, loading, refetch: fetchData };
}

export default useFetch;
