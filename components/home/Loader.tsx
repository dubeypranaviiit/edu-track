import React from 'react';

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-4 border-blue-500 animate-ping"></div>
        <div className="absolute inset-0 rounded-full border-4 border-blue-700"></div>
        <div className="absolute inset-0 flex items-center justify-center text-blue-700 font-semibold">
          EDU
        </div>
      </div>
    </div>
  );
};

export default Loader;
