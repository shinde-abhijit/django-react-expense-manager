import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../Context/AuthContext';
import './css/Navbar.css';

const Navbar = () => {
  const { auth, logout } = useContext(AuthContext);

  return (
    <header>
      <div className="header-container">
        <div>
          <h1 className="text-xl capitalize font-semibold">OrganizeMe</h1>
        </div>
        <nav>
          <ul>
            {auth.token ? (
              <>
                {/* Authenticated Navigation */}
                <li>
                  Contact
                  <ul className="dropdown">
                    <li><Link to="/add-contact">Add</Link></li>
                    <li><Link to="/contact-list">List</Link></li>
                  </ul>
                </li>
                <li>
                  Expense
                  <ul className="dropdown">
                    <li><Link to="/add-expense">Add</Link></li>
                    <li><Link to="/expense-list">List</Link></li>
                  </ul>
                </li>
                <li>
                  Notes
                  <ul className="dropdown">
                    <li><Link to="/add-note">Add</Link></li>
                    <li><Link to="/">List</Link></li>
                  </ul>
                </li>
                <li>
                  Todos
                  <ul className="dropdown">
                    <li><Link to="/add-todo">Add</Link></li>
                    <li><Link to="/todo-list">List</Link></li>
                  </ul>
                </li>
                <li>
                  User
                  <ul className="dropdown">
                    <li><Link to="/user-profile">Profile</Link></li>
                    <li><Link to="/user-update">Update</Link></li>
                    <li><Link to="/user-delete">Delete</Link></li>
                    <li><button onClick={logout} className="logout-btn">Logout</button></li>
                  </ul>
                </li>
              </>
            ) : (
              <>
                {/* Unauthenticated Navigation */}
                <li>
                  User
                  <ul className="dropdown">
                    <li><Link to="/user-register">Register</Link></li>
                    <li><Link to="/user-login">Login</Link></li>
                  </ul>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
