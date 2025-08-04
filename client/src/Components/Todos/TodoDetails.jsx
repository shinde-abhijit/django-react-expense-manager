import React, { useState, useEffect } from 'react';
import api from '../../utils/axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
import DeleteTodo from './DeleteTodo';
import Loader from '../Loader';


const TodoDetails = () => {
  useEffect(() => {
    document.title = 'Todo Details';
  }, []);
  
  const { slug } = useParams();
  const [todo, setTodo] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchTodo = async () => {
    try {
      const res = await api.get(`/todos/${slug}/`);
      setTodo(res.data);
    } catch {
      setError('Failed to load todo.');
    }
  };

  useEffect(() => {
    fetchTodo();
  }, [slug]);

  if (error) return <p className="text-red-500 text-center mt-8">{error}</p>;
  if (!todo) return <Loader />;  // Use loader here

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-3xl font-semibold mb-4 text-gray-800">{todo.title}</h2>
      <p className="mb-2 text-sm text-gray-500 uppercase tracking-wide font-medium">
        Status: <span className={`font-semibold ${todo.status === 'published' ? 'text-green-600' : 'text-yellow-600'}`}>{todo.status}</span>
      </p>
      <p className="mb-6 text-gray-700 whitespace-pre-line">{todo.description || 'No description provided.'}</p>

      <div className="flex flex-wrap gap-3">
        <Link 
          to="/todo-list"
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
        >
          ← Back to List
        </Link>

        <Link 
          to="/add-todo" 
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          + Add Todo
        </Link>

        <Link 
          to={`/todo-update/${todo.slug}`} 
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Edit
        </Link>

        <DeleteTodo 
          slug={todo.slug} 
          onDeleted={() => navigate('/todos')} 
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
        />
      </div>
    </div>
  );
};

export default TodoDetails;
