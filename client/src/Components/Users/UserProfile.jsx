import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../utils/axios';

const UserProfile = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    document.title = 'Your Profile';
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await api.get('/user-profile/');
      setProfile(res.data);
    } catch (err) {
      setError('Failed to load profile.');
    }
  };

  if (error)
    return <div className="text-red-600 text-center mt-10">{error}</div>;
  if (!profile)
    return <p className="text-center mt-10 text-gray-600">Loading...</p>;

  return (
    <div className="max-w-md mx-auto mt-12 p-8 bg-white rounded-xl shadow-lg">
      <div className="flex flex-col items-center space-y-4">
        {profile.profile_image ? (
          <img
            src={profile.profile_image}
            alt="Profile"
            className="w-28 h-28 rounded-full object-cover shadow-md"
          />
        ) : (
          <div className="w-28 h-28 bg-gray-300 rounded-full flex items-center justify-center text-gray-500 text-3xl font-semibold">
            {profile.first_name?.[0] || 'U'}
          </div>
        )}

        <h2 className="text-2xl font-semibold text-gray-900">
          {profile.first_name} {profile.last_name}
        </h2>
        <p className="text-gray-600">{profile.email}</p>
        <p className="text-gray-600">Username: <span className="font-medium">{profile.username}</span></p>
        {profile.contact && (
          <p className="text-gray-600">Contact: <span className="font-medium">{profile.contact}</span></p>
        )}

        <div className="flex space-x-4 mt-6">
          <Link
            to="/user-update"
            className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Update Profile
          </Link>

          <Link
            to="/user-delete"
            className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            Delete Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
