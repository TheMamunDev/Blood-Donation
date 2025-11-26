import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import { FiArchive } from 'react-icons/fi';
import Link from 'next/link';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getMyBloodRequests } from '@/actions/requestActions';
import MyRequestedCard from '@/component/manage/MyRequestCard';
export default async function ManageRequestsPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }
  const requests = await getMyBloodRequests();

  return (
    <div className="py-10 max-w-7xl mx-auto">
      <h1 className="text-4xl font-extrabold mb-2 text-gray-800 flex items-center">
        <FiArchive className="mr-3 text-red-600" /> My Blood Requests
      </h1>
      <p className="text-lg text-gray-500 mb-8">
        Hello, {session.user.name || session.user.email}. Manage all your
        submitted blood requests and check their status.
      </p>

      {requests.length === 0 ? (
        <div className="alert alert-info shadow-lg">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="stroke-current flex-shrink-0 w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <span>
              You have no active or fulfilled blood requests. Start by
              submitting one!
            </span>
          </div>
          <div className="flex-none">
            <Link
              href="/dashboard/add-request"
              className="btn btn-sm btn-primary"
            >
              Submit Request
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {requests.map(request => (
            <MyRequestedCard key={request._id} request={request} />
          ))}
        </div>
      )}
    </div>
  );
}
