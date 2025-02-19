import React from 'react';
import { Outlet } from 'react-router-dom';
import SearchBar from './Header';

const Layout = () => {
  return (
    <div>
      <SearchBar />
      <main className='overflow-hidden'>
        <Outlet/>
      </main>
    </div>
  );
};

export default Layout;