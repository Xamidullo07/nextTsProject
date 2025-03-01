"use client";
import { baseUrl } from "../../../utils/api";
import axios, { AxiosError } from "axios";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaThumbsDown, FaThumbsUp } from "react-icons/fa";
import { OrbitProgress } from "react-loading-indicators";

interface PostDetail {
  _id: string;
  text: string;
  name: string;
  date: string;
  avatar: string;
  email: string;
  likes: string[];
  comments: { _id: string; text: string; name: string; date: string }[];
}

const Page = () => {
  const { postsid } = useParams();
  const router = useRouter();
  const [post, setPost] = useState<PostDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [newComment, setNewComment] = useState("");
  useEffect(() => {
    const fetchPostDetail = async () => {
      try {
        if (!postsid) {
          setError("Post ID not found.");
          setLoading(false);
          return;
        }

        const token = localStorage.getItem("token");
        if (!token) {
          router.push("/login");
          return;
        }

        const response = await axios.get(`${baseUrl}posts/${postsid}`, {
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token,
          },
        });
        setPost(response.data);
      } catch (err) {
        const error = err as AxiosError<{ message?: string }>;
        setError(
          error.response?.data?.message || "Failed to fetch post details."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPostDetail();
  }, [postsid, router]);

  const handleLike = async () => {
    if (!post) return;
    try {
      const token = localStorage.getItem("token");
      if (!token) return router.push("/login");

      await axios.put(
        `${baseUrl}posts/like/${post._id}`,
        {},
        { headers: { "x-auth-token": token } }
      );

      setPost({ ...post, likes: [...post.likes, "liked"] });
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const handleUnlike = async () => {
    if (!post) return;
    try {
      const token = localStorage.getItem("token");
      if (!token) return router.push("/login");

      await axios.put(
        `${baseUrl}posts/unlike/${post._id}`,
        {},
        { headers: { "x-auth-token": token } }
      );

      setPost({ ...post, likes: post.likes.slice(0, -1) });
    } catch (error) {
      console.error("Error unliking post:", error);
    }
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !post) return;
    try {
      const token = localStorage.getItem("token");
      if (!token) return router.push("/login");

      const response = await axios.post(
        `${baseUrl}posts/comment/${post._id}`,
        { text: newComment },
        { headers: { "x-auth-token": token } }
      );

      setPost({ ...post, comments: [...post.comments, response.data] });
      setNewComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <OrbitProgress color="#32c0cd" size="medium" text="" textColor="" />
      </div>
    );

  if (error)
    return (
      <div className="text-center text-red-500 font-semibold mt-10">
        {error}
      </div>
    );

  if (!post) return <div className="text-center mt-10">Post not found.</div>;

  return (
    <div className="max-w-2xl mx-auto p-4 border rounded-lg shadow-lg">
      <Link href={"/posts"} className="mb-4 mt-4 px-4 py-2 bg-gray-200 rounded">
        Back To Posts
      </Link>
      <div className="border p-4 rounded-lg flex gap-4 items-center mt-4">
        <Image
          src={
            post.avatar || "https://gravatar.com/avatar/default?d=mm&r=pg&s=200"
          }
          width={80}
          height={80}
          alt={post.name}
          className="w-20 h-20 rounded-full object-cover text-center"
        />
        <div>
          <p className="font-bold">{post.name}</p>
          <p className="text-gray-500 text-sm">
            {new Date(post.date).toLocaleString()}
          </p>
          <p className="mt-2">{post.text}</p>
          <div className="flex items-center gap-2 mt-2">
            <button
              className="p-2 bg-gray-200 rounded-md hover:bg-gray-300 flex items-center gap-1"
              onClick={handleLike}
            >
              <FaThumbsUp className="text-gray-600" />
              {post.likes.length > 0 && <span>{post.likes.length}</span>}
            </button>
            <button
              className="p-2 bg-gray-200 rounded-md hover:bg-gray-300"
              onClick={handleUnlike}
            >
              <FaThumbsDown className="text-gray-600" />
            </button>
            <button className="px-3 py-1 bg-[#17a2b8] text-white rounded">
              Discussion
            </button>
          </div>
        </div>
      </div>

      <h2 className="mt-6 bg-[#17a2b8] text-white p-2 rounded">
        Leave a Comment
      </h2>
      <form className="mt-2" onSubmit={handleCommentSubmit}>
        <textarea
          className="w-full border p-2 rounded"
          placeholder="Comment the post"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        ></textarea>
        <button
          type="submit"
          className="mt-2 px-4 py-2 bg-[#17a2b8]  text-white rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Page;
