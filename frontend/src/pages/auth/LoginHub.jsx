import React from 'react';
import { useNavigate } from 'react-router-dom';
import { APP_LOGO, APP_NAME } from '../../constants/branding';

const LoginHub = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-black/70 bg-white p-8">
          <div className="mb-8">
            <div className="mb-6 flex items-center gap-3">
              <img src={APP_LOGO} alt={`${APP_NAME} logo`} className="h-10 w-10 object-contain" />
              <div>
                <h2 className="text-xl font-bold text-black">{APP_NAME}</h2>
                <p className="text-sm text-gray-500">Customer Login</p>
              </div>
            </div>
            <h1 className="mb-1 text-2xl font-bold text-gray-900">Welcome</h1>
            <p className="text-sm text-gray-500">Sign in to your account to continue</p>
          </div>

          <div className="mb-6 space-y-3">
            <button
              onClick={() => navigate('/login')}
              className="w-full rounded-md bg-indigo-600 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
            >
              Customer Login
            </button>
          </div>

          <div className="my-6 flex items-center gap-3">
            <div className="flex-1 border-t border-gray-200" />
            <span className="text-xs text-gray-400">or</span>
            <div className="flex-1 border-t border-gray-200" />
          </div>

          <p className="text-center text-sm text-gray-600">
            New customer?{' '}
            <button
              type="button"
              onClick={() => navigate('/signup')}
              className="font-semibold text-indigo-600 transition hover:text-indigo-700"
            >
              Create an account
            </button>
          </p>
        </div>

        <p className="mt-5 text-center text-xs text-gray-400">
          By continuing, you agree to our <span className="font-medium text-gray-700">Terms &amp; Conditions</span>{' '}
          and Privacy Policy.
        </p>
      </div>
    </div>
  );
};

export default LoginHub;
