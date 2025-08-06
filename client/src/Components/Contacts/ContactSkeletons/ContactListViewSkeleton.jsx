import React from 'react';

const ContactListViewSkeleton = () => {
  return (
    <div className="space-y-4 mt-4">
      {[...Array(5)].map((_, index) => (
        <div
          key={index}
          className="animate-pulse flex justify-between items-center p-4 bg-gray-100 rounded-md shadow"
        >
          <div className="flex flex-col gap-2">
            <div className="h-4 w-40 bg-gray-300 rounded"></div>
            <div className="h-3 w-24 bg-gray-300 rounded"></div>
            <div className="h-4 w-28 bg-gray-300 rounded"></div>
            <div className="h-3 w-20 bg-gray-300 rounded"></div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="h-4 w-12 bg-gray-300 rounded"></div>
            <div className="h-4 w-12 bg-gray-300 rounded"></div>
            <div className="h-4 w-12 bg-gray-300 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContactListViewSkeleton;
