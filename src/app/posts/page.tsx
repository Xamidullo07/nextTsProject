"use client";

import React, { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { IoPerson } from "react-icons/io5";

import { baseUrl } from "../../utils/api";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import Image from "next/image";
import { toast } from "react-toastify";
import { OrbitProgress } from "react-loading-indicators";
import { useRouter } from "next/navigation";

interface Post {
  _id: string;
  text: string;
  name: string;
  date: string;
  avatar: string;
  likes: string[];
}

function Posts() {
  const router = useRouter();

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [newPostText, setNewPostText] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Authentication token not found.");
          setLoading(false);
          return;
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
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center text-lg font-semibold">
          <OrbitProgress color="#32c0cd" size="medium" text="" textColor="" />
        </div>
      </div>
    );
  if (error)
    return (
      <div className="text-center text-red-500 font-semibold">{error}</div>
    );

  const handleCreatePost = async () => {
    if (!newPostText.trim()) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) return router.push("/login");

      const response = await axios.post(
        `${baseUrl}posts`,
        { text: newPostText },
        { headers: { "x-auth-token": token } }
      );

      setPosts([response.data, ...posts]);
      setNewPostText("");
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  const handleLike = async (postId: string) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return router.push("/login");

      await axios.put(
        `${baseUrl}posts/like/${postId}`,
        {},
        {
          headers: { "x-auth-token": token },
        }
      );

      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId
            ? { ...post, likes: [...post.likes, "liked"] }
            : post
        )
      );
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const handleUnlike = async (postId: string) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return router.push("/login");

      await axios.put(
        `${baseUrl}posts/unlike/${postId}`,
        {},
        {
          headers: { "x-auth-token": token },
        }
      );

      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId
            ? { ...post, likes: post.likes.slice(0, -1) }
            : post
        )
      );
    } catch (error) {
      console.error("Error unliking post:", error);
    }
  };

  return (
    <div className="max-w-[800px] m-auto p-4 ">
      <h1 className="font-bold text-5xl text-start pb-11 text-[#17a2b8] pt-9">
        Posts
      </h1>
      <div className="flex items-center gap-2 mb-4">
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
        value={newPostText}
        onChange={(e) => setNewPostText(e.target.value)}
      />
      <button
        onClick={handleCreatePost}
        className="mt-4 px-8 py-2 bg-[#17a2b8] text-white rounded-md hover:bg-[#18515a]"
      >
        Submit
      </button>
      <div>
        <div className="flex flex-col">
          {posts.length === 0 ? (
            <p className="text-center text-gray-500">No posts available</p>
          ) : (
            <ul className="space-y-4 mt-5">
              {posts.map((post) => (
                <li
                  key={post._id}
                  className="border rounded-lg p-4 shadow-md flex items-start gap-4 bg-white"
                >
                  <div>
                    <Image
                      src="https://gravatar.com/avatar/d9d8abfa89444606aa6483e6dba1eb83?d=mm&r=pg&s=200"
                      width={200}
                      height={200}
                      alt={post.name}
                      className="w-20 h-20 rounded-full object-cover"
                    />

                    <p className="mt-2 text-center">{post.name}</p>
                  </div>

                  <div className="ml-5">
                    <div>
                      <p className="text-gray-700 text-start mb-3">
                        {post.text}
                      </p>
                      <p className="text-gray-400 text-sm text-start">
                        {" "}
                        {new Date(post.date).toLocaleDateString()}
                      </p>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-2 mt-3 mb-3">
                      <button
                        className="p-2 bg-gray-200 rounded-md hover:bg-gray-300"
                        onClick={() => handleLike(post._id)}
                      >
                        <FaThumbsUp className="text-gray-600" />
                        {post.likes.length > 0 && (
                          <span>{post.likes.length}</span>
                        )}
                      </button>
                      <button
                        className="p-2 bg-gray-200 rounded-md hover:bg-gray-300"
                        onClick={() => handleUnlike(post._id)}
                      >
                        <FaThumbsDown className="text-gray-600" />
                      </button>
                      <button
                        onClick={() => router.push(`/posts/${post._id}`)}
                        className="px-2 py-2 bg-[#17a2b8] text-white rounded-md hover:bg-[#17a3b8c4]"
                      >
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
