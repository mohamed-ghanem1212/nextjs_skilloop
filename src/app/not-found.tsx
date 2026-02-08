"use client";
import Link from "next/link";
import { ReactNode, useEffect, useState } from "react";

export default function NotFound(): ReactNode {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 via-blue-50 to-blue-50 px-4">
      <div
        className={`max-w-2xl w-full text-center space-y-8 transition-all duration-1000 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      >
        {/* Animated 404 */}
        <div className="relative">
          <h1 className="text-[150px] md:text-[200px] font-bold bg-linear-to-r from-blue-600 to-blue-300 bg-clip-text text-transparent leading-none select-none animate-pulse">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-6xl animate-bounce">🤔</div>
          </div>
        </div>

        {/* Error Message */}
        <div className="space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Oops! Lost in Space
          </h2>
          <p className="text-lg text-gray-600 max-w-md mx-auto">
            The page you're searching for has vanished into the digital void.
            Let's get you back on track!
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/"
            className="group px-8 py-4 bg-linear-to-r from-blue-600 to-blue-300 text-white rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 w-full sm:w-auto"
          >
            <span className="flex items-center justify-center gap-2">
              🏠 Take Me Home
            </span>
          </Link>
          <button
            onClick={() => window.history.back()}
            className="px-8 py-4 bg-white text-gray-800 rounded-full font-semibold border-2 border-gray-300 hover:border-gray-400 hover:shadow-lg transform hover:scale-105 transition-all duration-200 w-full sm:w-auto"
          >
            <span className="flex items-center justify-center gap-2">
              ← Go Back
            </span>
          </button>
        </div>

        {/* Fun Suggestions */}
        <div className="pt-8">
          <p className="text-sm text-gray-500 mb-4">
            While you're here, why not explore:
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/profile"
              className="px-4 py-2 bg-white rounded-full text-sm text-gray-700 hover:bg-pink-100 hover:text-pink-700 transition-colors shadow-sm"
            >
              👤 Profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
