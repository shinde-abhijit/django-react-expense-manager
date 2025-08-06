import React, { useEffect, useState } from 'react';
import api from '../../utils/axios';
import { Link } from 'react-router-dom';

import ContactGridView from './Views/ContactGridView';
import ContactListView from './Views/ContactListView';

// View-specific skeletons
import ContactGridViewSkeleton from './ContactSkeletons/ContactGridViewSkeleton';
import ContactListViewSkeleton from './ContactSkeletons/ContactListViewSkeleton';

const PAGE_SIZE = 50;

const ContactList = () => {
  useEffect(() => {
    document.title = 'Contact List';
  }, []);

  const [contacts, setContacts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const [viewMode, setViewMode] = useState(() => {
    return localStorage.getItem('contact_view_mode') || 'grid';
  });

  useEffect(() => {
    const fetchContacts = async () => {
      setLoading(true);
      try {
        const response = await api.get('/contacts/', {
          params: { page, page_size: PAGE_SIZE }
        });
        setContacts(response.data.results || response.data);
        setTotalCount(response.data.count || response.data.length);
      } catch (error) {
        console.error('Failed to fetch contacts:', error);
      }
      setLoading(false);
    };

    fetchContacts();
  }, [page]);

  const handleViewToggle = (mode) => {
    setViewMode(mode);
    localStorage.setItem('contact_view_mode', mode);
  };

  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Contact List</h2>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => handleViewToggle('list')}
            className={`px-3 py-1 border rounded ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'border-gray-400'}`}
          >
            List View
          </button>
          <button
            onClick={() => handleViewToggle('grid')}
            className={`px-3 py-1 border rounded ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'border-gray-400'}`}
          >
            Grid View
          </button>
          <Link
            to="/add-contact"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          >
            Add Contact
          </Link>
        </div>
      </div>

      {loading ? (
        viewMode === 'grid' ? (
          <ContactGridViewSkeleton />
        ) : (
          <ContactListViewSkeleton />
        )
      ) : contacts.length === 0 ? (
        <p>No contacts found.</p>
      ) : (
        <>
          {viewMode === 'grid' ? (
            <ContactGridView contacts={contacts} />
          ) : (
            <ContactListView contacts={contacts} />
          )}

          {/* Pagination Controls */}
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
