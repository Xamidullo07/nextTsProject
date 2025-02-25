"use client";
import useFetch from "../../app/hooks/useFetch";
import Link from "next/link";
import { IoPerson } from "react-icons/io5";

interface User {
  name: string;
  email: string;
  experience: { company: string; title: string; years: string }[];
  education: { school: string; degree: string; years: string }[];
}

function Dashboard() {
  const { data, error } = useFetch<{ name: string }>("auth");
  const { data: profile, error: errorProfile } = useFetch<User>("profile/me");
  console.log(error);

  console.log(data);

  return (
    <>
      <div className="max-w-[800px] m-auto p-4 text-center">
        <div>
          <h1 className="font-bold text-start py-4 text-5xl text-[#17a2b8] pt-9">
            Dashboard
          </h1>
          <div className="flex items-center py-2gap-2">
            <IoPerson className="text-2xl" />
            <p className="text-2xl">Welcome {data?.name || "User"}</p>
          </div>
          <p className="text-start py-4">
            You have not yet set up a profile, please add some info
          </p>
          {profile ? (
            <div>
              <div>
                <div className="flex items-center gap-4">
                  <button className="py-2 px-4 bg-[#f4f4f4]">
                    <Link href="/editProfile">Edit Profile</Link>
                  </button>
                  <button className="py-2 px-4 bg-[#f4f4f4]">
                    <Link href="/addan">Add Experience</Link>
                  </button>
                  <button className="py-2 px-4 bg-[#f4f4f4]">
                    <Link href="/edu">Add Education</Link>
                  </button>
                </div>
                <h4 className="text-2xl leading-10 font-bold">
                  Experience Credentials
                </h4>
                <div className="flex items-center gap-3">
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
                <h4 className="text-2xl leading-10 font-bold">
                  Education Credentials
                </h4>
                <div className="flex items-center gap-3">
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
                <button className="py-2 px-4 bg-[#ff1f1f] text-white">
                  Delete My Account
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
