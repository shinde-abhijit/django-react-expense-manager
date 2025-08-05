import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import NotesRoutes from './NotesRoutes';
import TodoRoutes from './TodoRoutes';
import ContactRoutes from './ContactRoutes';
import ExpenseRoutes from './ExpenseRoutes';
import UserRoutes from './UserRoutes';
import PrivateRoute from './PrivateRoute';

const Homepage = lazy(() => import('../pages/Homepage'));
const Login = lazy(() => import('../pages/Login'));
const Register = lazy(() => import('../pages/Register'));
const PageNotFound = lazy(() => import('../Components/PageNotFound'));

const AllRoutes = () => {
  return (
    <Suspense fallback={<div className="text-center p-10">Loading...</div>}>
      <Routes>
        <Route path="/" element={<PrivateRoute><Homepage /></PrivateRoute>} />

        {/* Include routes by rendering the function's output */}
        {NotesRoutes()}
        {TodoRoutes()}
        {ContactRoutes()}
        {UserRoutes()}
        {ExpenseRoutes()}

        {/* Public Routes */}
        <Route path="/user-login" element={<Login />} />
        <Route path="/user-register" element={<Register />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AllRoutes;
