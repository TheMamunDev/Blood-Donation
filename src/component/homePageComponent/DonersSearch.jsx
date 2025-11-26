'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiCalendar, FiSearch } from 'react-icons/fi';

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
const districts = ['Dhaka', 'Chattogram', 'Sylhet', 'Rajshahi', 'Khulna'];
const donorTypes = ['All', 'Donor', 'Seeker'];

export default function DonorSearchForm() {
  const [formData, setFormData] = useState({
    bloodGroup: '',
    district: '',
    lastDonationDate: '',
    donorType: 'All',
  });
  const router = useRouter();

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (formData.bloodGroup) {
      params.append('bloodGroup', formData.bloodGroup);
    }
    if (formData.district) {
      params.append('district', formData.district);
    }
    if (formData.lastDonationDate) {
      params.append('lastDonationDate', formData.lastDonationDate);
    }
    if (formData.donorType && formData.donorType !== 'All') {
      params.append('donorType', formData.donorType);
    }

    router.push(`/requests?${params.toString()}`);
  };

  return (
    <section className="bg-white py-12 px-6 rounded-lg shadow-2xl my-10 max-w-6xl mx-auto">
      <h2 className="text-2xl md:text-4xl font-bold text-center mb-8 text-gray-800">
        Search Blood Requests
      </h2>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row gap-4 items-center justify-center"
      >
        <div className="form-control w-full md:w-1/5">
          <label className="label hidden md:block">
            <span className="label-text">Blood Group</span>
          </label>
          <select
            name="bloodGroup"
            value={formData.bloodGroup}
            onChange={handleChange}
            className="select select-bordered w-full"
          >
            <option value="">Select Blood Group</option>
            {bloodGroups.map(group => (
              <option key={group} value={group}>
                {group}
              </option>
            ))}
          </select>
        </div>

        <div className="form-control w-full md:w-1/5">
          <label className="label hidden md:block">
            <span className="label-text">District</span>
          </label>
          <select
            name="district"
            value={formData.district}
            onChange={handleChange}
            className="select select-bordered w-full"
          >
            <option value="">Select District</option>
            {districts.map(district => (
              <option key={district} value={district}>
                {district}
              </option>
            ))}
          </select>
        </div>
        <div className="form-control w-full md:w-1/5 relative">
          <label className="label hidden md:block">
            <span className="label-text">Date of Blood Request</span>
          </label>
          <input
            type="date"
            name="lastDonationDate"
            value={formData.lastDonationDate}
            onChange={handleChange}
            placeholder="mm / dd / yyyy"
            className="input input-bordered w-full pr-10"
          />
          <FiCalendar className="absolute right-3 top-[50%] transform -translate-y-1/2 text-gray-400 pointer-events-none hidden md:block" />
        </div>

        <div className="form-control w-full md:w-auto mt-4 md:mt-0">
          <button
            type="submit"
            className="btn btn-error btn-lg w-full md:w-auto"
          >
            <FiSearch className="text-xl mr-2 md:mr-0" />{' '}
            <span className="md:hidden lg:inline">Search</span>
          </button>
        </div>
      </form>
    </section>
  );
}
