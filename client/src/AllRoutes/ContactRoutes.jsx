import React from 'react';
import { Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
const AddContact = React.lazy(() => import('../Components/Contacts/AddContact'));
const ContactDetails = React.lazy(() => import('../Components/Contacts/ContactDetails'));
const ContactList = React.lazy(() => import('../Components/Contacts/ContactList'));
const UpdateContact = React.lazy(() => import('../Components/Contacts/UpdateContact'));
const ContactDelete = React.lazy(() => import('../Components/Contacts/ContactDelete'));

const ContactRoutes = () => (
  <>
    <Route path="/add-contact" element={<PrivateRoute><AddContact /></PrivateRoute>} />
    <Route path="/contact-details/:id" element={<PrivateRoute><ContactDetails /></PrivateRoute>} />
    <Route path="/contact-list" element={<PrivateRoute><ContactList /></PrivateRoute>} />
    <Route path="/contact-update/:id" element={<PrivateRoute><UpdateContact /></PrivateRoute>} />
    <Route path="/contact-delete/:id" element={<PrivateRoute><ContactDelete /></PrivateRoute>} />
  </>
);

export default ContactRoutes;
