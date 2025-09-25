'use client';

import ThreeDCard from '@/components/ui/ThreeDCard';
import { FiCode, FiLayers, FiZap } from 'react-icons/fi';

const ThreeDCardExample = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 max-w-7xl mx-auto">
      <ThreeDCard className="bg-white dark:bg-gray-800 p-6 h-64">
        <div className="flex flex-col items-center justify-center h-full text-center">
          <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mb-4">
            <FiCode className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Modern Web Development</h3>
          <p className="text-gray-600 dark:text-gray-300">
            Building responsive and performant web applications with the latest technologies.
          </p>
        </div>
      </ThreeDCard>

      <ThreeDCard 
        className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-6 h-64"
        perspective={1200}
        maxTilt={15}
      >
        <div className="flex flex-col items-center justify-center h-full text-center">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-4">
            <FiLayers className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">UI/UX Design</h3>
          <p className="text-indigo-100">
            Creating beautiful and intuitive user interfaces with attention to detail.
          </p>
        </div>
      </ThreeDCard>

      <ThreeDCard 
        className="bg-white dark:bg-gray-800 p-6 h-64"
        scaleOnHover={true}
      >
        <div className="flex flex-col items-center justify-center h-full text-center">
          <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
            <FiZap className="w-6 h-6 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Performance Optimization</h3>
          <p className="text-gray-600 dark:text-gray-300">
            Optimizing applications for speed and efficiency across all devices.
          </p>
        </div>
      </ThreeDCard>
    </div>
  );
};

export default ThreeDCardExample;
