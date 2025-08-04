import React, { useEffect, useState } from 'react';
import api from '../../utils/axios';
import { useNavigate } from 'react-router-dom';

const UserUpdate = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    contact: '',
    profile_image: null,
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get('/user-profile/');
        setFormData(res.data);
      } catch (err) {
        setError('Failed to load profile data.');
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updateData = new FormData();
    for (let key in formData) {
      if (formData[key]) updateData.append(key, formData[key]);
    }

    try {
      await api.put('/user-profile/update/', updateData);
      navigate('/profile');
    } catch (err) {
      setError('Failed to update profile.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-8 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
        Update Your Profile
      </h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-6">
        <div>
          <label htmlFor="first_name" className="block mb-1 font-medium text-gray-700">
            First Name
          </label>
          <input
            id="first_name"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your first name"
            required
          />
        </div>

        <div>
          <label htmlFor="last_name" className="block mb-1 font-medium text-gray-700">
            Last Name
          </label>
          <input
            id="last_name"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your last name"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block mb-1 font-medium text-gray-700">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
            required
          />
        </div>

        <div>
          <label htmlFor="contact" className="block mb-1 font-medium text-gray-700">
            Contact
          </label>
          <input
            id="contact"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your contact number"
          />
        </div>

        <div>
          <label htmlFor="profile_image" className="block mb-1 font-medium text-gray-700">
            Profile Image
          </label>
          <input
            id="profile_image"
            type="file"
            name="profile_image"
            onChange={handleChange}
            className="w-full text-gray-700"
            accept="image/*"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition"
        >
          Update Profile
        </button>

        {error && <p className="text-red-500 mt-3 text-center">{error}</p>}
      </form>
    </div>
  );
};

export default UserUpdate;
