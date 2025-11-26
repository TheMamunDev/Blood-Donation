import { FiTarget, FiHeart, FiUsers, FiGlobe } from 'react-icons/fi';
import Link from 'next/link';
export const metadata = {
  title: 'About Us | Blood Hub',
  description: 'Donate your blood today',
};

export default function AboutPage() {
  return (
    <div className="py-12 max-w-5xl mx-auto">
      <h1 className="text-2xl md:text-5xl font-extrabold text-center mb-4 text-gray-800">
        Our Mission: Closing the Gap Between Need and Donor
      </h1>
      <p className="text-xl text-center text-gray-500 mb-12">
        The <strong> Blood Hub </strong>is a non-profit initiative dedicated to
        rapid blood mobilization during critical times.
      </p>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="text-center p-6 bg-base-200 rounded-lg shadow-md">
          <FiTarget className="text-4xl text-error mx-auto mb-3" />
          <h2 className="text-2xl font-semibold mb-2">Rapid Response</h2>
          <p className="text-gray-700">
            Our core function is speed. We ensure blood requests are pushed
            instantly to a wide network of potential donors.
          </p>
        </div>
        <div className="text-center p-6 bg-base-200 rounded-lg shadow-md">
          <FiHeart className="text-4xl text-warning mx-auto mb-3" />
          <h2 className="text-2xl font-semibold mb-2">Transparency</h2>
          <p className="text-gray-700">
            All requests are publicly listed and managed with clear status
            updates: Open, Fulfilled, or Closed.
          </p>
        </div>
        <div className="text-center p-6 bg-base-200 rounded-lg shadow-md">
          <FiUsers className="text-4xl text-info mx-auto mb-3" />
          <h2 className="text-2xl font-semibold mb-2">Community Driven</h2>
          <p className="text-gray-700">
            We rely on volunteer donors and hospitals to update request status,
            making this a truly collective effort.
          </p>
        </div>
      </section>

      <div className="alert alert-info shadow-lg p-6 flex flex-col md:flex-row justify-between items-center rounded-lg">
        <div className="flex items-center space-x-4">
          <FiGlobe className="text-3xl" />
          <span className="text-lg">
            Every minute counts. Find an urgent need or submit your own request
            now.
          </span>
        </div>
        <Link href="/requests" className="btn btn-sm btn-primary">
          View Requests
        </Link>
      </div>
    </div>
  );
}
