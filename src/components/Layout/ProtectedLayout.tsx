import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import NavBar from 'components/NavBar';
import AppBar from 'components/AppBar';
import { getToken } from '../../utils/localStorage';

function ProtectedLayout() {
  const token = getToken();
  const isLoggedIn = !!token;

  if (!isLoggedIn) {
    return <Navigate to="/sign-up" replace />;
  }

  return (
    <>
      <AppBar />
      <div className="pb-28">
        <Outlet />
      </div>
      <NavBar />
    </>
  );
}

export default ProtectedLayout;