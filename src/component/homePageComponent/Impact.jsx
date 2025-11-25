import React from 'react';
import { FiUsers, FiClock, FiSearch, FiTarget } from 'react-icons/fi';

const statsData = [
  {
    icon: FiTarget,
    value: '50+',
    label: 'Active Open Requests',
    color: 'text-error',
  },
  {
    icon: FiClock,
    value: '24/7',
    label: 'Urgent Request Monitoring',
    color: 'text-info',
  },
  {
    icon: FiSearch,
    value: '9,000+',
    label: 'Registered Seekers',
    color: 'text-primary',
  },
  {
    icon: FiUsers,
    value: '15 Min',
    label: 'Avg. Donor Match Time',
    color: 'text-success',
  },
];

export default function Impacts() {
  return (
    <section className="py-16 bg-base-100">
      <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
        Our Request Fulfillment Impact
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {statsData.map((stat, index) => (
          <div
            key={index}
            className="card bg-base-200 shadow-xl p-6 text-center transition duration-300 hover:shadow-2xl hover:scale-[1.03]"
          >
            <div className={`flex justify-center mb-4 text-5xl ${stat.color}`}>
              <stat.icon />
            </div>
            <p className="text-4xl font-extrabold mb-1 text-gray-900">
              {stat.value}
            </p>
            <p className="text-sm font-semibold uppercase text-gray-500">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
