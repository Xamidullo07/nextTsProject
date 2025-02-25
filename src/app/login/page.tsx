// "use client";

// import { useEffect, FormEvent, useState } from "react";
// import axios, { AxiosError } from "axios";
// import { baseUrl } from "@/utils/api";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import { toast } from "react-toastify";

// const Login = () => {
//   const route = useRouter();
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       route.push("/dashboard");
//     }
//   }, [route]);

//   const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setLoading(true);

//     const formData = new FormData(e.currentTarget);
//     const email = formData.get("email") as string;
//     const password = formData.get("password") as string;

//     try {
//       const res = await axios.post(`${baseUrl}auth`, { email, password });
//       localStorage.setItem("token", res.data.token);
//       route.push("/dashboard");
//       toast.success("Muvaffaqiyatli bajarildi! 🎉");
//     } catch (error: unknown) {
//       if (error instanceof AxiosError) {
//         const errorMsg =
//           error.response?.data?.message || "Xatolik yuzaga keldi";
//         toast.error(errorMsg);
//       } else {
//         toast.error("Noma'lum xatolik yuz berdi");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
//       <h2 className="text-3xl font-bold mb-2">Sign In</h2>
//       <p className="text-gray-400 mb-6 flex items-center gap-1">
//         <span className="text-lg">👤</span> Sign Into Your Account
//       </p>
//       <form
//         onSubmit={onSubmit}
//         className="w-full max-w-sm bg-gray-800 p-6 rounded-lg shadow-lg"
//       >
//         <input
//           type="email"
//           name="email"
//           required
//           placeholder="Email Address"
//           className="w-full p-3 mb-3 border border-gray-700 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//         <input
//           type="password"
//           name="password"
//           required
//           placeholder="Password"
//           className="w-full p-3 mb-3 border border-gray-700 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded transition disabled:bg-gray-600"
//         >
//           {loading ? "Loading..." : "Login"}
//         </button>
//       </form>
//       <p className="mt-4 text-gray-400">
//         Dont have an account?{" "}
//         <Link href="/register" className="text-blue-400 hover:underline">
//           Sign Up
//         </Link>
//       </p>
//     </div>
//   );
// };

// export default Login;

"use client";

import { useEffect, FormEvent, useState } from "react";
import axios, { AxiosError } from "axios";
import { baseUrl } from "@/utils/api";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";

const Login = () => {
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
      const res = await axios.post(`${baseUrl}auth`, { email, password });
      localStorage.setItem("token", res.data.token);
      route.push("/dashboard");
      toast.success("Muvaffaqiyatli bajarildi! 🎉");
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
        <h2 className="text-3xl font-bold mb-2 text-cyan-400">Sign In</h2>
        {/* <p className="text-gray-400 mb-6 flex items-center gap-1"> */}
        <span className=" text-lg text-center text-gray-200 mb-6">
          👤 Sign Into Your Account
        </span>
        {/* </p> */}
        <form onSubmit={onSubmit} className="w-full max-w-sm  p-6 rounded-lg ">
          <input
            type="email"
            name="email"
            required
            placeholder="Email Address"
            className="w-full p-3 mb-3 border  rounded  text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            className="w-full bg-cyan-700 hover:bg-cyan-600 text-white font-semibold py-3 rounded transition disabled:bg-gray-600"
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </form>
        <p className="mt-4 text-gray-200">
          Don't have an account?{" "}
          <Link href="/register" className="text-cyan-400 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
