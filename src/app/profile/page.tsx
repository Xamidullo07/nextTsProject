"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "@/utils/api";

interface UserProfile {
  _id: string;
  name: string;
  avatar: string;
  status: string;
  company: string;
  location: string;
  skills: string[];
  bio: string;
}

export default function UserProfilePage() {
  const router = useRouter();
  const { user_id } = useParams();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user_id) return;

    axios
      .get(`${baseUrl}/profile/user/${user_id}`)
      .then((res) => {
        setProfile(res.data);
        setLoading(false);
      })
      .catch((err) => {
        const errorMsg =
          err.response?.data?.message ||
          "Profilni yuklashda xatolik yuz berdi.";
        setError(errorMsg);
        setLoading(false);
      });
  }, [user_id]);

  if (!user_id)
    return (
      <p className="text-center text-lg font-semibold">User ID not found</p>
    );
  if (loading)
    return <p className="text-center text-lg font-semibold">Loading...</p>;
  if (error)
    return (
      <p className="text-center text-red-500 font-semibold">Error: {error}</p>
    );
  if (!profile)
    return (
      <p className="text-center text-lg font-semibold">No profile found</p>
    );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      <button
        onClick={() => router.back()}
        className="self-start text-blue-500 mb-4"
      >
        ← Back To Profiles
      </button>

      <div className="w-full max-w-2xl bg-gray-800 shadow-md p-6 rounded-lg text-center">
        <h3 className="text-2xl font-semibold">{profile.name}</h3>
        <p className="text-gray-400">
          {profile.status} at {profile.company}
        </p>
        <p className="text-gray-400 mb-3">📍 {profile.location}</p>

        <div className="mt-4 p-4 bg-gray-700 rounded-md">
          <h4 className="text-lg font-semibold text-blue-400">Bio</h4>
          <p className="text-gray-300">{profile.bio || "No bio available"}</p>
        </div>

        <div className="mt-4 p-4 bg-gray-700 rounded-md">
          <h4 className="text-lg font-semibold text-blue-400">Skill Set</h4>
          <p className="text-gray-300">✅ {profile.skills.join(", ")}</p>
        </div>
      </div>
    </div>
  );
}
