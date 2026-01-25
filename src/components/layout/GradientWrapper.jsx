import React from 'react';

// This component wraps the entire page content.
// It sits behind the content (z-index -10) and creates moving colorful blobs.
const GradientWrapper = ({ children }) => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-white selection:bg-adorix-500 selection:text-white">
      
      {/* BACKGROUND LAYER: The Moving Blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        {/* Purple Blob */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
        {/* Blue Blob (Delayed animation) */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
        {/* Pink Blob */}
        <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>
      
      {/* CONTENT LAYER: The actual page content sits here */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default GradientWrapper;