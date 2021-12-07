import React from 'react';
import Navigation from '../../components/Navigation/Navigation';

const MainLayout = ({ children }) => (
  <div className="d-flex flex-column h-100">
    <Navigation />
    {children}
  </div>
);

export default MainLayout;
