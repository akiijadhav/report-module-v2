import React from 'react';

export default function PageHeaderSkeleton() {
  return (
    <>
      <div className="py-4 px-6 border-b border-gray-300">
        <div className="flex items-center justify-between animate-pulse">
          <div className="bg-gray-300 rounded-full w-20 h-5" />
          <div className="bg-gray-300 rounded w-36 h-10" />
        </div>
      </div>
    </>
  );
}
