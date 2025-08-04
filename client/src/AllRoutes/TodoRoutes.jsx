import React from 'react';
import { Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import AddTodo from '../Components/Todos/AddTodo';
import DeleteTodo from '../Components/Todos/DeleteTodo';
import UpdateTodo from '../Components/Todos/UpdateNote';
import TodoList from '../Components/Todos/TodoList';
import TodoDetails from '../Components/Todos/TodoDetails';

const TodoRoutes = () => (
  <>
    <Route path="/add-todo" element={<PrivateRoute><AddTodo /></PrivateRoute>} />
    <Route path="/todo-details/:slug" element={<PrivateRoute><TodoDetails /></PrivateRoute>} />
    <Route path="/todo-list" element={<PrivateRoute><TodoList /></PrivateRoute>} />
    <Route path="/todo-update/:slug" element={<PrivateRoute><UpdateTodo /></PrivateRoute>} />
    <Route path="/todo-delete/:slug" element={<PrivateRoute><DeleteTodo /></PrivateRoute>} />
  </>
);

export default TodoRoutes;
