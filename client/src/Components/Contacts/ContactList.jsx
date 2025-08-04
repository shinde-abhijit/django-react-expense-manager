import React, { useEffect, useState } from 'react';
import api from '../../utils/axios';
import { Link } from 'react-router-dom';
import Loader from '../Loader';
import ContactListSkeleton from './ContactListSkeleton';

const PAGE_SIZE = 50; // items per page

const ContactList = () => {

  useEffect(() => {
    document.title = "Contact List";
  }, []);
  
  const [contacts, setContacts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchContacts = async () => {
      setLoading(true);
      try {
        // Adjust query params according to your backend pagination scheme
        const response = await api.get('/contacts/', {
          params: { page, page_size: PAGE_SIZE }
        });
        setContacts(response.data.results || response.data); // support DRF pagination
        setTotalCount(response.data.count || response.data.length); // total count for DRF or simple
      } catch (error) {
        console.error('Failed to fetch contacts:', error);
      }
      setLoading(false);
    };

    fetchContacts();
  }, [page]);

  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Contact List</h2>
        <Link
          to="/add-contact"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Add New Contact
        </Link>
      </div>

      {loading ? (
        <><ContactListSkeleton /></>
      ) : contacts.length === 0 ? (
        <p>No contacts found.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {contacts.map(contact => (
              <div
                key={contact.id}
                className="bg-white shadow rounded p-4 flex flex-col justify-between"
              >
                <div className="flex items-center mb-4 space-x-4">
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

                  <h3 className="text-xl font-semibold">
                    {contact.first_name} {contact.last_name}
                  </h3>
                </div>

                <p className="text-gray-600 mb-2">{contact.contact}</p>

                <div className="flex justify-between mt-4">
                  <Link
                    to={`/contact-details/${contact.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    View
                  </Link>
                  <Link
                    to={`/contact-update/${contact.id}`}
                    className="text-green-600 hover:underline"
                  >
                    Edit
                  </Link>
                  <Link
                    to={`/contact-delete/${contact.id}`}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination controls */}
          <div className="flex justify-center items-center mt-8 space-x-4">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className={`px-4 py-2 rounded border ${
                page === 1
                  ? 'text-gray-400 border-gray-300 cursor-not-allowed'
                  : 'text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white transition'
              }`}
            >
              Previous
            </button>
            <span>
              Page <strong>{page}</strong> of <strong>{totalPages}</strong>
            </span>
            <button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
              className={`px-4 py-2 rounded border ${
                page === totalPages
                  ? 'text-gray-400 border-gray-300 cursor-not-allowed'
                  : 'text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white transition'
              }`}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ContactList;
