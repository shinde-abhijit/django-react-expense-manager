import React from 'react'

const ContactListSkeleton = () => {
  return (
        <div className="bg-white shadow rounded p-4 flex flex-col animate-pulse">
            <div className="flex items-center mb-4 space-x-4">
            <div className="w-12 h-12 rounded-full bg-gray-300"></div>
            <div className="h-5 w-32 bg-gray-300 rounded"></div>
            </div>
            <div className="h-4 bg-gray-300 rounded mb-6 w-3/4"></div>
            <div className="flex justify-between mt-auto space-x-4">
            <div className="h-4 w-10 bg-gray-300 rounded"></div>
            <div className="h-4 w-10 bg-gray-300 rounded"></div>
            <div className="h-4 w-10 bg-gray-300 rounded"></div>
            </div>
        </div>
  )
}

export default ContactListSkeleton