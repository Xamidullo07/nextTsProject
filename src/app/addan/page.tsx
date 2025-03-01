"use client";

import { baseUrl } from "@/utils/api";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { FaBriefcase } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

function Addan() {
  const router = useRouter();
  const [title, setTitle] = useState<string>("");
  const [company, setCompany] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [from, setFrom] = useState<string>("");
  const [to, setTo] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [currentJob, setCurrentJob] = useState<boolean>(false);

  const addexp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Token topilmadi. Iltimos, qayta login qiling.");
        return;
      }

      const res = await axios.put(
        `${baseUrl}profile/experience`,
        { title, company, from, to },
        {
          headers: {
            "x-auth-token": token,
            "Content-Type": "application/json",
          },
        }
      );

      if (res.status === 200) {
        toast.success("Muvaffaqiyatli bajarildi! 🎉");
        router.push("/dashboard");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message || "Server bilan bog‘liq xatolik."
        );
        console.error("Axios error:", error);
      } else if (error instanceof Error) {
        toast.error(error.message);
        console.error("General error:", error);
      } else {
        toast.error("Noma'lum xatolik yuz berdi.");
        console.error("Unexpected error:", error);
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
      <h2 className="text-3xl font-bold text-[#17a2b8] mb-4">
        Add An Experience
      </h2>

      <div className="flex items-center text-gray-700 mb-6">
        <FaBriefcase className="text-[#17a2b8] mr-2" size={20} />
        <span>
          Add any developer/programming positions that you have had in the past
        </span>
      </div>

      <form onSubmit={addexp} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-semibold">
            Job Title *
          </label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            placeholder="Job Title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold">Company *</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            placeholder="Company Name"
            required
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold">Location</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            placeholder="City, Country"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold">
            From Date *
          </label>
          <input
            type="date"
            className="w-full border p-2 rounded"
            required
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="currentJob"
            className="mr-2"
            checked={currentJob}
            onChange={() => setCurrentJob(!currentJob)}
          />
          <label htmlFor="currentJob" className="text-gray-700">
            Current Job
          </label>
        </div>

        <div>
          <label className="block text-gray-700 font-semibold">To Date</label>
          <input
            type="date"
            className="w-full border p-2 rounded"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold">
            Job Description
          </label>
          <textarea
            className="w-full border p-2 rounded"
            placeholder="Describe your job responsibilities"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="bg-[#17a2b8] text-white px-4 py-2 rounded"
          >
            Submit
          </button>
          <Link
            href={"/dashboard"}
            className="bg-gray-400 text-white px-4 py-2 rounded"
          >
            Go Back
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Addan;
