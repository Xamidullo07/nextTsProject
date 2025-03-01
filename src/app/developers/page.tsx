"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { baseUrl } from "../../utils/api";
import Image from "next/image";
import { OrbitProgress } from "react-loading-indicators";

interface Developer {
  _id?: string;
  name?: string;
  company?: string;
  avatar?: string;
  skills?: string;
  status?: string;
  location?: string;
  githubusername?: string;
  user?: { _id?: string; name?: string; avatar?: string };
}

export default function Developers() {
  const router = useRouter();
  const [developers, setDevelopers] = useState<Developer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDevelopers = async () => {
      try {
        const response = await fetch(`${baseUrl}profile`);
        const data = await response.json();

        if (Array.isArray(data)) {
          setDevelopers(data);
        } else {
          setError("Unexpected API response format");
        }
      } catch (err) {
        console.error("Error fetching developers:", err);
        setError("Failed to load developers. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchDevelopers();
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center text-lg font-semibold">
          <OrbitProgress color="#32c0cd" size="medium" text="" textColor="" />
        </div>
      </div>
    );

  if (error)
    return (
      <p className="text-center text-red-500 font-semibold">Error: {error}</p>
    );

  if (developers.length === 0) {
    return (
      <p className="text-center text-gray-400 font-semibold">
        No developers found.
      </p>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-white p-6">
      <h2 className="text-3xl text-[#17a2b8] font-bold">Developers</h2>
      <p className="text-gray-400 mt-2">Browse and connect with developers</p>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {developers.map((dev, index) => (
          <div
            key={dev._id || index}
            className="bg-slate-200 hover:bg-[#eef2f3] shadow-md p-4 rounded-lg text-center"
          >
            <Image
              src={
                dev?.user?.avatar ||
                `https://gravatar.com/avatar/?d=mm&r=pg&s=200`
              }
              alt="User avatar"
              width={100}
              height={100}
              className="rounded-full mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-700">
              {dev.user?.name || "Unknown"}
            </h3>
            <p className="text-gray-400 mb-3">
              {dev?.status} {dev?.company}
            </p>
            <p className="text-gray-400 mb-3">✅ {dev.skills}</p>
            <p className="text-gray-400 mb-3">📍 {dev.location}</p>

            <button
              onClick={() => router.push(`/developers/${dev.user?._id || ""}`)}
              className="mt-4 px-4 py-2 bg-[#17a2b8] text-white rounded-md hover:bg-[#17a3b8dd] transition"
            >
              View Profile
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
