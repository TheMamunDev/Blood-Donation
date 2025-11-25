import { getAllOpenBloodRequests } from '@/actions/requestActions';
import DonorSearchForm from '@/component/homePageComponent/DonersSearch';
import MyRequestedCard from '@/component/manage/MyRequestCard';

import { FiList } from 'react-icons/fi';

export default async function RequestListPage({ searchParams }) {
  const allRequests = await getAllOpenBloodRequests();
  let filteredRequests = allRequests;

  return (
    <div className="py-10">
      <h1 className="text-4xl font-extrabold text-center mb-2 text-gray-800 flex items-center justify-center">
        <FiList className="mr-3 text-red-600" /> Urgent Blood Request Board
      </h1>
      <p className="text-xl text-center mb-8 text-gray-500 max-w-2xl mx-auto">
        Browse all immediate and pending blood needs across the network. Filter
        by blood group and location to find the closest match.
      </p>

      <DonorSearchForm></DonorSearchForm>

      <div className="divider my-10">
        Active Requests ({filteredRequests.length})
      </div>

      {filteredRequests.length === 0 ? (
        <div className="alert alert-warning shadow-lg max-w-lg mx-auto">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current flex-shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.398 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <span>
              No open requests found! Try relaxing your search filters.
            </span>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {filteredRequests.map(request => (
            <MyRequestedCard key={request._id} request={request} />
          ))}
        </div>
      )}
    </div>
  );
}
