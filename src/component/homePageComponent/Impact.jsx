// src/components/landing/ImpactStats.jsx
import React from 'react';
import { FiUsers, FiHeart, FiDroplet, FiSend } from 'react-icons/fi';

const statsData = [
  {
    icon: FiUsers,
    value: '15,000+',
    label: 'Registered Donors',
    color: 'text-primary',
  },
  {
    icon: FiHeart,
    value: '98%',
    label: 'Successful Match Rate',
    color: 'text-success',
  },
  {
    icon: FiDroplet,
    value: '5,200+',
    label: 'Lives Supported Monthly',
    color: 'text-error',
  },
  {
    icon: FiSend,
    value: '5 Min',
    label: 'Average Response Time',
    color: 'text-info',
  },
];

export default function Impacts() {
  return (
    <section className="py-16 bg-base-100">
      <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
        Our Impact at a Glance
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
