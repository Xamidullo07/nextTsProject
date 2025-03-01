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
  const [status, setStatus] = useState<string>("");
  const [company, setCompany] = useState<string>("");
  const [website, setWebsite] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [skills, setSkills] = useState<string>("");
  const [githubusername, setGithubUsername] = useState<string>("");
  const [bio, setBio] = useState<string>("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const newProfile = {
      status,
      company,
      website,
      location,
      skills: skills.split(",").map((s) => s.trim()),
      githubusername,
      bio,
    };

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found. Please login again.");

      const res = await axios.post(`${baseUrl}profile`, newProfile, {
        headers: {
          "x-auth-token": token,
          "Content-Type": "application/json",
        },
      });
      console.log("Profile Created", res);
      router.push("/dashboard");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(
          err.response?.data?.message ||
            "Failed to create profile. Please try again."
        );
        console.error("Axios error:", err);
      } else if (err instanceof Error) {
        setError(err.message);
        console.error("General error:", err);
      } else {
        setError("An unexpected error occurred.");
        console.error("Unexpected error:", err);
      }
    } finally {
      setLoading(false);
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
          Let&s get some information to make your profile
        </p>
      </div>
      <p>* = required field</p>
      {error && <p className="text-red-500">{error}</p>}
      <form className="space-y-4" onSubmit={onSubmit}>
        <div>
          <select
            id="status"
            name="status"
            className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:ring-2 focus:ring-teal-500 focus:outline-none"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">Select Professional Status</option>
            <option value="junior">Junior Developer</option>
            <option value="mid">Mid-level Developer</option>
            <option value="senior">Senior Developer</option>
            <option value="freelancer">Freelancer</option>
            <option value="manager">Manager</option>
            <option value="student">Student or Learning</option>
            <option value="other">Other</option>
          </select>
          <p className="text-gray-500 text-sm">
            Give us an idea of where you are at in your career
          </p>
        </div>

        <div>
          <input
            type="text"
            placeholder="Company"
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-teal-500 focus:outline-none"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />

          <p className="text-gray-500 text-sm">
            Could be your own company or one you work for
          </p>
        </div>

        <div>
          <input
            type="text"
            placeholder="Website"
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-teal-500 focus:outline-none"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
          <p className="text-gray-500 text-sm">
            Could be your own or a company website
          </p>
        </div>

        <div>
          <input
            type="text"
            placeholder="Location"
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-teal-500 focus:outline-none"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <p className="text-gray-500 text-sm">
            City & state suggested (eg. Boston, MA)
          </p>
        </div>

        <div>
          <input
            type="text"
            placeholder="* Skills"
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-teal-500 focus:outline-none"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
          />
          <p className="text-gray-500 text-sm">
            Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
          </p>
        </div>

        <div>
          <input
            type="text"
            placeholder="Github Username"
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-teal-500 focus:outline-none"
            value={githubusername}
            onChange={(e) => setGithubUsername(e.target.value)}
          />
          <p className="text-gray-500 text-sm">
            If you want your latest repos and a Github link, include your
            username
          </p>
        </div>

        <div>
          <textarea
            placeholder="A short bio of yourself"
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-teal-500 focus:outline-none"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          ></textarea>
          <p className="text-gray-500 text-sm">
            Tell us a little about yourself
          </p>
        </div>

        <button
          type="button"
          className="w-full border border-gray-300 text-gray-700 rounded-lg p-2 hover:bg-gray-100"
        >
          Add Social Network Links{" "}
          <span className="text-gray-400">(Optional)</span>
        </button>

        <div className="flex space-x-4">
          <button
            type="submit"
            className="bg-[#17a2b8] text-white py-2 px-4"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>{" "}
          <button className="px-6 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700 font-medium rounded-lg shadow">
            Go Back
          </button>
        </div>
      </form>
    </div>
  );
}
