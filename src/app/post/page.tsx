"use client";

import React, { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { IoPerson } from "react-icons/io5";

import { baseUrl } from "../../utils/api";
import { FaRegThumbsUp, FaRegCommentDots } from "react-icons/fa";
import Image from "next/image";
import { toast } from "react-toastify";

interface Post {
  _id: string;
  text: string;
  name: string;
  date: string;
  avatar: string;
}

function Posts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Authentication token not found.");
          setLoading(false);
          return; // Stop execution
        }

        const response = await axios.get(`${baseUrl}posts`, {
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token,
          },
        });

        setPosts(response.data);
      } catch (error: unknown) {
        console.error("Error fetching posts:", error);
        if (error instanceof AxiosError) {
          const errorMsg =
            error.response?.data?.message || "Xatolik yuzaga keldi";
          toast.error(errorMsg);
        } else {
          toast.error("Noma'lum xatolik yuz berdi");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading)
    return <div className="text-center text-lg font-semibold">Loading...</div>;
  if (error)
    return (
      <div className="text-center text-red-500 font-semibold">{error}</div>
    );

  return (
    <div className="max-w-[800px] m-auto p-4 text-center">
      <h1 className="font-bold text-5xl text-start pb-11 text-[#17a2b8] pt-9">
        Posts
      </h1>
      <div className="flex items-center gap-2">
        <IoPerson className="text-2xl" />
        <p className="text-2xl">Welcome to the community</p>
      </div>
      <h2 className="bg-[#17a2b8] py-4 text-start text-white px-2 font-semibold">
        Say Something...
      </h2>
      <input
        className="h-24 w-full text-start border y-4 px-2"
        placeholder="Create a Post"
        type="text"
      />
      <div>
        <div className="flex flex-col">
          {posts.length === 0 ? (
            <p className="text-center text-gray-500">No posts available</p>
          ) : (
            <ul className="space-y-4">
              {posts.map((post) => (
                <li
                  key={post._id}
                  className="border rounded-lg p-4 shadow-md flex items-start gap-4 bg-white"
                >
                  {/* Avatar */}
                  <Image
                    src={post.avatar}
                    alt={post.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />

                  {/* Post content */}
                  <div className="flex flex-col w-full">
                    <div className="flex justify-between items-center">
                      <h3 className="text-sm font-semibold">{post.name}</h3>
                      <p className="text-gray-500 text-xs">
                        {new Date(post.date).toLocaleDateString()}
                      </p>
                    </div>
                    <p className="text-gray-700 mt-2">{post.text}</p>

                    {/* Buttons */}
                    <div className="flex items-center gap-2 mt-2">
                      <button className="flex items-center gap-1 bg-gray-200 p-1 rounded-md text-sm">
                        <FaRegThumbsUp className="text-gray-600" />
                      </button>
                      <button className="flex items-center gap-1 bg-gray-200 p-1 rounded-md text-sm">
                        <FaRegCommentDots className="text-gray-600" />
                      </button>
                      <button className="bg-[#17a2b8] text-white px-3 py-1 rounded-md text-sm">
                        Discussion
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default Posts;
