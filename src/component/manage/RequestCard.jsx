import Link from 'next/link';
import { FiMapPin, FiClock, FiHeart, FiEye } from 'react-icons/fi';
import { MdBloodtype } from 'react-icons/md';

const getBadgeClass = priority => {
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

export default function RequestCard({ request }) {
  const shortDescription = `${
    request.hospitalName
  }. Contact: ${request.contactNumber.substring(0, 5)}...`;

  return (
    <div className="card bg-base-100 shadow-xl border border-gray-100 hover:shadow-2xl transition duration-300 transform hover:-translate-y-1">
      <div className="card-body p-6">
        <div className="text-6xl text-red-600 mb-3 flex items-center">
          <MdBloodtype />
        </div>

        <h2 className="card-title text-3xl font-extrabold text-red-600 mb-2">
          {request.bloodGroupNeeded}
          <div
            className={`badge ${getBadgeClass(request.priority)} ml-3 text-sm`}
          >
            {request.priority} Priority
          </div>
        </h2>

        <p className="text-gray-600 h-10 overflow-hidden text-ellipsis">
          {shortDescription}
        </p>

        <div className="space-y-1 mt-3 text-sm text-gray-500">
          <p className="flex items-center">
            <FiMapPin className="mr-2 text-primary" /> {request.hospitalName}
          </p>
          <p className="flex items-center">
            <FiHeart className="mr-2 text-warning" /> Units Needed:{' '}
            {request.unitsNeeded}
          </p>
          <p className="flex items-center">
            <FiClock className="mr-2" /> Posted:{' '}
            {new Date(request.createdAt).toLocaleDateString()}
          </p>
        </div>

        <div className="card-actions justify-end mt-4">
          <Link
            href={`/list/${request._id}`}
            className="btn btn-sm btn-outline btn-error"
          >
            <FiEye /> View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
