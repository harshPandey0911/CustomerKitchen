import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-gray-400">
          404
        </p>
        <h1 className="mt-3 text-2xl font-semibold text-gray-900">
          Page not found
        </h1>
        <p className="mt-3 text-sm text-gray-500">
          The page you requested does not exist or the link is no longer active.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="flex-1 rounded-lg bg-black px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-900"
          >
            Go To Login
          </button>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="flex-1 rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
          >
            Back Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
