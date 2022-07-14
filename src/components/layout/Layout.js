import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Notice from './Notice';

const Layout = () => {
  const location = useLocation();
  const [notice, setNotice] = useState(null);

  useEffect(() => {
    if (location.state?.notice) {
      setNotice(location.state.notice);
    } else if (notice) {
      setNotice(null);
    }
  }, [location]);

  return (
    <div className="d-flex h-100 position-relative">
      {notice && <Notice message={notice} />}
      <Sidebar />
      <main className="flex-grow-1">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
