"use client";

import { useEffect, useState, useCallback } from "react";
import axios, { AxiosError } from "axios";

function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
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
  }, [url]); // ✅ useCallback bilan url o‘zgarsa faqat shunda yangi funksiya yaratiladi

  useEffect(() => {
    fetchData();
  }, [fetchData]); // ✅ fetchData ni dependency qilib qo‘shdik

  return { data, error, loading, refetch: fetchData };
}

export default useFetch;
