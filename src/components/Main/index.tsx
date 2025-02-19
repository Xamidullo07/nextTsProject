import Link from "next/link";
import React from "react";

function Main() {
  return (
    <div className="relative flex items-center justify-center h-screen bg-gray-900">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center brightness-50"
        style={{ backgroundImage: "url('/img.webp')" }}
      ></div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-6">
        <h1 className="text-5xl md:text-6xl font-bold">Developer Connector</h1>
        <p className="mt-4 text-lg md:text-xl text-gray-300">
          Create a developer profile/portfolio, share posts and get help from
          other developers
        </p>

        {/* Buttons */}
        <div className="mt-6 space-x-4">
          <Link href="/register">
            <button className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg shadow">
              Sign Up
            </button>
          </Link>
          <Link href="/login">
            <button className="px-6 py-3 bg-white text-gray-900 font-medium rounded-lg shadow border hover:bg-gray-100">
              Login
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Main;
