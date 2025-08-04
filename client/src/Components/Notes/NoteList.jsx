import React, { useEffect, useState } from 'react';
import api from '../../utils/axios';
import { Link } from 'react-router-dom';
import Loader from '../Loader';  // Adjust path as needed

const NotesList = () => {
  useEffect(() => {
    document.title = 'Note List';
  }, []);

  const [notes, setNotes] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);  // New loading state

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get('/notes/');
        setNotes(res.data);
      } catch (err) {
        setError('Failed to load notes');
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  if (loading) return <Loader />;  // Use loader while loading

  if (error)
    return (
      <div className="max-w-3xl mx-auto mt-10 p-4 bg-red-100 text-red-700 rounded">
        {error}
      </div>
    );

  if (notes.length === 0)
    return (
      <div className="max-w-3xl mx-auto mt-10 p-4 text-gray-700">
        No notes found.
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold text-gray-800">Your Notes</h2>
        <Link
          to="/add-note"
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
        >
          Add New Note
        </Link>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {notes.map(note => (
          <div
            key={note.id}
            className="bg-white rounded-lg shadow-md p-5 hover:shadow-xl transition cursor-pointer"
          >
            <Link to={`/note-details/${note.slug}`}>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-indigo-600">
                {note.title.length > 50 ? note.title.slice(0, 50) + '...' : note.title}
              </h3>
            </Link>
            <p className="text-sm text-gray-500 mb-4">
              Status: <span className="capitalize">{note.status}</span>
            </p>
            <div className="flex justify-between items-center">
              <Link
                to={`/note-update/${note.slug}`}
                className="text-indigo-600 hover:underline text-sm"
              >
                Edit
              </Link>
              <span className="text-xs text-gray-400">
                Updated: {new Date(note.updated_at).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotesList;
