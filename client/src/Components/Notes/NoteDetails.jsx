import React, { useState, useEffect } from 'react';
import api from '../../utils/axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
import DeleteNote from './DeleteNote';
import Loader from '../Loader';


const NoteDetails = () => {
  useEffect(() => {
    document.title = 'Note Details';
  }, []);
  
  const { slug } = useParams();
  const [note, setNote] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchNote = async () => {
    try {
      const res = await api.get(`/notes/${slug}/`);
      setNote(res.data);
    } catch {
      setError('Failed to load note');
    }
  };

  useEffect(() => {
    fetchNote();
  }, [slug]);

  if (error) return <p className="text-red-500 text-center mt-8">{error}</p>;
  if (!note) return <Loader />;  // Use loader here

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-3xl font-semibold mb-4 text-gray-800">{note.title}</h2>
      <p className="mb-2 text-sm text-gray-500 uppercase tracking-wide font-medium">
        Status: <span className={`font-semibold ${note.status === 'published' ? 'text-green-600' : 'text-yellow-600'}`}>{note.status}</span>
      </p>
      <p className="mb-6 text-gray-700 whitespace-pre-line">{note.description || 'No description provided.'}</p>

      <div className="flex flex-wrap gap-3">
        <Link 
          to="/notes"
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
        >
          ← Back to List
        </Link>

        <Link 
          to="/add-note" 
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          + Add Note
        </Link>

        <Link 
          to={`/note-update/${note.slug}`} 
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Edit
        </Link>

        <DeleteNote 
          slug={note.slug} 
          onDeleted={() => navigate('/notes')} 
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
        />
      </div>
    </div>
  );
};

export default NoteDetails;
