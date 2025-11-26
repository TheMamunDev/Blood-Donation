'use client';
import { AuthProvider } from '@/app/Provider';
import Navbar from '../ui/Navbar';
import Footer from '../ui/Footer';
import { ToastContainer } from 'react-toastify';
import { Toaster } from 'react-hot-toast';

export default function LayoutProvider({ children }) {
  return (
    <div>
      <AuthProvider>
        <Navbar />
        <div className="max-w-11/12 mx-auto">{children}</div>

        <Footer />
        <Toaster position="top-right" />
      </AuthProvider>
    </div>
  );
}
