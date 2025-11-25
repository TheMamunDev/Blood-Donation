import React from 'react';
import Link from 'next/link';
import { FiPlus, FiSearch } from 'react-icons/fi';

export default function Hero() {
  return (
    <div
      className="hero min-h-[70vh] rounded-xl shadow-xl overflow-hidden"
      style={{
        backgroundImage: "url('/images/bloodd.jpg')",
      }}
    >
      <div className="hero-overlay bg-black opacity-60"></div>
      <div className="hero-content text-center text-neutral-content py-16">
        <div className="max-w-4xl">
          <h1 className="text-6xl font-extrabold mb-4 leading-tight text-white drop-shadow-lg">
            Be a Lifesaver. Donate Blood Today.
          </h1>
          <p className="mb-8 text-xl font-light text-gray-200 drop-shadow-md">
            The LifeStream Donor Network connects seekers with donors instantly.
            Every second counts—your simple registration can make the difference
            between life and death.
          </p>

          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link
              href="/register"
              className="btn btn-error btn-lg shadow-xl hover:shadow-2xl transition duration-300 transform hover:scale-[1.02]"
            >
              <FiPlus className="text-2xl mr-2" />
              Join Our Donor Network
            </Link>
            <Link
              href="/list"
              className="btn btn-outline btn-lg text-white border-white hover:bg-white hover:text-red-600 transition duration-300"
            >
              <FiSearch className="text-2xl mr-2" />
              Find Urgent Requests
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
