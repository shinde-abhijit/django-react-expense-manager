import React from 'react';
import { Routes, Route } from "react-router-dom";
import Login from '../pages/Login';
import Register from '../pages/Register';
import Homepage from '../pages/Homepage';
import PrivateRoute from './PrivateRoute';
import DeleteNote from '../Components/Notes/DeleteNote';
import UpdateNote from '../Components/Notes/UpdateNote';
import NoteDetails from '../Components/Notes/NoteDetails';
import AddNote from '../Components/Notes/AddNote';
import NotesList from '../Components/Notes/NoteList';
import PageNotFound from '../Components/PageNotFound';

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={
        <PrivateRoute>
          <Homepage />
        </PrivateRoute>
      } />

      <Route path="/add-note" element={
        <PrivateRoute>
          <AddNote />
        </PrivateRoute>
      } />

      <Route path="/note-list" element={
        <PrivateRoute>
          <NotesList />
        </PrivateRoute>
      } />

      <Route path="/note-details/:slug" element={
        <PrivateRoute>
          <NoteDetails />
        </PrivateRoute>
      } />

      <Route path="/note-update/:slug" element={
        <PrivateRoute>
          <UpdateNote />
        </PrivateRoute>
      } />
      
      <Route path="/note-delete/:slug" element={
        <PrivateRoute>
          <DeleteNote />
        </PrivateRoute>
      } />

      <Route path="/user-login" element={<Login />} />
      <Route path="/user-register" element={<Register />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default AllRoutes;
