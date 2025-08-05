import React from 'react';
import { Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import AddExpense from '../Components/Expenses/AddExpense';
import ExpenseList from '../Components/Expenses/ExpenseList';
import DeleteExpense from '../Components/Expenses/DeleteExpense';
import UpdateExpense from '../Components/Expenses/UpdateExpense';
import ExpenseDetails from '../Components/Expenses/ExpenseDetails';

const ContactRoutes = () => (
  <>
    <Route path="/add-expense" element={<PrivateRoute><AddExpense /></PrivateRoute>} />
    <Route path="/expense-list" element={<PrivateRoute><ExpenseList /></PrivateRoute>} />
    <Route path="/expense-details/:id" element={<PrivateRoute><ExpenseDetails /></PrivateRoute>} />
    <Route path="/expense-update/:id" element={<PrivateRoute><UpdateExpense /></PrivateRoute>} />
    <Route path="/expense-delete/:id" element={<PrivateRoute><DeleteExpense /></PrivateRoute>} />
  </>
);

export default ContactRoutes;
