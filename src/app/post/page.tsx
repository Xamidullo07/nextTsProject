// const Posts = () => {
//   return (
//     <div className="max-w-2xl mx-auto p-6">
//       <h1 className="text-3xl font-bold text-gray-900 mb-4">Posts</h1>
//       <p className="text-gray-600 mb-4 flex items-center gap-2">
//         <span className="text-xl">👤</span> Welcome to the community
//       </p>

//       {/* Post form */}
//       <form className="bg-white shadow-md rounded-lg p-4 mb-6">
//         <h2 className="text-lg font-semibold text-white bg-slate-500 p-2 rounded-t-lg">
//           Say Something...
//         </h2>
//         <textarea
//           className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
//           placeholder="Create a post"
//         ></textarea>
//         <button
//           type="submit"
//           className="w-full bg-gray-800 text-white py-2 mt-3 rounded-lg hover:bg-gray-700 transition"
//         >
//           {" "}
//           Submit
//         </button>
//       </form>

//       {/* Post List */}
//       <div className="space-y-6">
//         <div className="bg-white p-4 shadow-md rounded-lg">
//           <div className="flex items-center gap-3">
//             {/* <img
//                 src={post.user.avatar}
//                 alt="User Avatar"
//                 className="w-12 h-12 rounded-full"
//               /> */}
//             <div>
//               <h3 className="text-teal-600 font-semibold"></h3>
//               <p className="text-gray-500 text-sm">Posted on</p>
//             </div>
//           </div>
//           <p className="mt-2 text-gray-900"></p>
//           <div className="flex items-center gap-3 mt-3">
//             <button className="flex items-center text-gray-700 hover:text-teal-600">
//               👍
//             </button>
//             <button className="flex items-center text-gray-700 hover:text-red-500">
//               👎
//             </button>
//             <button className="ml-auto bg-slate-500 text-white px-3 py-1 rounded-lg">
//               Discussion
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default Posts;

"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { IoPerson } from "react-icons/io5";

import { baseUrl } from "../../utils/api";
import { FaRegThumbsUp, FaRegCommentDots } from "react-icons/fa";

interface Post {
  _id: string;
  text: string;
  name: string;
  date: string;
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
      } catch (error: any) {
        console.error("Error fetching posts:", error);
        setError(
          error.response?.data?.message ||
            error.message ||
            "Failed to fetch posts."
        );
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
                  <img
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
