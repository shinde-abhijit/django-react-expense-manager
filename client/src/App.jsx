import React, { useContext, useEffect } from 'react';
import Login from './pages/Login';
import Register from './pages/Register';
import AuthContext from './Context/AuthContext';
import Navbar from './Components/Navbar'
import AllRoutes from './AllRoutes/AllRoutes';
import { Toaster } from 'react-hot-toast'
import Loader from './Components/Loader';



const App = () => {
  const { auth, logout } = useContext(AuthContext);

  // useEffect(() => {
  //   console.log('Token:', auth.token); 
  //   console.log('User:', auth.user);
  // }, [auth]);

  return (
    <>
      <Toaster />    
      <Navbar />
      <AllRoutes />
    </>
  );
};

export default App;
