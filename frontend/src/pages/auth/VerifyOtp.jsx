import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import OtpInput from '../../components/auth/OtpInput';
import { APP_NAME } from '../../constants/branding';

const ROLE_ROUTES = {
  admin:       '/admin/dashboard',
  subadmin:    '/subadmin/dashboard',
  distributor: '/distributor/dashboard',
  retailer:    '/retailer/dashboard',
  customer:    '/customer/home',
};

const VerifyOtp = () => {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const loginData = JSON.parse(localStorage.getItem('loginData') || '{}');

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otp || otp.length !== 6) {
      toast.error('Please enter the 6-digit OTP');
      return;
    }

    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1200));

      const userData = JSON.parse(localStorage.getItem('loginData') || '{}');
      const role = userData?.role || 'customer';

      // Mark as logged in & store role at top level
      const updated = { ...userData, isLoggedIn: true };
      localStorage.setItem('loginData', JSON.stringify(updated));
      localStorage.setItem('role', role);

      toast.success('Verified! Redirecting...');

      setTimeout(() => {
        navigate(ROLE_ROUTES[role] || '/customer/login');
      }, 400);
    } catch (err) {
      toast.error('Verification failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    toast.success('OTP resent to +91 ' + loginData?.phone);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">

        {/* Card */}
        <div className="rounded-2xl border-2 border-black bg-white p-8 shadow-xl transition duration-200 hover:shadow-2xl">

          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-6">
              <span className="text-2xl">🍳</span>
              <span className="text-lg font-bold text-gray-900">{APP_NAME}</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">Verify OTP</h1>
            <p className="text-sm text-gray-500">
              Enter the 6-digit code sent to{' '}
              <span className="font-medium text-gray-700">+91 {loginData?.phone || '——'}</span>
            </p>
          </div>

          {/* Role badge */}
          {loginData?.role && (
            <div className="mb-5 flex items-center gap-2">
              <span className="text-xs text-gray-500">Logging in as</span>
              <span className="px-2 py-0.5 bg-indigo-100 text-indigo-700 text-xs font-semibold rounded capitalize">
                {loginData.role}
              </span>
            </div>
          )}

          <form onSubmit={handleVerifyOtp} className="space-y-6">
            {/* OTP Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4 text-center">
                Enter OTP
              </label>
              <div className="flex justify-center">
                <OtpInput length={6} value={otp} onChange={setOtp} />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading || otp.length !== 6}
              className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-2.5 rounded-md text-sm transition"
            >
              {loading ? 'Verifying...' : 'Verify & Login'}
            </button>
          </form>

          {/* Resend + Back */}
          <div className="mt-6 flex items-center justify-between text-sm">
            <p className="text-gray-500">
              Didn't get code?{' '}
              <button
                onClick={handleResend}
                disabled={loading}
                className="text-indigo-600 hover:underline font-medium disabled:opacity-50"
              >
                Resend
              </button>
            </p>
            <Link to="/customer/login" className="text-gray-400 hover:text-gray-600 transition">
              ← Back
            </Link>
          </div>
        </div>

        <p className="text-center text-xs text-gray-400 mt-5">
          OTP is valid for 10 minutes
        </p>
      </div>
    </div>
  );
};

export default VerifyOtp;
