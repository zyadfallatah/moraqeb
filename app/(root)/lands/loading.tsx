import React from "react";

const loader = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin mx-auto mb-2"></div>
        <p className="text-sm">Loading...</p>
      </div>
    </div>
  );
};

export default loader;
