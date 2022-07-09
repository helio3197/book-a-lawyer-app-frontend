import React from 'react';
import { Outlet } from 'react-router-dom';

const Layout = () => (
  <>
    <h1>Section for navigation</h1>
    <Outlet />
  </>
);

export default Layout;
