import React from 'react';
import { useNavigate } from 'react-router-dom';
import { APP_NAME } from '../../constants/branding';

const LoginHub = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="rounded-2xl border-2 border-black bg-white p-8 shadow-xl transition duration-200 hover:shadow-2xl">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-6">
              <span className="text-2xl">🍳</span>
              <span className="text-lg font-bold text-gray-900">{APP_NAME}</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">Welcome</h1>
            <p className="text-sm text-gray-500">Sign in to your account to continue</p>
          </div>

          {/* Login Button */}
          <div className="space-y-3 mb-6">
            <button
              onClick={() => navigate('/login')}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-md text-sm transition"
            >
              Customer Login
            </button>
          </div>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="flex-1 border-t border-gray-200" />
            <span className="text-xs text-gray-400">or</span>
            <div className="flex-1 border-t border-gray-200" />
          </div>

          {/* Signup Link */}
          <p className="text-center text-sm text-gray-600">
            New customer?{' '}
            <button
              type="button"
              onClick={() => navigate('/signup')}
              className="font-semibold text-indigo-600 hover:text-indigo-700 transition"
            >
              Create an account
            </button>
          </p>
        </div>

        <p className="text-center text-xs text-gray-400 mt-5">
          {`By continuing, you agree to ${APP_NAME}'s Terms & Privacy Policy`}
        </p>
      </div>
    </div>
  );
};

export default LoginHub;
