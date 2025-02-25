"use client";
import React, { useState } from "react";
import axios from "axios";
import { baseUrl } from "../../utils/api";
import { IoPerson } from "react-icons/io5";
import { useRouter } from "next/navigation";

export default function CreateProfile() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const form = e.currentTarget;
    const newProfile = {
      company: form.company.value,
      website: form.website.value,
      location: form.location.value,
      skills: form.skills.value.split(",").map((s: string) => s.trim()),
      git: form.git.value,
      bio: form.bio.value,
    };
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found. Please login again.");

      await axios.post(`${baseUrl}/profile`, newProfile, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
      });

      router.push("/developers");
    } catch (err) {
      console.error("Error creating profile:", err);
      setError(
        err.response?.data?.message ||
          "Failed to create profile. Please try again."
      );
    }
  };

  return (
    <div className="max-w-[800px] m-auto p-4 ">
      <h1 className="font-bold text-5xl text-[#17a2b8] pt-9 mb-4">
        Create Your Profile
      </h1>
      <div className="flex items-center gap-2">
        <IoPerson className="text-2xl" />
        <p className="text-2xl mb-3">
          Lets get some information to make your profile
        </p>
      </div>
      <p>* = required field</p>
      {error && <p className="text-red-500">{error}</p>}
      <form
        className="w-[800px] flex flex-col items-start gap-6"
        onSubmit={onSubmit}
      >
        <input
          name="company"
          className="w-full border py-2 px-4"
          placeholder="Company"
          type="text"
        />
        <input
          name="website"
          className="w-full border py-2 px-4"
          placeholder="Website"
          type="text"
        />
        <input
          name="location"
          className="w-full border py-2 px-4"
          placeholder="Location"
          type="text"
        />
        <input
          name="skills"
          className="w-full border py-2 px-4"
          placeholder="* Skills (comma separated)"
          type="text"
        />
        <input
          name="git"
          className="w-full border py-2 px-4"
          placeholder="Github Username"
          type="text"
        />
        <input
          name="bio"
          className="w-full border pt-2 pb-7 px-4"
          placeholder="A short bio of yourself"
          type="text"
        />
        <button
          type="submit"
          className="bg-[#17a2b8] text-white py-2 px-4"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
