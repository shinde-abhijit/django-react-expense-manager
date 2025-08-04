import React from 'react';
import { Routes, Route } from "react-router-dom";
import Login from '../pages/Login';
import Register from '../pages/Register';
import Homepage from '../pages/Homepage';
import PrivateRoute from './PrivateRoute';

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={
        <PrivateRoute>
          <Homepage />
        </PrivateRoute>
      } />
      <Route path="/user-login" element={<Login />} />
      <Route path="/user-register" element={<Register />} />
    </Routes>
  );
};

export default AllRoutes;
