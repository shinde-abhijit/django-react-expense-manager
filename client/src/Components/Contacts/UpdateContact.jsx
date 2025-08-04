import React, { useState, useEffect } from 'react';
import api from '../../utils/axios';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateContact = () => {
  useEffect(() => {
    document.title = `Update Contact`;
  }, []);
  
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    nickname: '',
    birth_date: '',
    contact: '',
    alternate_contact: '',
    email: '',
    alternate_email: '',
    postal_code: '',
    address: '',
    city: '',
    state: '',
    country: '',
  });

  const [contactImage, setContactImage] = useState(null);

  const getContactDetails = async () => {
    try {
      const response = await api.get(`/contacts/${id}/`);
      setFormData({
        first_name: response.data.first_name || '',
        last_name: response.data.last_name || '',
        nickname: response.data.nickname || '',
        birth_date: response.data.birth_date || '',
        contact: response.data.contact || '',
        alternate_contact: response.data.alternate_contact || '',
        email: response.data.email || '',
        alternate_email: response.data.alternate_email || '',
        postal_code: response.data.postal_code || '',
        address: response.data.address || '',
        city: response.data.city || '',
        state: response.data.state || '',
        country: response.data.country || '',
      });
    } catch (error) {
      console.error('Error fetching contact:', error);
    }
  };

  useEffect(() => {
    getContactDetails();
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleImageChange = (event) => {
    setContactImage(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData();
    data.append('first_name', formData.first_name);
    data.append('last_name', formData.last_name);
    data.append('nickname', formData.nickname);
    data.append('birth_date', formData.birth_date);
    data.append('contact', formData.contact);
    data.append('alternate_contact', formData.alternate_contact);
    data.append('email', formData.email);
    data.append('alternate_email', formData.alternate_email);
    data.append('postal_code', formData.postal_code);
    data.append('address', formData.address);
    data.append('city', formData.city);
    data.append('state', formData.state);
    data.append('country', formData.country);

    if (contactImage) {
      data.append('contact_image', contactImage);
    }

    try {
      await api.put(`/contacts/${id}/`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      navigate('/contact-list');
    } catch (error) {
      console.error('Error updating contact:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 mt-8 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Update Contact</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
        {/* First Name */}
        <div className="flex flex-col">
          <label htmlFor="first_name" className="mb-2 font-medium text-gray-700">First Name</label>
          <input
            id="first_name"
            name="first_name"
            type="text"
            required
            placeholder="Enter first name"
            value={formData.first_name}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Last Name */}
        <div className="flex flex-col">
          <label htmlFor="last_name" className="mb-2 font-medium text-gray-700">Last Name</label>
          <input
            id="last_name"
            name="last_name"
            type="text"
            required
            placeholder="Enter last name"
            value={formData.last_name}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Nickname */}
        <div className="flex flex-col">
          <label htmlFor="nickname" className="mb-2 font-medium text-gray-700">Nickname</label>
          <input
            id="nickname"
            name="nickname"
            type="text"
            placeholder="Enter nickname (optional)"
            value={formData.nickname}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Birth Date */}
        <div className="flex flex-col">
          <label htmlFor="birth_date" className="mb-2 font-medium text-gray-700">Birth Date</label>
          <input
            id="birth_date"
            name="birth_date"
            type="date"
            required
            value={formData.birth_date}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Contact */}
        <div className="flex flex-col">
          <label htmlFor="contact" className="mb-2 font-medium text-gray-700">Contact</label>
          <input
            id="contact"
            name="contact"
            type="text"
            required
            placeholder="Primary phone number"
            value={formData.contact}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Alternate Contact */}
        <div className="flex flex-col">
          <label htmlFor="alternate_contact" className="mb-2 font-medium text-gray-700">Alternate Contact</label>
          <input
            id="alternate_contact"
            name="alternate_contact"
            type="text"
            placeholder="Secondary phone number"
            value={formData.alternate_contact}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <label htmlFor="email" className="mb-2 font-medium text-gray-700">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="Primary email address"
            value={formData.email}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Alternate Email */}
        <div className="flex flex-col">
          <label htmlFor="alternate_email" className="mb-2 font-medium text-gray-700">Alternate Email</label>
          <input
            id="alternate_email"
            name="alternate_email"
            type="email"
            placeholder="Secondary email address"
            value={formData.alternate_email}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Postal Code */}
        <div className="flex flex-col">
          <label htmlFor="postal_code" className="mb-2 font-medium text-gray-700">Postal Code</label>
          <input
            id="postal_code"
            name="postal_code"
            type="text"
            placeholder="e.g. 123456"
            value={formData.postal_code}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Address */}
        <div className="flex flex-col">
          <label htmlFor="address" className="mb-2 font-medium text-gray-700">Address</label>
          <input
            id="address"
            name="address"
            type="text"
            placeholder="Street address, apartment, etc."
            value={formData.address}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* City */}
        <div className="flex flex-col">
          <label htmlFor="city" className="mb-2 font-medium text-gray-700">City</label>
          <input
            id="city"
            name="city"
            type="text"
            placeholder="City name"
            value={formData.city}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* State */}
        <div className="flex flex-col">
          <label htmlFor="state" className="mb-2 font-medium text-gray-700">State</label>
          <input
            id="state"
            name="state"
            type="text"
            placeholder="State / Province"
            value={formData.state}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Country */}
        <div className="flex flex-col">
          <label htmlFor="country" className="mb-2 font-medium text-gray-700">Country</label>
          <input
            id="country"
            name="country"
            type="text"
            placeholder="Country"
            value={formData.country}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Contact Image */}
        <div className="flex flex-col">
          <label htmlFor="contact_image" className="mb-2 font-medium text-gray-700">Contact Image</label>
          <input
            id="contact_image"
            name="contact_image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded-md file:bg-white file:text-sm file:font-medium file:text-gray-700 hover:file:bg-gray-100"
          />
        </div>

        {/* Submit Button */}
        <div className="md:col-span-2">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Update Contact
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateContact;
