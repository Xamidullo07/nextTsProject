"use client";

import { useEffect, FormEvent, useState } from "react";
import axios, { AxiosError } from "axios";
import { baseUrl } from "@/utils/api";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";

const Register = () => {
  const route = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
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
      const res = await axios.post(`${baseUrl}/register`, { email, password });
      localStorage.setItem("token", res.data.token);
      route.push("/dashboard");
      toast.success("Muvaffaqiyatli ro‘yxatdan o‘tdingiz! 🎉");
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        const errorMsg =
          error.response?.data?.message || "Xatolik yuzaga keldi";
        toast.error(errorMsg);
      } else {
        toast.error("Noma'lum xatolik yuz berdi");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex items-center overflow-y-hidden justify-center h-screen bg-gray-900">
      <div
        className="absolute inset-0 bg-cover bg-center brightness-50"
        style={{ backgroundImage: "url('/img.webp')" }}
      ></div>
      <div className="relative  z-10 text-center bg-gray-180 p-6 border rounded-xl ">
        <h2 className="text-3xl font-bold mb-2 text-cyan-400">Sign Up</h2>
        <span className=" text-lg text-center text-gray-400 mb-6">
          👤 Create Your Account
        </span>
        <form onSubmit={onSubmit} className="w-full max-w-sm p-6 rounded-lg ">
          <input
            type="email"
            name="email"
            required
            placeholder="Email Address"
            className="w-full p-3 mb-3 border  rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            name="password"
            required
            placeholder="Password"
            className="w-full p-3 mb-3 border  rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-cyan-700 hover:bg-blue-600 text-white font-semibold py-3 rounded transition disabled:bg-gray-600"
          >
            {loading ? "Loading..." : "Register"}
          </button>
        </form>
        <p className="mt-4 text-gray-400">
          Already have an account?{" "}
          <Link href="/login" className="text-cyan-400 hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
