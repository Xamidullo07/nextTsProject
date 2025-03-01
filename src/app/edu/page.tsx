"use client";
import { baseUrl } from "@/utils/api";
import axios, { AxiosError } from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaUniversity } from "react-icons/fa";
import { toast } from "react-toastify";

function Edu() {
  const [current, setCurrent] = useState(false);
  const router = useRouter();
  const [school, setSchool] = useState<string>("");
  const [degree, setDegree] = useState<string>("");
  const [fieldofstudy, setFieldofstudy] = useState<string>("");
  const [from, setFrom] = useState<string>("");
  const [to, setTo] = useState<string>("");
  // const [description, setDescription] = useState<string>("");
  // const [currentJob, setCurrentJob] = useState<boolean>(false);

  const Edu = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `${baseUrl}profile/education`,
        { school, degree, fieldofstudy, from, to },
        {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
        }
      );
      // console.log(res.data);
      if (res.status === 200) {
        toast.success("Muvaffaqiyatli bajarildi! 🎉");
        router.push("/dashboard");
      }
    } catch (err) {
      const error = err as AxiosError;
      console.error(error.response?.data || error);
      toast.error("Noma'lum xatolik yuz berdi");
    }
  };
  return (
    <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
      <h2 className="text-3xl font-bold text-[#17a2b8] mb-4">
        Add Your Education
      </h2>

      <div className="flex items-center text-gray-700 mb-6">
        <FaUniversity className="text-[#17a2b8] mr-2" size={20} />
        <span>Add any school or bootcamp that you have attended</span>
      </div>

      <form onSubmit={Edu} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-semibold">
            School or Bootcamp *
          </label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            placeholder="School or Bootcamp"
            required
            value={school}
            onChange={(e) => setSchool(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold">
            Degree or Certificate *
          </label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            placeholder="Degree or Certificate"
            required
            value={degree}
            onChange={(e) => setDegree(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold">
            Field of Study
          </label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            placeholder="Field of Study"
            value={fieldofstudy}
            onChange={(e) => setFieldofstudy(e.target.value)}
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
            id="currentSchool"
            className="mr-2"
            checked={current}
            onChange={() => setCurrent(!current)}
          />
          <label htmlFor="currentSchool" className="text-gray-700">
            Current School
          </label>
        </div>
        {!current && (
          <div>
            <label className="block text-gray-700 font-semibold">To Date</label>
            <input
              type="date"
              className="w-full border p-2 rounded"
              value={to}
              onChange={(e) => setTo(e.target.value)}
            />
          </div>
        )}

        <div>
          <label className="block text-gray-700 font-semibold">
            Program Description
          </label>
          <textarea
            className="w-full border p-2 rounded"
            placeholder="Describe your program"
          ></textarea>
        </div>

        <div className="flex items-center gap-4">
          <button className="bg-[#17a2b8] text-white px-4 py-2 rounded">
            Submit
          </button>
          <Link
            href="/dashboard"
            className="bg-gray-400 text-white px-4 py-2 rounded"
          >
            Go Back
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Edu;
