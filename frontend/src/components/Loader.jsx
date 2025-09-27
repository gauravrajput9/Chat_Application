import React from "react";
import { Loader2 } from "lucide-react";

const RotatingLoader = ({ text = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#0f172a] to-[#1e1b4b] text-white">
      
      {/* Rotating rings container */}
      <div className="relative flex items-center justify-center">
        {/* Outer ring - clockwise */}
        <div className="absolute h-28 w-28 rounded-full border-4 border-teal-500/20 animate-spin-slow"></div>
        {/* Inner ring - counter-clockwise */}
        <div className="absolute h-20 w-20 rounded-full border-4 border-teal-500/40 animate-spin-reverse"></div>

        {/* Spinning loader icon */}
        <Loader2 className="h-12 w-12 text-teal-400 animate-spin" />

        {/* Pulsing dots */}
        <div className="absolute flex space-x-3">
          <span className="h-3 w-3 bg-teal-400 rounded-full animate-pulse delay-100"></span>
          <span className="h-3 w-3 bg-teal-400 rounded-full animate-pulse delay-200"></span>
          <span className="h-3 w-3 bg-teal-400 rounded-full animate-pulse delay-300"></span>
        </div>
      </div>

      {/* Loader text */}
      <p className="mt-8 text-lg font-semibold text-gray-300">{text}</p>
    </div>
  );
};

export default RotatingLoader;
