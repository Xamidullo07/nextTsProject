"use client";

import { useEffect, FormEvent, useState } from "react";
import axios from "axios";
import { baseUrl } from "@/utils/api";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";

const Login = () => {
  const route = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      route.push("/dashboard");
    }
  }, [route]);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const res = await axios.post(`${baseUrl}/auth`, { email, password });
      localStorage.setItem("accessToken", res.data.token);
      route.push("/dashboard");
      toast.success("Muvaffaqiyatli bajarildi! 🎉");
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || "Xatolik yuzaga keldi";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h2 className="text-3xl font-bold mb-2">Sign In</h2>
      <p className="text-gray-400 mb-6 flex items-center gap-1">
        <span className="text-lg">👤</span> Sign Into Your Account
      </p>
      <form
        onSubmit={onSubmit}
        className="w-full max-w-sm bg-gray-800 p-6 rounded-lg shadow-lg"
      >
        <input
          type="email"
          name="email"
          required
          placeholder="Email Address"
          className="w-full p-3 mb-3 border border-gray-700 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          name="password"
          required
          placeholder="Password"
          className="w-full p-3 mb-3 border border-gray-700 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded transition disabled:bg-gray-600"
        >
          {loading ? "Loading..." : "Login"}
        </button>
      </form>
      <p className="mt-4 text-gray-400">
        Dont have an account?{" "}
        <Link href="/register" className="text-blue-400 hover:underline">
          Sign Up
        </Link>
      </p>
    </div>
  );
};

export default Login;
