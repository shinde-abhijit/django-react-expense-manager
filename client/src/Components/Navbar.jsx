import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../Context/AuthContext';

const Navbar = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // or sessionStorage
    setAuth({ user: null, token: null });
    navigate('/user-login');
  };

  return (
    <nav className="bg-white shadow-md px-4 py-3">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold text-gray-800">Notes App</div>
        <ul className="flex space-x-6 text-gray-700 font-medium">
          {auth?.token ? (
            <>
              <li className="hover:text-blue-500 cursor-pointer">
                <Link to={'/add-note'}>Add</Link>
              </li>
              <li><Link to={"/"} className="hover:text-blue-500">Notes</Link></li>
              <li className="hover:text-blue-500 cursor-pointer">
                <Link to={'/add-todo'}>Add</Link>
              </li>
              <li className="hover:text-blue-500 cursor-pointer">
                <Link to={'/todo-list'}>Todos</Link>
              </li>
              <li className="hover:text-blue-500 cursor-pointer" onClick={handleLogout}>
                Logout
              </li>
            </>
          ) : (
            <>
              <li><Link to={"/user-login"} className="hover:text-blue-500">Login</Link></li>
              <li><Link to={"/user-register"} className="hover:text-blue-500">Register</Link></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
