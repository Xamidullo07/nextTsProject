// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { baseUrl } from "@/utils/api";
// import { User } from "../interface/user";

// function useAuth() {
//   const [user, setUser] = useState<User | null>(null);
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState<boolean>(false);
//   const router = useRouter();

//   async function getMe() {
//     try {
//       setLoading(true);
//       setError(null);
//       const token = localStorage.getItem("token");
//       if (!token) {
//         setUser(null);
//         setLoading(false);
//         return;
//       }

//       let res = await axios.get(baseUrl + "auth/me", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       setUser(res.data);
//     } catch (error: any) {
//       setError(error.message);
//       setUser(null);
//     } finally {
//       setLoading(false);
//     }
//   }

//   useEffect(() => {
//     getMe();
//   }, []);

//   async function login(email: string, password: string) {
//     try {
//       setLoading(true);
//       let res = await axios.post(
//         baseUrl + "auth",
//         { email, password },
//         {
//           headers: { "Content-Type": "application/json" },
//         }
//       );
//       if (res.status === 200) {
//         localStorage.setItem("token", res.data.token);
//         await getMe();
//         router.push("/dashboard");
//       }
//     } catch (error: any) {
//       setError(error.message);
//     } finally {
//       setLoading(false);
//     }
//   }

//   async function register(name: string, email: string, password: string) {
//     try {
//       setLoading(true);
//       let res = await axios.post(
//         baseUrl + "users",
//         { name, email, password },
//         {
//           headers: { "Content-Type": "application/json" },
//         }
//       );
//       if (res.status === 200) {
//         localStorage.setItem("token", res.data.token);
//         await getMe();
//         router.push("/dashboard");
//       }
//     } catch (error: any) {
//       setError(error.message);
//     } finally {
//       setLoading(false);
//     }
//   }

//   function logOut() {
//     localStorage.removeItem("token");
//     setUser(null);
//     setError(null);
//     router.push("/login");
//   }

//   return { login, register, logOut, user, error, loading };
// }

// export default useAuth;
