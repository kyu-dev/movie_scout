import React from 'react';
import { Outlet } from 'react-router-dom';
import SearchBar from './SearchBar';

const Layout = () => {
  return (
    <div>
      <SearchBar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;