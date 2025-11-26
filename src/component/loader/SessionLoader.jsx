import React from 'react';

const SessionLoader = () => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-white/80">
      <span className="loading loading-spinner text-warning"></span>
    </div>
  );
};

export default SessionLoader;
