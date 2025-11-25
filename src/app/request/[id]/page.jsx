import { getBloodRequestById } from '@/actions/requestActions';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  FiArrowLeft,
  FiHeart,
  FiMapPin,
  FiPhone,
  FiClock,
  FiDollarSign,
} from 'react-icons/fi';

const getPriorityBadgeClass = priority => {
  switch (priority) {
    case 'Critical':
      return 'badge-error';
    case 'High':
      return 'badge-warning';
    case 'Medium':
      return 'badge-info';
    default:
      return 'badge-neutral';
  }
};

export default async function RequestDetailsPage({ params }) {
  const { id } = await params;

  const request = await getBloodRequestById(id);

  if (!request) {
    return (
      <div>
        <h2>Not found</h2>
      </div>
    );
  }

  return (
    <div className="py-10 max-w-4xl mx-auto">
      <Link href="/requests" className="btn btn-ghost mb-8 text-lg">
        <FiArrowLeft /> Back to all requests
      </Link>

      <div className="card shadow-2xl bg-base-100 p-8 border-t-8 border-red-600">
        {/* Product Title / Blood Group */}
        <h1 className="text-5xl font-extrabold mb-2 text-red-600 flex items-center">
          <FiHeart className="mr-3" /> {request.bloodGroupNeeded} Blood Needed
        </h1>

        {/* Product Title / Sub-header */}
        <p className="text-2xl text-gray-700 mb-6 font-medium">
          Request from {request.hospitalName}
        </p>

        <div className="divider text-xl font-semibold text-gray-500">
          Request Details (Meta Info)
        </div>

        {/* Meta Info Grid (Task Requirement 4) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 text-lg mb-8">
          {/* Priority */}
          <p className="flex items-center">
            <FiClock className="mr-3 text-red-500" />
            <strong>Priority:</strong>
            <span
              className={`badge badge-lg ml-3 ${getPriorityBadgeClass(
                request.priority
              )} text-white`}
            >
              {request.priority}
            </span>
          </p>

          {/* Units Needed (Price/Meta) */}
          <p className="flex items-center">
            <FiDollarSign className="mr-3 text-warning" />
            <strong>Units Needed:</strong>
            <span className="font-extrabold text-2xl ml-2">
              {request.unitsNeeded}
            </span>{' '}
            Bags
          </p>

          {/* Contact */}
          <p className="flex items-center col-span-1 md:col-span-2">
            <FiPhone className="mr-3 text-success" />
            <strong>Emergency Contact:</strong>
            <span className="font-bold text-lg ml-2">
              {request.contactNumber}
            </span>
          </p>

          {/* Location */}
          <p className="flex items-center col-span-1 md:col-span-2">
            <FiMapPin className="mr-3 text-primary" />
            <strong>Location:</strong> {request.hospitalName} (Posted:{' '}
            {new Date(request.createdAt).toLocaleDateString()})
          </p>
        </div>

        <div className="divider text-xl font-semibold text-gray-500">
          Full Description (Details)
        </div>

        {/* Full Description (Task Requirement 4) */}
        <p className="text-gray-800 leading-relaxed text-lg bg-base-200 p-4 rounded-lg">
          {request.fullDescription ||
            'The full description is pending. However, given the critical nature, the key details and contact information are provided above. Please use the emergency contact number to verify the request and coordinate the donation process directly with the hospital staff.'}
        </p>

        <div className="card-actions justify-end mt-8">
          <a
            href={`tel:${request.contactNumber}`}
            className="btn btn-error btn-lg shadow-md"
          >
            Call Emergency Contact Now
          </a>
        </div>
      </div>
    </div>
  );
}
