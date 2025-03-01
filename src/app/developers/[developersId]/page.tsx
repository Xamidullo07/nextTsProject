"use client";

import Image from "next/image";
import { baseUrl } from "../../../utils/api";
import axios from "axios";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaGlobe } from "react-icons/fa";

// interface Repo {
//   id: number;
//   name: string;
//   description: string | null;
//   stargazers_count: number;
//   watchers_count: number;
//   forks_count: number;
//   html_url: string;
// }

interface Experience {
  _id: string;
  title: string;
  company: string;
  from: string;
  to?: string;
  location?: string;
  description?: string;
}

interface Education {
  _id: string;
  school: string;
  degree: string;
  fieldofstudy: string;
  from: string;
  to?: string;
  description?: string;
}

interface DeveloperInterface {
  _id: string;
  user?: { name: string; avatar: string };
  status?: string;
  bio?: string;
  company?: string;
  location?: string;
  skills?: string[];
  education?: Education[];
  experience?: Experience[];
  website?: string;
  githubusername?: string;
}

function DevelopersWite() {
  const { developersId } = useParams();
  const [info, setInfo] = useState<DeveloperInterface | null>(null);
  // const [github, setGithub] = useState<Repo[] | null>(null);

  useEffect(() => {
    if (!developersId) {
      console.error("developersId undefined!");
      return;
    }

    const fetchUserData = async () => {
      try {
        // console.log("Fetching data for developersId:", developersId);
        const res = await axios.get(`${baseUrl}profile/user/${developersId}`);
        setInfo(res.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [developersId]);

  // useEffect(() => {
  //   if (!info?.githubusername) return;

  //   const fetchGithubData = async () => {
  //     try {
  //       const resgithub = await axios.get(
  //         `${baseUrl}profile/github/:${info.githubusername}`
  //       );
  //       setGithub(resgithub.data);
  //     } catch (error) {
  //       console.error("Error fetching GitHub data:", error);
  //     }
  //   };

  //   fetchGithubData();
  // }, [info?.githubusername]);

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6">
      <Link
        href={"/developers"}
        className="mb-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
      >
        Back To Profiles
      </Link>
      <div className="bg-[#17a2b8] text-white flex flex-col items-center text-center mt-4 p-8 rounded-lg">
        <Image
          src={
            info?.user?.avatar ||
            "https://gravatar.com/avatar/default?d=mm&r=pg&s=200"
          }
          width={80}
          height={80}
          alt={info?.user?.name || "Name"}
          className="w-20 h-20 rounded-full object-cover text-center flex justify-center"
        />
        <h2 className="text-2xl font-bold mt-3">{info?.user?.name}</h2>
        <p className="text-lg">{info?.company}</p>
        <p className="flex items-center justify-center gap-2 mt-2">
          {info?.location || "Unknown"} <FaGlobe />
        </p>
      </div>
      <div className="bg-gray-100 p-4 mt-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold">Bio</h3>
        <p className="text-gray-700">{info?.bio || "No bio available"}</p>
      </div>
      <div className="bg-gray-100 p-4 mt-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold">Skill Set</h3>
        <p className="mt-2">
          {info?.skills?.join(" • ") || "No skills listed"}
        </p>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="bg-gray-100 p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-[#17a2b8]">Experience</h3>
          {info?.experience?.length ? (
            info.experience.map((exp) => (
              <div key={exp._id} className="mt-2">
                <h4 className="font-bold">{exp.company}</h4>
                <p className="text-sm text-gray-500">
                  {new Date(exp.from).toLocaleDateString()} -{" "}
                  {exp.to ? new Date(exp.to).toLocaleDateString() : "Now"}
                </p>
                <p>
                  <span className="font-semibold">Position:</span> {exp.title}
                </p>
                <p>
                  <span className="font-semibold">Location:</span>{" "}
                  {exp.location || "Unknown"}
                </p>
                <p>
                  <span className="font-semibold">Description:</span>{" "}
                  {exp.description || "No description available"}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No experience credentials</p>
          )}
        </div>
        <div className="bg-gray-100 p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-[#17a2b8]">Education</h3>
          {info?.education?.length ? (
            info.education.map((edu) => (
              <div key={edu._id} className="mt-2">
                <h4 className="font-bold">{edu.school}</h4>
                <p className="text-sm text-gray-500">
                  {new Date(edu.from).toLocaleDateString()} -{" "}
                  {edu.to ? new Date(edu.to).toLocaleDateString() : "Now"}
                </p>
                <p>
                  <span className="font-semibold">Degree:</span> {edu.degree}
                </p>
                <p>
                  <span className="font-semibold">Field Of Study:</span>{" "}
                  {edu.fieldofstudy}
                </p>
                <p>
                  <span className="font-semibold">Description:</span>{" "}
                  {edu.description || "No description available"}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No education credentials</p>
          )}
        </div>
      </div>
      <p className="text-[#17a2b8] mt-6 cursor-pointer">Github Repos</p>
    </div>
  );
}

export default DevelopersWite;
