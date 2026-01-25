import React from 'react';
import { Wifi } from 'lucide-react';

const VirtualPage = () => {
  return (
    <div className="pt-28 px-8 max-w-7xl mx-auto pb-20">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Virtual Kiosk View</h1>
        <div className="flex items-center gap-2 text-green-600 bg-green-50 px-4 py-2 rounded-full border border-green-100">
            <Wifi className="w-4 h-4 animate-pulse" />
            <span className="text-sm font-bold">Kiosk Online (ID: #ADX-001)</span>
        </div>
      </div>

      <div className="bg-black rounded-2xl p-4 shadow-2xl max-w-4xl mx-auto border-8 border-gray-800">
        <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center relative overflow-hidden">
            {/* Simulation of an Ad running */}
            <div className="text-center">
                <h2 className="text-white text-4xl font-bold mb-4">YOUR AD HERE</h2>
                <p className="text-gray-400">Waiting for next trigger...</p>
            </div>
            
            {/* Overlay UI simulating camera tracking */}
            <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-md text-white text-xs px-2 py-1 rounded">
                Camera Active
            </div>
        </div>
      </div>
    </div>
  );
};

export default VirtualPage;