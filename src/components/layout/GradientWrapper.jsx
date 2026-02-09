import React from 'react';
import MouseParticles from '../ui/MouseParticles';

const GradientWrapper = ({ children }) => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-adorix-light selection:bg-adorix-accent selection:text-white">

      {/* ANIMATED BACKGROUND BLOBS (Updated to your colors) */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">

        {/* Blob 1: Primary Teal */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-adorix-primary rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>

        {/* Blob 2: Accent Cyan (Delayed) */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-adorix-accent rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

        {/* Blob 3: Darker Teal (Bottom) */}
        <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-adorix-secondary rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      </div>

      {/* INTERACTIVE MOUSE DUST (Global) */}
      <MouseParticles />

      {/* Page Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default GradientWrapper;