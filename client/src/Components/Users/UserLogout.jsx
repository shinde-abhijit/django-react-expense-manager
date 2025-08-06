import React from 'react';
import { useNavigate } from 'react-router-dom';

const UserLogout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear token/session storage/localStorage (based on your app)
    localStorage.removeItem('token'); // adjust if you're using a different key
    // Redirect to login or home
    navigate('/login');
  };

  const handleCancel = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div className="container mt-5 text-center">
      <h2>Confirm Logout</h2>
      <p>Are you sure you want to logout?</p>
      <button onClick={handleLogout} className="btn btn-danger m-2">Logout</button>
      <button onClick={handleCancel} className="btn btn-secondary m-2">Cancel</button>
    </div>
  );
};

export default UserLogout;
