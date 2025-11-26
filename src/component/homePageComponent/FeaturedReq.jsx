import React from 'react';
import Link from 'next/link';
import { FiMapPin, FiClock, FiHeart, FiArrowRight } from 'react-icons/fi';
import { feturedRequest } from '@/actions/requestActions';
import RequestCard from '../manage/RequestCard';

const FeaturedReq = async () => {
  const requests = await feturedRequest();
  console.log(requests);
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
        {requests.map(request => (
          <RequestCard key={request._id} request={request}></RequestCard>
        ))}
      </div>
    </section>
  );
};
export default FeaturedReq;
