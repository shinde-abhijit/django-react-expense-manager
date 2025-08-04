import React from 'react';
import { Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
const UserProfile = React.lazy(() => import('../Components/Users/UserProfile'));
const UserUpdate = React.lazy(() => import('../Components/Users/UserUpdate'));
const UserDelete = React.lazy(() => import('../Components/Users/UserDelete'));

const UserRoutes = () => (
  <>
    <Route path="/user-profile" element={<PrivateRoute><UserProfile /></PrivateRoute>} />
    <Route path="/user-update" element={<PrivateRoute><UserUpdate /></PrivateRoute>} />
    <Route path="/user-delete" element={<PrivateRoute><UserDelete /></PrivateRoute>} />
  </>
);

export default UserRoutes;
