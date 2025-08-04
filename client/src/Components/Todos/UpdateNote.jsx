import React, { useState, useEffect } from 'react';
import api from '../../utils/axios';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateTodo = () => {
  useEffect(() => {
    document.title = 'Update Todo';
  }, []);

  const { slug } = useParams();
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('draft');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/todos/${slug}/`)
      .then(res => {
        setTitle(res.data.title);
        setStatus(res.data.status);
        setDescription(res.data.description);
      })
      .catch(() => setError('Failed to load todo'));
  }, [slug]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/todos/${slug}/`, { title, status, description });
      navigate('/todo-list');
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to update todo');
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center uppercase">Update Todo</h2>

      {error && (
        <div className="bg-red-100 text-red-700 px-4 py-3 rounded mb-4" role="alert">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
            minLength={3}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter todo title"
          />
        </div>

        <div>
          <label htmlFor="status" className="block text-gray-700 font-medium mb-2">
            Status
          </label>
          <select
            id="status"
            value={status}
            onChange={e => setStatus(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>

        <div>
          <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            rows={5}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter todo description"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-md hover:bg-indigo-700 transition duration-300"
        >
          Update Todo
        </button>
      </form>
    </div>
  );
};

export default UpdateTodo;
