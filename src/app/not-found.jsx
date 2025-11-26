// app/not-found.js

import Link from 'next/link';
import { FiAlertTriangle, FiHome } from 'react-icons/fi';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] py-16 text-center bg-base-100">
      <div className="card w-full max-w-lg shadow-xl bg-white p-10 border-t-8 border-error">
        <FiAlertTriangle className="text-8xl text-error mx-auto mb-6" />

        <h1 className="text-5xl font-extrabold mb-4 text-gray-800">
          404 - Page Not Found
        </h1>

        <p className="text-xl text-gray-600 mb-8">
          Oops! The urgent resource or page you requested could not be located
          on the **Blood Request Hub**.
        </p>

        <Link href="/" className="btn btn-primary btn-lg">
          <FiHome className="mr-2" />
          Return to Homepage
        </Link>
      </div>
    </div>
  );
}
