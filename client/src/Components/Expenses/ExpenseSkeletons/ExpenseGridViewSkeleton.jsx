import React from 'react';

const ExpenseGridViewSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
      {[...Array(8)].map((_, index) => (
        <div
          key={index}
          className="animate-pulse bg-gray-100 p-4 rounded shadow flex flex-col justify-between h-56"
        >
          <div>
            <div className="h-5 w-32 bg-gray-300 rounded mb-2"></div>
            <div className="h-4 w-24 bg-gray-300 rounded mb-4"></div>
            <div className="h-5 w-20 bg-gray-300 rounded mb-2"></div>
            <div className="h-4 w-28 bg-gray-300 rounded mb-1"></div>
            <div className="h-4 w-20 bg-gray-300 rounded mb-1"></div>
          </div>
          <div className="flex justify-between mt-4">
            <div className="h-4 w-12 bg-gray-300 rounded"></div>
            <div className="h-4 w-12 bg-gray-300 rounded"></div>
            <div className="h-4 w-12 bg-gray-300 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExpenseGridViewSkeleton;
