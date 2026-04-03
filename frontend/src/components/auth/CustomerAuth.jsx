import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaFacebookF } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import {
  FiEye,
  FiEyeOff,
  FiLock,
  FiMail,
  FiUser,
} from 'react-icons/fi';
import toast from 'react-hot-toast';
import { saveDummyLoginSession } from '../../services/authSession';
import { APP_NAME, APP_STORAGE_PREFIX } from '../../constants/branding';

const ACCOUNT_STORAGE_KEY = `${APP_STORAGE_PREFIX}CustomerAccounts`;
const PREFILL_EMAIL_KEY = `${APP_STORAGE_PREFIX}CustomerPrefillEmail`;

const initialLoginForm = {
  email: '',
  password: '',
  rememberMe: true,
};

const initialSignupForm = {
  name: '',
  email: '',
  password: '',
};

const readAccounts = () => {
  try {
    const raw = localStorage.getItem(ACCOUNT_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const writeAccounts = (accounts) => {
  localStorage.setItem(ACCOUNT_STORAGE_KEY, JSON.stringify(accounts));
};

const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const KitchenApplianceMark = () => (
  <svg className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24">
    <path
      d="M6 5h12l1 3v2a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V8l1-3Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
    />
    <path
      d="M8.5 13v3.5A2.5 2.5 0 0 0 11 19h2a2.5 2.5 0 0 0 2.5-2.5V13"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
    />
    <path
      d="M9 8h6M7.5 3.75h9"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="1.8"
    />
  </svg>
);

const AuthField = ({
  label,
  icon: Icon,
  error,
  trailing,
  ...inputProps
}) => (
  <div>
    <label className="mb-2 block text-sm font-medium text-gray-700">{label}</label>
    <div
      className={`flex items-center gap-3 rounded-xl border bg-white px-4 py-3 transition ${
        error
          ? 'border-red-300 ring-4 ring-red-50'
          : 'border-gray-300 focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-100'
      }`}
    >
      <Icon className="h-5 w-5 shrink-0 text-gray-400" />
      <input
        {...inputProps}
        className="w-full bg-transparent text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none"
      />
      {trailing}
    </div>
    {error ? <p className="mt-2 text-xs text-red-500">{error}</p> : null}
  </div>
);

const CustomerAuth = ({ mode = 'login' }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeMode, setActiveMode] = useState(mode);
  const [loginForm, setLoginForm] = useState(initialLoginForm);
  const [signupForm, setSignupForm] = useState(initialSignupForm);
  const [loginErrors, setLoginErrors] = useState({});
  const [signupErrors, setSignupErrors] = useState({});
  const [loginLoading, setLoginLoading] = useState(false);
  const [signupLoading, setSignupLoading] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showSignupPassword, setShowSignupPassword] = useState(false);

  useEffect(() => {
    setActiveMode(mode);

    if (mode === 'login') {
      const prefillEmail = sessionStorage.getItem(PREFILL_EMAIL_KEY);

      if (prefillEmail) {
        setLoginForm((current) => ({ ...current, email: prefillEmail }));
        sessionStorage.removeItem(PREFILL_EMAIL_KEY);
      }
    }
  }, [mode]);

  const switchMode = (nextMode) => {
    setActiveMode(nextMode);
    setLoginErrors({});
    setSignupErrors({});

    if (nextMode === activeMode) {
      return;
    }

    navigate(nextMode === 'login' ? '/login' : '/signup');
  };

  const validateLogin = () => {
    const nextErrors = {};

    if (!loginForm.email.trim()) {
      nextErrors.email = 'Email is required';
    }

    if (!loginForm.password) {
      nextErrors.password = 'Password is required';
    }

    setLoginErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const validateSignup = () => {
    const nextErrors = {};

    if (!signupForm.name.trim()) {
      nextErrors.name = 'Full name is required';
    }

    if (!signupForm.email.trim()) {
      nextErrors.email = 'Email is required';
    } else if (!isValidEmail(signupForm.email.trim())) {
      nextErrors.email = 'Enter a valid email address';
    }

    if (!signupForm.password) {
      nextErrors.password = 'Password is required';
    } else if (signupForm.password.length < 6) {
      nextErrors.password = 'Password must be at least 6 characters';
    }

    setSignupErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleLoginSubmit = (event) => {
    event.preventDefault();

    if (!validateLogin()) {
      return;
    }

    setLoginLoading(true);

    try {
      const { dashboardPath, loginData } = saveDummyLoginSession({
        pathname: location.pathname,
        email: loginForm.email,
        rememberMe: loginForm.rememberMe,
      });

      toast.success(`Welcome, ${String(loginData.userName).split(/[ _]/)[0]}!`);
      navigate(dashboardPath);
    } finally {
      setLoginLoading(false);
    }
  };

  const handleSignupSubmit = async (event) => {
    event.preventDefault();

    if (!validateSignup()) {
      return;
    }

    const email = signupForm.email.trim().toLowerCase();
    const accounts = readAccounts();

    if (accounts.some((item) => item.email === email)) {
      setSignupErrors({ email: 'An account with this email already exists' });
      toast.error('Email already registered');
      return;
    }

    setSignupLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 900));

      const newAccount = {
        id: `cust-${Date.now()}`,
        name: signupForm.name.trim(),
        email,
        password: signupForm.password,
        role: 'customer',
        createdAt: new Date().toLocaleString(),
      };

      writeAccounts([newAccount, ...accounts]);
      localStorage.setItem('customerData', JSON.stringify(newAccount));
      sessionStorage.setItem(PREFILL_EMAIL_KEY, email);

      toast.success('Account created. Sign in to continue.');
      navigate('/login');
    } finally {
      setSignupLoading(false);
    }
  };

  const passwordToggleClass =
    'text-gray-400 transition hover:text-gray-600 focus:outline-none';

  return (
    <div className="relative min-h-screen overflow-hidden bg-gray-100 p-4 sm:p-6">
      <div className="absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-indigo-200/50 blur-3xl" />
      <div className="absolute bottom-10 right-0 h-48 w-48 rounded-full bg-purple-200/40 blur-3xl" />

      <div className="mx-auto flex min-h-[calc(100vh-2rem)] w-full max-w-[400px] items-center justify-center">
        <div className="w-full overflow-hidden rounded-[30px] border-2 border-black bg-white shadow-[0_24px_80px_rgba(15,23,42,0.14)] transition duration-200 hover:shadow-[0_28px_90px_rgba(15,23,42,0.18)]">
          <div className="relative z-10 h-44 overflow-hidden rounded-b-3xl bg-gradient-to-br from-indigo-600 to-purple-600 px-6 py-4 text-white pointer-events-none">
            <div className="absolute -right-8 top-8 h-24 w-24 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute -left-10 bottom-0 h-20 w-20 rounded-full bg-white/10 blur-2xl" />

            <div className="relative z-10 flex h-full flex-col justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-sm">
                  <KitchenApplianceMark />
                </div>
                <div>
                  <p className="text-base font-semibold">{APP_NAME}</p>
                  <p className="text-xs text-white/75">Smart appliance shopping</p>
                </div>
              </div>

              <div className="max-w-xs space-y-2">
                <h1 className="text-xl font-semibold leading-snug">
                  {activeMode === 'login' ? 'Welcome back to your kitchen.' : 'Create your premium account.'}
                </h1>
                <p className="text-sm leading-5 text-white/75">
                  Discover appliances, manage orders, and keep your home setup in one polished app experience.
                </p>
              </div>
            </div>
          </div>

          <div className="relative z-20 mt-6 bg-white px-5 pb-6 sm:px-6 pointer-events-auto">
            <div className="flex justify-between rounded-xl bg-gray-100 p-1">
              <div className="flex w-full gap-1">
                {[
                  { id: 'login', label: 'Sign In' },
                  { id: 'signup', label: 'Sign Up' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => switchMode(tab.id)}
                    className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-medium transition-all ${
                      activeMode === tab.id
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6 transition-all duration-300">
              {activeMode === 'login' ? (
                <form onSubmit={handleLoginSubmit} className="space-y-4">
                  {loginErrors.auth ? (
                    <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                      {loginErrors.auth}
                    </div>
                  ) : null}

                  <AuthField
                    label="Email"
                    icon={FiMail}
                    type="email"
                    placeholder="you@example.com"
                    value={loginForm.email}
                    onChange={(event) => {
                      setLoginForm((current) => ({ ...current, email: event.target.value }));
                      setLoginErrors((current) => ({ ...current, email: '', auth: '' }));
                    }}
                    error={loginErrors.email}
                  />

                  <AuthField
                    label="Password"
                    icon={FiLock}
                    type={showLoginPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={loginForm.password}
                    onChange={(event) => {
                      setLoginForm((current) => ({ ...current, password: event.target.value }));
                      setLoginErrors((current) => ({ ...current, password: '', auth: '' }));
                    }}
                    error={loginErrors.password}
                    trailing={
                      <button
                        type="button"
                        onClick={() => setShowLoginPassword((current) => !current)}
                        className={passwordToggleClass}
                      >
                        {showLoginPassword ? <FiEyeOff className="h-5 w-5" /> : <FiEye className="h-5 w-5" />}
                      </button>
                    }
                  />

                  <div className="flex items-center justify-between gap-4 pt-1 text-sm">
                    <label className="flex items-center gap-2 text-gray-600">
                      <input
                        type="checkbox"
                        checked={loginForm.rememberMe}
                        onChange={(event) =>
                          setLoginForm((current) => ({
                            ...current,
                            rememberMe: event.target.checked,
                          }))
                        }
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      Remember me
                    </label>
                    <button
                      type="button"
                      onClick={() => toast('Password recovery will be available soon.')}
                      className="font-medium text-indigo-600 transition hover:text-indigo-700"
                    >
                      Forgot password?
                    </button>
                  </div>

                  <button
                    type="submit"
                    disabled={loginLoading}
                    className="w-full rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition hover:scale-[1.01] hover:from-indigo-700 hover:to-purple-700 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {loginLoading ? 'Signing In...' : 'Login'}
                  </button>
                </form>
              ) : (
                <form onSubmit={handleSignupSubmit} className="space-y-4">
                  <AuthField
                    label="Full Name"
                    icon={FiUser}
                    type="text"
                    placeholder="Aarav Sharma"
                    value={signupForm.name}
                    onChange={(event) => {
                      setSignupForm((current) => ({ ...current, name: event.target.value }));
                      setSignupErrors((current) => ({ ...current, name: '' }));
                    }}
                    error={signupErrors.name}
                  />

                  <AuthField
                    label="Email"
                    icon={FiMail}
                    type="email"
                    placeholder="aarav@example.com"
                    value={signupForm.email}
                    onChange={(event) => {
                      setSignupForm((current) => ({ ...current, email: event.target.value }));
                      setSignupErrors((current) => ({ ...current, email: '' }));
                    }}
                    error={signupErrors.email}
                  />

                  <AuthField
                    label="Password"
                    icon={FiLock}
                    type={showSignupPassword ? 'text' : 'password'}
                    placeholder="Create a strong password"
                    value={signupForm.password}
                    onChange={(event) => {
                      setSignupForm((current) => ({ ...current, password: event.target.value }));
                      setSignupErrors((current) => ({ ...current, password: '' }));
                    }}
                    error={signupErrors.password}
                    trailing={
                      <button
                        type="button"
                        onClick={() => setShowSignupPassword((current) => !current)}
                        className={passwordToggleClass}
                      >
                        {showSignupPassword ? <FiEyeOff className="h-5 w-5" /> : <FiEye className="h-5 w-5" />}
                      </button>
                    }
                  />

                  <button
                    type="submit"
                    disabled={signupLoading}
                    className="w-full rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition hover:scale-[1.01] hover:from-indigo-700 hover:to-purple-700 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {signupLoading ? 'Creating Account...' : 'Sign Up'}
                  </button>

                  <div className="flex items-center gap-3 pt-1">
                    <div className="h-px flex-1 bg-gray-200" />
                    <span className="text-xs font-medium uppercase tracking-[0.2em] text-gray-400">
                      or sign up with
                    </span>
                    <div className="h-px flex-1 bg-gray-200" />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => toast('Google signup is coming soon.')}
                      className="flex items-center justify-center gap-2 rounded-2xl border border-gray-200 px-4 py-3 text-sm font-medium text-gray-700 transition hover:border-indigo-200 hover:bg-indigo-50"
                    >
                      <FcGoogle className="h-5 w-5" />
                      Google
                    </button>
                    <button
                      type="button"
                      onClick={() => toast('Facebook signup is coming soon.')}
                      className="flex items-center justify-center gap-2 rounded-2xl border border-gray-200 px-4 py-3 text-sm font-medium text-gray-700 transition hover:border-indigo-200 hover:bg-indigo-50"
                    >
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#1877F2] text-[10px] text-white">
                        <FaFacebookF />
                      </span>
                      Facebook
                    </button>
                  </div>
                </form>
              )}
            </div>

            <p className="mt-6 text-center text-xs leading-5 text-gray-400">
              {`By continuing, you agree to ${APP_NAME}'s Terms and Privacy Policy.`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerAuth;
