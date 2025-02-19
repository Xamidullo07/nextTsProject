"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";

const Dashboard: React.FC = () => {
  const [showForm, setShowForm] = useState<boolean>(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      <h2 className="text-3xl font-bold">Dashboard</h2>
      <p className="text-gray-400 mt-2 flex items-center gap-1">
        <span className="text-lg">👤</span> Welcome
      </p>
      <p className="text-gray-400 mt-2">
        You have not yet set up a profile, please add some info.
      </p>
      {!showForm ? (
        <button
          className="mt-4 px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded transition"
          onClick={() => setShowForm(true)}
        >
          Create Profile
        </button>
      ) : (
        <CreateProfile />
      )}
    </div>
  );
};

const CreateProfile: React.FC = () => {
  const [formData, setFormData] = useState({
    status: "",
    company: "",
    website: "",
    location: "",
    skills: "",
    github: "",
    bio: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Profile Data:", formData);
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg mt-6 w-full max-w-lg">
      <h2 className="text-2xl font-bold text-white">
        Lets get some information to make your profile
      </h2>
      <p className="text-gray-400 mb-4">* = required field</p>
      <form onSubmit={handleSubmit} className="space-y-3">
        <select
          name="status"
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option>* Select Professional Status</option>
          <option value="Developer">Developer</option>
          <option value="Junior Developer">Junior Developer</option>
        </select>
        <input
          type="text"
          name="company"
          placeholder="Company"
          onChange={handleChange}
          className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="website"
          placeholder="Website"
          onChange={handleChange}
          className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          onChange={handleChange}
          className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="skills"
          placeholder="* Skills"
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="github"
          placeholder="Github Username"
          onChange={handleChange}
          className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <textarea
          name="bio"
          placeholder="A short bio of yourself"
          onChange={handleChange}
          className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Dashboard;
