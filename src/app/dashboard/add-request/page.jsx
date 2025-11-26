'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { FiPlusCircle, FiHeart, FiMapPin, FiPhone } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { createBloodRequest } from '@/actions/requestActions';

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
const priorities = ['Low', 'Medium', 'High', 'Critical'];

export default function AddRequestForm() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleSubmit = async e => {
    e.preventDefault();

    const formData = {
      bloodGroupNeeded: e.target.bloodGroupNeeded.value,
      unitsNeeded: e.target.unitsNeeded.value,
      hospitalName: e.target.hospitalName.value,
      contactNumber: e.target.contactNumber.value,
      priority: e.target.priority.value,
    };
    startTransition(async () => {
      const result = await createBloodRequest(formData);

      if (result.success) {
        toast.success(result.message);
        router.push(`/request/${result.requestId}`);
      } else {
        toast.error(result.message);
      }
    });
  };

  return (
    <div className="card w-full max-w-2xl mx-auto shadow-xl bg-base-100 mt-8">
      <form onSubmit={handleSubmit} className="card-body">
        <h2 className="card-title text-3xl mb-6 text-red-600">
          <FiPlusCircle className="mr-2" /> Submit New Blood Request
        </h2>

        <div className="form-control fieldset">
          <label className="label">
            <span className="label-text flex items-center">
              <FiHeart className="mr-2" />
              Blood Group Needed
            </span>
          </label>
          <select
            name="bloodGroupNeeded"
            className="select select-bordered w-full"
            required
          >
            <option value="">Select Required Blood Group</option>
            {bloodGroups.map(group => (
              <option key={group} value={group}>
                {group}
              </option>
            ))}
          </select>
        </div>
        <div className="form-control fieldset">
          <label className="label">
            <span className="label-text">Units Needed (Bags)</span>
          </label>
          <input
            type="number"
            name="unitsNeeded"
            placeholder="e.g., 2"
            min="1"
            className="input input-bordered w-full"
            required
          />
        </div>

        <div className="form-control fieldset">
          <label className="label">
            <span className="label-text">Priority Level</span>
          </label>
          <select
            name="priority"
            className="select w-full select-bordered"
            required
          >
            {priorities.map(p => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>

        <div className="form-control fieldset">
          <label className="label">
            <span className="label-text flex items-center">
              <FiMapPin className="mr-2" />
              Hospital Name / Location
            </span>
          </label>
          <input
            type="text"
            name="hospitalName"
            placeholder="e.g., City Trauma Center, Dhaka"
            className="input input-bordered w-full"
            required
          />
        </div>

        <div className="form-control fieldset">
          <label className="label">
            <span className="label-text flex items-center">
              <FiPhone className="mr-2" />
              Emergency Contact
            </span>
          </label>
          <input
            type="tel"
            name="contactNumber"
            placeholder="e.g., 01XXXXXXXXX"
            className="input input-bordered w-full"
            required
          />
        </div>

        <div className="form-control mt-6">
          <button
            type="submit"
            className="btn btn-error btn-lg"
            disabled={isPending}
          >
            {isPending ? (
              <span className="loading loading-spinner"></span>
            ) : (
              'Submit Request'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
