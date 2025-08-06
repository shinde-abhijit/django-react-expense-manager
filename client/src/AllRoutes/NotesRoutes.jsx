import React from 'react';
import { Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
const AddNote = React.lazy(() => import('../Components/Notes/AddNote'));
const NoteList = React.lazy(() => import('../Components/Notes/NoteList'));
const NoteDetails = React.lazy(() => import('../Components/Notes/NoteDetails'));
const UpdateNote = React.lazy(() => import('../Components/Notes/UpdateNote'));
const DeleteNote = React.lazy(() => import('../Components/Notes/DeleteNote'));

const NotesRoutes = () => (
  <>
    <Route path="/add-note" element={<PrivateRoute><AddNote /></PrivateRoute>} />
    <Route path="/note-list" element={<PrivateRoute><NoteList /></PrivateRoute>} />
    <Route path="/note-details/:slug" element={<PrivateRoute><NoteDetails /></PrivateRoute>} />
    <Route path="/note-update/:slug" element={<PrivateRoute><UpdateNote /></PrivateRoute>} />
    <Route path="/note-delete/:slug" element={<PrivateRoute><DeleteNote /></PrivateRoute>} />
  </>
);

export default NotesRoutes;
