// src/components/landing/FeaturedRequests.jsx
import React from 'react';
import Link from 'next/link';
import { FiMapPin, FiClock, FiHeart, FiArrowRight } from 'react-icons/fi';

// Dummy Data to be replaced by Express API fetch
const dummyRequests = [
  {
    id: 1,
    bloodGroup: 'O+',
    location: 'Dhaka Central',
    urgency: 'High',
    hospital: 'City General Hospital',
    time: '2h ago',
  },
  {
    id: 2,
    bloodGroup: 'A-',
    location: 'Chattogram South',
    urgency: 'Critical',
    hospital: 'Apex Clinic',
    time: '5h ago',
  },
  {
    id: 3,
    bloodGroup: 'B+',
    location: 'Sylhet North',
    urgency: 'Medium',
    hospital: 'Regional Trauma Center',
    time: '1d ago',
  },
];

export default function FeaturedReq() {
  return (
    <section className="py-16 bg-white">
      <h2 className="text-4xl font-bold text-center mb-4 text-gray-800">
        Urgent Blood Requests Near You
      </h2>
      <p className="text-lg text-center mb-12 text-gray-500">
        These patients need immediate assistance. Click to view details and
        help.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {dummyRequests.map(request => (
          <Link
            key={request.id}
            href={`/list/${request.id}`}
            className="card bg-base-100 border border-gray-200 shadow-lg hover:shadow-xl hover:border-red-400 transition duration-300 transform hover:-translate-y-1 group"
          >
            <div className="card-body p-6">
              <span
                className={`badge badge-lg mb-2 ${
                  request.urgency === 'Critical'
                    ? 'badge-error'
                    : 'badge-warning'
                }`}
              >
                {request.urgency}
              </span>

              <h3 className="card-title text-3xl font-extrabold text-red-600 mb-2">
                {request.bloodGroup} Needed
              </h3>

              <div className="space-y-2 text-gray-600">
                <p className="flex items-center">
                  <FiMapPin className="mr-2 text-primary" /> {request.location}{' '}
                  ({request.hospital})
                </p>
                <p className="flex items-center">
                  <FiClock className="mr-2 text-info" /> Posted: {request.time}
                </p>
              </div>

              <div className="card-actions justify-end mt-4">
                <button className="btn btn-sm btn-outline btn-error group-hover:bg-error group-hover:text-white">
                  View Details <FiArrowRight />
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
