import React from "react";

export function Navbar() {
  return (
    <nav className="bg-gray-800 text-white px-4 sm:px-6 py-3 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center">
        {/* Left: Brand with color styling */}
        <div className="text-xl font-semibold">
          &lt;<span className="text-indigo-400">Pass</span>
          <span className="text-teal-300">Man</span>/&gt;
        </div>

        {/* Right: Links */}
        <div className="space-x-4 sm:space-x-6 text-sm sm:text-base mt-2 sm:mt-0">
          <a href="#" className="hover:text-gray-300">Home</a>
          <a href="#" className="hover:text-gray-300">About</a>
          <a href="#" className="hover:text-gray-300">Contact</a>
        </div>
      </div>
    </nav>
  );
}
