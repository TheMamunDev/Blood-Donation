import ProtectedRoute from '@/ProtectedRoute';
import React from 'react';

const DashboardLayout = ({ children }) => {
  return <ProtectedRoute>{children}</ProtectedRoute>;
};

export default DashboardLayout;
