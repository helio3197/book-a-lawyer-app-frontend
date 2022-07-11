import React from 'react';
import { Outlet } from 'react-router-dom';

const Layout = () => (
  <>
    <h1>(PLACEHOLDER)Section for navigation component</h1>
    <section>
      <Outlet />
    </section>
  </>
);

export default Layout;
