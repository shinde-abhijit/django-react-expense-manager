import React from 'react';

const HomepageSkeleton = () => {
  const sections = ['Notes', 'Contacts', 'Expenses', 'Todos'];

  return (
    <div className="max-w-4xl p-8 mx-auto space-y-10">
      {sections.map((section, index) => (
        <div
          key={index}
          className="bg-white p-8 rounded-lg shadow-md animate-pulse space-y-4"
        >
          <div className="h-5 w-1/3 bg-gray-300 rounded"></div>
          <ul className="space-y-2">
            {[...Array(5)].map((_, i) => (
              <li key={i} className="h-4 w-full bg-gray-200 rounded"></li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default HomepageSkeleton;
