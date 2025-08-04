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
import PageNotFound from '../Components/PageNotFound';
import AddTodo from '../Components/Todos/AddTodo';
import TodoDetails from '../Components/Todos/TodoDetails';
import UpdateTodo from '../Components/Todos/UpdateNote';
import DeleteTodo from '../Components/Todos/DeleteTodo';
import TodoList from '../Components/Todos/TodoList';

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={
        <PrivateRoute>
          <Homepage />
        </PrivateRoute>
      } />

        {/* Notes Routes */}
      <Route path="/add-note" element={
        <PrivateRoute>
          <AddNote />
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

      {/* Todo Routes */}
      <Route path="/add-todo" element={
        <PrivateRoute>
          <AddTodo />
        </PrivateRoute>
      } />

      <Route path="/todo-details/:slug" element={
        <PrivateRoute>
          <TodoDetails />
        </PrivateRoute>
      } />

      <Route path="/todo-list" element={
        <PrivateRoute>
          <TodoList />
        </PrivateRoute>
      } />

      <Route path="/todo-update/:slug" element={
        <PrivateRoute>
          <UpdateTodo />
        </PrivateRoute>
      } />
      
      <Route path="/todo-delete/:slug" element={
        <PrivateRoute>
          <DeleteTodo />
        </PrivateRoute>
      } />

      <Route path="/user-login" element={<Login />} />
      <Route path="/user-register" element={<Register />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default AllRoutes;
