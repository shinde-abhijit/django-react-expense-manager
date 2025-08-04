import React, { useEffect, useState } from 'react';
import api from '../../utils/axios';
import { useParams, Link } from 'react-router-dom';

const ContactDetails = () => {
  useEffect(() => {
    document.title = "Contact Details";
  }, []);
  const [contact, setContact] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    api.get(`/contacts/${id}/`).then(res => setContact(res.data));
  }, [id]);

  const getInitials = (firstName, lastName) => {
    const firstInitial = firstName ? firstName.charAt(0).toUpperCase() : '';
    const lastInitial = lastName ? lastName.charAt(0).toUpperCase() : '';
    return firstInitial + lastInitial;
  };

  return contact ? (
    <div className="max-w-xl mx-auto mt-12 p-8 bg-white rounded-3xl shadow-xl border border-gray-200">
      {/* Centered Avatar */}
      <div className="flex justify-center mb-6">
        {contact.contact_image ? (
          <img
            src={contact.contact_image}
            alt={`${contact.first_name} ${contact.last_name}`}
            className="w-28 h-28 rounded-full object-cover border-2 border-blue-500"
          />
        ) : (
          <div className="w-28 h-28 rounded-full bg-blue-600 flex items-center justify-center text-white text-4xl font-extrabold border-2 border-blue-500 select-none">
            {getInitials(contact.first_name, contact.last_name)}
          </div>
        )}
      </div>

      {/* Name and Nickname */}
      <h1 className="text-2xl font-extrabold text-center text-gray-900 mb-1">
        {contact.first_name} {contact.last_name}
      </h1>
      {contact.nickname && (
        <p className="text-center text-blue-600 italic font-semibold mb-6">
          "{contact.nickname}"
        </p>
      )}

      {/* Contact details stacked vertically */}
      <div className="space-y-4 text-gray-700 text-base">
        <p><span className="font-semibold">Birth Date:</span> {contact.birth_date || '—'}</p>
        <p><span className="font-semibold">Contact:</span> {contact.contact || '—'}</p>
        <p><span className="font-semibold">Alternate Contact:</span> {contact.alternate_contact || '—'}</p>
        <p><span className="font-semibold">Email:</span> {contact.email || '—'}</p>
        <p><span className="font-semibold">Alternate Email:</span> {contact.alternate_email || '—'}</p>
        <p><span className="font-semibold">Postal Code:</span> {contact.postal_code || '—'}</p>
        <p><span className="font-semibold">Address:</span> {contact.address || '—'}</p>
        <p><span className="font-semibold">City:</span> {contact.city || '—'}</p>
        <p><span className="font-semibold">State:</span> {contact.state || '—'}</p>
        <p><span className="font-semibold">Country:</span> {contact.country || '—'}</p>
      </div>

      {/* Back Link */}
      <div className="mt-10 text-center">
        <Link
          to="/contact-list"
          className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition"
        >
          Back to Contact List
        </Link>
      </div>
    </div>
  ) : (
    <div className="flex justify-center items-center h-screen">
      <p className="text-lg text-gray-500">Loading...</p>
    </div>
  );
};

export default ContactDetails;
