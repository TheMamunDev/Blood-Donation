// src/components/landing/ActionBanner.jsx
import React from 'react';
import Link from 'next/link';
import { FiHeart, FiZap } from 'react-icons/fi';

export default function ActionBanner() {
  return (
    <section className="py-16 bg-error rounded-xl shadow-2xl my-12 max-w-6xl mx-auto">
      <div className="text-center text-white p-6">
        <h2 className="text-5xl font-extrabold mb-3">
          Stop Waiting. Start Saving Lives.
        </h2>
        <p className="text-xl mb-8 font-light">
          Your one action today can be someone's miracle tomorrow. It only takes
          a minute to register.
        </p>

        <div className="flex justify-center space-x-4">
          <Link
            href="/register"
            className="btn btn-warning btn-lg shadow-lg hover:shadow-xl"
          >
            <FiHeart className="text-2xl mr-2" />
            Register as a Donor
          </Link>
          <Link
            href="/contact"
            className="btn btn-ghost btn-lg border-white text-white hover:bg-white hover:text-error"
          >
            <FiZap className="text-2xl mr-2" />
            Contact Support
          </Link>
        </div>
      </div>
    </section>
  );
}
