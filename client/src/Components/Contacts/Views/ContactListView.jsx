import React from 'react';
import { Link } from 'react-router-dom';

const ContactListView = ({ contacts }) => {
  return (
    <div className="space-y-4">
      {contacts.map(contact => (
        <div
          key={contact.id}
          className="bg-white shadow rounded p-4 flex items-center justify-between"
        >
          <div className="flex items-center space-x-4">
            {contact.contact_image ? (
              <img
                src={contact.contact_image}
                alt={`${contact.first_name} ${contact.last_name}`}
                className="w-12 h-12 rounded-full object-cover"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold text-lg uppercase">
                {`${contact.first_name?.[0] || ''}${contact.last_name?.[0] || ''}`}
              </div>
            )}
            <div>
              <h3 className="text-xl font-semibold">
                {contact.first_name} {contact.last_name}
              </h3>
              <p className="text-gray-600">{contact.contact}</p>
            </div>
          </div>

          <div className="flex space-x-4">
            <Link to={`/contact-details/${contact.id}`} className="text-blue-600 hover:underline">View</Link>
            <Link to={`/contact-update/${contact.id}`} className="text-green-600 hover:underline">Edit</Link>
            <Link to={`/contact-delete/${contact.id}`} className="text-red-600 hover:underline">Delete</Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContactListView;
