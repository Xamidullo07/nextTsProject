import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center">
      <h1 className="text-9xl font-bold text-red-500">404</h1>
      <h2 className="text-2xl font-semibold text-gray-700 mt-4">
        Oops! Page not found.
      </h2>
      <p className="text-lg text-gray-600 mt-2">
        You will be redirected to the{" "}
        <Link href="/" className="text-blue-500 font-medium hover:underline">
          Home Page
        </Link>{" "}
        in 3 seconds...
      </p>
    </div>
  );
}
