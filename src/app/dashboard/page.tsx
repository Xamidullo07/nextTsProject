"use client";
import useFetch from "../../app/hooks/useFetch";
import Link from "next/link";
import { useState } from "react";

import {
  FaBriefcase,
  FaGraduationCap,
  FaUserEdit,
  FaUserMinus,
} from "react-icons/fa";
import { IoPerson } from "react-icons/io5";

interface User {
  name: string;
  email: string;
  experience: {
    id: number;
    company: string;
    title: string;
    years: string;
    from: string;
    to?: string;
  }[];
  education: {
    id: number;
    school: string;
    degree: string;
    years: string;
    from: string;
    to?: string;
  }[];
}

function Dashboard() {
  const { data } = useFetch<{ name: string }>("auth");
  const { data: profile } = useFetch<User>("profile/me");
  const [experiences, setExperiences] = useState(profile?.experience || []);
  const [educations, setEducations] = useState(profile?.education || []);

  // console.log(error);
  const deleteExperience = (id: number) => {
    setExperiences(experiences.filter((exp) => exp.id !== id));
  };

  const deleteEducation = (id: number) => {
    setEducations(educations.filter((edu) => edu.id !== id));
  };

  return (
    <>
      <div className="max-w-[800px] m-auto p-4 r">
        <div>
          <h1 className="font-bold text-start py-4 text-5xl text-[#17a2b8] pt-9">
            Dashboard
          </h1>
          <div className="flex items-center py-2gap-2 mb-4">
            <IoPerson className="text-2xl" />
            <p className="text-2xl">Welcome {data?.name || "User"}</p>
          </div>

          {profile ? (
            <div>
              <div>
                <div className="flex items-center gap-5 mb-7">
                  <button className="py-2 px-4 bg-[#f4f4f4] rounded-sm flex items-center gap-2 hover:bg-[#e2e1e1] active:bg-[#a29f9f]">
                    <FaUserEdit />
                    <Link href="/editProfile">Edit Profile</Link>
                  </button>
                  <button className="py-2 px-4 bg-[#f4f4f4] rounded-sm flex items-center gap-2 hover:bg-[#e2e1e1] active:bg-[#a29f9f] ">
                    <FaBriefcase />
                    <Link href="/addan">Add Experience</Link>
                  </button>
                  <button className="py-2 px-4 bg-[#f4f4f4] rounded-sm flex items-center gap-2 hover:bg-[#e2e1e1] active:bg-[#a29f9f] ">
                    <FaGraduationCap />
                    <Link href="/edu">Add Education</Link>
                  </button>
                </div>
                <h4 className="text-2xl leading-10 font-bold mb-7">
                  Experience Credentials
                </h4>

                <div className="flex items-center gap-3 mb-7">
                  <p className="py-2 px-4 bg-[#f4f4f4] font-bold text-base leading-7">
                    Company
                  </p>
                  <p className="py-2 px-4 bg-[#f4f4f4] font-bold text-base leading-7">
                    Title
                  </p>
                  <p className="py-2 px-4 bg-[#f4f4f4] font-bold text-base leading-7">
                    Years
                  </p>
                </div>
                {profile.experience.length > 0 ? (
                  profile.experience.map((exp, index) => (
                    <div key={index} className="flex items-center gap-3 mb-4">
                      <p className="py-2 px-4 bg-[#f4f4f4]">{exp.company}</p>
                      <p className="py-2 px-4 bg-[#f4f4f4]">{exp.title}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(exp.from).toLocaleDateString()} -{" "}
                        {exp.to ? new Date(exp.to).toLocaleDateString() : "Now"}
                      </p>
                      <button
                        onClick={() => deleteExperience(exp.id)}
                        className="py-2 px-4 bg-red-500 text-white"
                      >
                        Delete
                      </button>
                    </div>
                  ))
                ) : (
                  <p>No experience added</p>
                )}
                <h4 className="text-2xl leading-10 font-bold mb-7">
                  Education Credentials
                </h4>

                <div className="flex items-center gap-3 mb-7">
                  <p className="py-2 px-4 bg-[#f4f4f4] font-bold text-base leading-7">
                    School
                  </p>
                  <p className="py-2 px-4 bg-[#f4f4f4] font-bold text-base leading-7">
                    Degree
                  </p>
                  <p className="py-2 px-4 bg-[#f4f4f4] font-bold text-base leading-7">
                    Years
                  </p>
                </div>
                {profile.education.length > 0 ? (
                  profile.education.map((edu, index) => (
                    <div key={index} className="flex items-center gap-3 mb-4">
                      <p className="py-2 px-4 bg-[#f4f4f4]">{edu.school}</p>
                      <p className="py-2 px-4 bg-[#f4f4f4]">{edu.degree}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(edu.from).toLocaleDateString()} -{" "}
                        {edu.to ? new Date(edu.to).toLocaleDateString() : "Now"}
                      </p>
                      <button
                        onClick={() => deleteEducation(edu.id)}
                        className="py-2 px-4 bg-red-500 text-white"
                      >
                        Delete
                      </button>
                    </div>
                  ))
                ) : (
                  <p>No education added</p>
                )}
                <button className="py-2 px-4 mt-4 bg-[#ff1f1f] text-white flex items-center gap-2 rounded-[4px]">
                  <FaUserMinus /> Delete My Account
                </button>
              </div>
            </div>
          ) : (
            <button className="bg-[#17a2b8] py-2 text-center flex justify-center px-4 text-white">
              <Link href="/createProfile">Create Profile</Link>
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
