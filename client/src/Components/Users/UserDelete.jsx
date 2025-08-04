import React, { useState, useContext } from 'react';
import api from '../../utils/axios';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../Context/AuthContext';

const UserDelete = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await api.delete('/user-profile/delete/', {
        data: { password },
      });
      logout(); // Log out after deletion
      navigate('/'); // Optional: redirect to homepage
    } catch (err) {
      setError(err.response?.data?.error || 'Account deletion failed.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4 text-center text-red-600">Delete Your Account</h2>
      <form onSubmit={handleDelete}>
        <label className="block mb-2 font-medium">Confirm Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 border rounded mb-4"
          placeholder="Enter password"
          required
        />
        <button
          type="submit"
          className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
        >
          Confirm Delete
        </button>
        {error && <div className="text-red-500 mt-3">{error}</div>}
      </form>
    </div>
  );
};

export default UserDelete;
