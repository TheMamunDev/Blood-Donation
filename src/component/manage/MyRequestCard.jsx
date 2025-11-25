'use client';

import Link from 'next/link';
import { FiCalendar, FiMapPin, FiTrash2, FiEye } from 'react-icons/fi';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';

const getBadgeClass = priority => {
  switch (priority) {
    case 'Critical':
      return 'badge-error';
    case 'High':
      return 'badge-warning';
    case 'Medium':
      return 'badge-info';
  }
};

export default function MyRequestedCard({ request }) {
  const router = useRouter();
  const handleDelete = async () => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this request!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      const deleteResult = {
        success: true,
        message: 'Request successfully deleted (Simulated).',
      };

      if (deleteResult.success) {
        Swal.fire('Deleted!', deleteResult.message, 'success');
        router.refresh();
      } else {
        toast.error(deleteResult.message);
      }
    }
  };

  return (
    <div className="card bg-white shadow-xl hover:shadow-2xl transition duration-300 transform hover:scale-[1.01] border-l-4 border-red-500">
      <div className="card-body p-6">
        <div className="flex justify-between items-start">
          <h2 className="card-title text-3xl font-extrabold text-red-600">
            {request.bloodGroupNeeded} ({request.unitsNeeded} Units)
          </h2>
          <div
            className={`badge ${getBadgeClass(request.priority)} text-white`}
          >
            {request.priority} Priority
          </div>
        </div>

        <p className="flex items-center text-gray-600 mt-2">
          <FiMapPin className="mr-2 text-primary" /> {request.hospitalName}
        </p>
        <p className="flex items-center text-sm text-gray-500">
          <FiCalendar className="mr-2" /> Posted:{' '}
          {new Date(request.createdAt).toLocaleDateString()}
        </p>

        <div className="divider my-1"></div>

        <div className="card-actions justify-end space-x-2">
          <Link
            href={`/request/${request._id}`}
            className="btn btn-sm btn-primary"
          >
            <FiEye /> View
          </Link>
          <button
            onClick={handleDelete}
            className="btn btn-sm btn-error btn-outline"
          >
            <FiTrash2 /> Delete
          </button>
        </div>
      </div>
    </div>
  );
}
