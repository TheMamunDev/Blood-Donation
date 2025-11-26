// src/components/landing/ActionBanner.jsx
import React from 'react';
import Link from 'next/link';
import { FiPlus, FiPhoneCall } from 'react-icons/fi';

export default function ActionBanner() {
  return (
    <section className="py-16 bg-error rounded-xl shadow-2xl my-12 max-w-7xl mx-auto">
      <div className="text-center text-white p-6">
        <h2 className="text-5xl font-extrabold mb-3">
          Need Blood Urgently? Start Here.
        </h2>
        <p className="text-xl mb-8 font-light">
          Submit your request now to get instant alerts out to our network, or
          call our emergency line.
        </p>

        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
          <Link
            href="/dashboard/add-request"
            className="btn btn-warning btn-lg shadow-lg hover:shadow-xl"
          >
            <FiPlus className="text-2xl mr-2" />
            Submit New Request
          </Link>

          <button className="btn btn-ghost btn-lg border-white text-white hover:bg-white hover:text-error">
            <FiPhoneCall className="text-2xl" />
            Call Emergency Hotline
          </button>
        </div>
      </div>
    </section>
  );
}
