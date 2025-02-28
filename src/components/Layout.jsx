import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';

const Layout = () => {
  return (
    <div>
      <Header/>
      <main className='overflow-hidden'>
        <Outlet/>
      </main>
    </div>
  );
};

export default Layout;
