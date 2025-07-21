import React, { useState } from "react";

export function Manager() {
  const [showPassword, setShowPassword] = useState(false);
  


  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4 py-10">
      <div className="bg-white shadow-md rounded-lg p-6 sm:p-8 w-full max-w-md sm:max-w-lg md:max-w-xl">
        {/* Heading */}
        <h2 className="text-3xl font-bold text-center mb-6">
          <span className="text-indigo-600">Pass</span>
          <span className="text-emerald-500">Man</span>
        </h2>

        {/* Website URL */}
        <div className="mb-4">
          <label className="block font-semibold mb-2" htmlFor="website">
            <span className="text-indigo-600">Website</span>{" "}
            <span className="text-emerald-500">URL</span>
          </label>
          <input
            type="text"
            id="website"
            placeholder="e.g. https://example.com"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        {/* Username & Password Row */}
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          {/* Username */}
          <div className="flex-1">
            <label className="block font-semibold mb-2" htmlFor="username">
              <span className="text-indigo-600">User</span>
              <span className="text-emerald-500">name</span>
            </label>
            <input
              type="text"
              id="username"
              placeholder="your_username"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          {/* Password */}
          <div className="flex-1">
            <label className="block font-semibold mb-2" htmlFor="password">
              <span className="text-indigo-600">Pass</span>
              <span className="text-emerald-500">word</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder=""
                className="w-full border border-gray-300 rounded-md px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              <span
                className="absolute inset-y-0 right-2 flex items-center text-gray-600 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "👁"}
              </span>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button className="mt-4 w-full bg-indigo-500 text-white font-semibold py-2 px-4 rounded hover:bg-indigo-600 transition">
          Save Password
        </button>
      </div>
    </div>
  );
}