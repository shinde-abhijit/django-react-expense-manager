import React, { useEffect } from 'react';
import api from '../../utils/axios';
import { useNavigate } from 'react-router-dom';

const DeleteTodo = ({ slug }) => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Delete Note';
  }, []);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      try {
        await api.delete(`/notes/${slug}/`);
        navigate('/note-list'); // Redirect after delete
      } catch {
        alert('Failed to delete note.');
      }
    }
  };

  return (
    <button 
      onClick={handleDelete} 
      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
    >
      Delete
    </button>
  );
};

export default DeleteTodo;
