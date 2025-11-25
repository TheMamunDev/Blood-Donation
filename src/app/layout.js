
import './globals.css';
import Footer from '@/component/ui/Footer';
import connectDB from '@/lib/db';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './Provider';
import Navbar from '@/component/ui/Navbar';

export const metadata = {
  title: 'Blood Donation',
  description: 'Donate your donation',
};

export default async function RootLayout({ children }) {
  const conn = await connectDB();
  console.log(conn);
  return (
    <html lang="en">
      <body className={` antialiased max-w-[1280px] mx-auto`}>
        <AuthProvider>
          <Navbar></Navbar>
          {children}
          <Footer></Footer>
          <ToastContainer></ToastContainer>
        </AuthProvider>
      </body>
    </html>
  );
}
