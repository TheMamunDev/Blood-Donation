'use client';
import { AuthProvider } from '@/app/Provider';
import Navbar from '../ui/Navbar';
import Footer from '../ui/Footer';
import { ToastContainer } from 'react-toastify';

export default function LayoutProvider({ children }) {
  return (
    <body className="max-w-7xl mx-auto">
      <AuthProvider>
        <Navbar />
        {children}
        <Footer />
        <ToastContainer />
      </AuthProvider>
    </body>
  );
}
