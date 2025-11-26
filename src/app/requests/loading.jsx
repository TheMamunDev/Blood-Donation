import React from 'react';

export default async function ListLoading() {
  return (
    <div className="py-10 max-w-7xl mx-auto text-center">
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <span className="loading loading-spinner loading-lg text-error"></span>
        <p className="mt-4 text-xl text-gray-700">
          Loading active blood requests...
        </p>
      </div>
    </div>
  );
}
