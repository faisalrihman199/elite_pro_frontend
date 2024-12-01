import React from 'react';

const LoadingSkeleton = () => {
    return (
        <div className="space-y-8 p-4">
          {/* Top row with cards skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {/* Card skeletons */}
            <div className="border border-gray-300 shadow rounded-md p-4 w-full animate-pulse">
              <div className="h-8 bg-slate-700 rounded mb-4"></div>
              <div className="h-4 bg-slate-700 rounded w-3/4"></div>
            </div>
            <div className="border border-gray-300 shadow rounded-md p-4 w-full animate-pulse">
              <div className="h-8 bg-slate-700 rounded mb-4"></div>
              <div className="h-4 bg-slate-700 rounded w-3/4"></div>
            </div>
            <div className="border border-gray-300 shadow rounded-md p-4 w-full animate-pulse">
              <div className="h-8 bg-slate-700 rounded mb-4"></div>
              <div className="h-4 bg-slate-700 rounded w-3/4"></div>
            </div>
            <div className="border border-gray-300 shadow rounded-md p-4 w-full animate-pulse">
              <div className="h-8 bg-slate-700 rounded mb-4"></div>
              <div className="h-4 bg-slate-700 rounded w-3/4"></div>
            </div>
          </div>
    
          {/* Middle row with charts skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-gray-300 shadow rounded-md p-6 w-full h-64 animate-pulse">
              <div className="h-6 bg-slate-700 rounded w-1/4 mb-6"></div>
              <div className="h-full bg-slate-700 rounded"></div>
            </div>
            <div className="border border-gray-300 shadow rounded-md p-6 w-full h-64 animate-pulse">
              <div className="h-6 bg-slate-700 rounded w-1/4 mb-6"></div>
              <div className="h-full bg-slate-700 rounded"></div>
            </div>
          </div>
    
          {/* Bottom row with table skeleton */}
          <div className="border border-gray-300 shadow rounded-md p-4 w-full animate-pulse">
            <div className="h-6 bg-slate-700 rounded w-1/4 mb-6"></div>
            {/* Table headers */}
            <div className="grid grid-cols-4 gap-4 mb-4">
              <div className="h-4 bg-slate-700 rounded"></div>
              <div className="h-4 bg-slate-700 rounded"></div>
              <div className="h-4 bg-slate-700 rounded"></div>
              <div className="h-4 bg-slate-700 rounded"></div>
            </div>
            {/* Table rows */}
            <div className="space-y-4">
              <div className="grid grid-cols-4 gap-4">
                <div className="h-4 bg-slate-700 rounded"></div>
                <div className="h-4 bg-slate-700 rounded"></div>
                <div className="h-4 bg-slate-700 rounded"></div>
                <div className="h-4 bg-slate-700 rounded"></div>
              </div>
              <div className="grid grid-cols-4 gap-4">
                <div className="h-4 bg-slate-700 rounded"></div>
                <div className="h-4 bg-slate-700 rounded"></div>
                <div className="h-4 bg-slate-700 rounded"></div>
                <div className="h-4 bg-slate-700 rounded"></div>
              </div>
              <div className="grid grid-cols-4 gap-4">
                <div className="h-4 bg-slate-700 rounded"></div>
                <div className="h-4 bg-slate-700 rounded"></div>
                <div className="h-4 bg-slate-700 rounded"></div>
                <div className="h-4 bg-slate-700 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      );
};

export default LoadingSkeleton;
