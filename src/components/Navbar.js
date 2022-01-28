import React from 'react';

import { useAuthContext } from '../Auth/AuthContext';

const Navbar = () => {
  const { logoutUser } = useAuthContext()
  return (
    <div>
      <h1>navbar component</h1>
      <button onClick={logoutUser}>Logout</button>
    </div>
  )
};

export default Navbar;
