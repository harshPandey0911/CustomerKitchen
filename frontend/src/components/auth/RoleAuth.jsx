import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { getLoginRouteConfig, saveDummyLoginSession } from '../../services/authSession';
import { APP_DOMAIN, APP_NAME, APP_STORAGE_PREFIX } from '../../constants/branding';

const ACCOUNT_STORAGE_KEY = `${APP_STORAGE_PREFIX}UnifiedRoleAccounts`;

const initialLoginForm = {
  email: '',
  password: '',
};

const initialRegisterForm = {
  name: '',
  email: '',
  password: '',
};

const inputClass =
  'w-full rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-900 outline-none transition-all duration-200 placeholder:text-gray-400 focus:ring-2 focus:ring-black';

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

const getCustomerLoginRoute = (pathname) => {
  if (pathname === '/login') {
    return '/login';
  }

  return '/customer/login';
};

export default function RoleAuth({ initialMode = 'login' }) {
  const location = useLocation();
  const navigate = useNavigate();
  const config = useMemo(() => getLoginRouteConfig(location.pathname), [location.pathname]);
  const isCustomerLoginRoute = location.pathname === '/customer/login';
  const [activeMode, setActiveMode] = useState(initialMode);
  const [loginForm, setLoginForm] = useState(initialLoginForm);
  const [registerForm, setRegisterForm] = useState(initialRegisterForm);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setActiveMode(initialMode);
    setErrors({});
  }, [initialMode]);

  const subtitle = `${config.label} ${activeMode === 'login' ? 'Login' : 'Register'}`;
  const isCustomerRole = config.role === 'customer';

  const switchMode = (nextMode) => {
    setErrors({});
    setActiveMode(nextMode);

    if (!isCustomerRole) {
      return;
    }

    navigate(nextMode === 'login' ? getCustomerLoginRoute(location.pathname) : '/signup');
  };

  const validateLogin = () => {
    const nextErrors = {};

    if (!loginForm.email.trim()) {
      nextErrors.email = 'Email is required';
    }

    if (!loginForm.password.trim()) {
      nextErrors.password = 'Password is required';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const validateRegister = () => {
    const nextErrors = {};

    if (!registerForm.name.trim()) {
      nextErrors.name = 'Full name is required';
    }

    if (!registerForm.email.trim()) {
      nextErrors.email = 'Email is required';
    }

    if (!registerForm.password.trim()) {
      nextErrors.password = 'Password is required';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();

    if (!validateLogin()) {
      return;
    }

    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 350));

      const matchingAccount = readAccounts().find(
        (account) =>
          account.role === config.role &&
          account.email.toLowerCase() === loginForm.email.trim().toLowerCase(),
      );

      const { dashboardPath } = saveDummyLoginSession({
        pathname: location.pathname,
        email: loginForm.email.trim(),
        displayNameOverride: matchingAccount?.name,
      });

      toast.success(`${config.label} login successful`);
      navigate(dashboardPath);
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (event) => {
    event.preventDefault();

    if (!validateRegister()) {
      return;
    }

    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 350));

      const nextAccount = {
        id: `${config.role}-${Date.now()}`,
        role: config.role,
        name: registerForm.name.trim(),
        email: registerForm.email.trim(),
        password: registerForm.password,
        createdAt: new Date().toLocaleString(),
      };

      const accounts = readAccounts().filter(
        (account) =>
          !(account.role === nextAccount.role && account.email.toLowerCase() === nextAccount.email.toLowerCase()),
      );
      writeAccounts([nextAccount, ...accounts]);

      if (config.role === 'customer') {
        localStorage.setItem(
          'customerData',
          JSON.stringify({
            id: nextAccount.id,
            name: nextAccount.name,
            email: nextAccount.email,
            password: nextAccount.password,
            role: nextAccount.role,
            createdAt: nextAccount.createdAt,
          }),
        );
      }

      setLoginForm({
        email: nextAccount.email,
        password: '',
      });
      setRegisterForm(initialRegisterForm);
      setErrors({});
      setActiveMode('login');

      if (isCustomerRole) {
        navigate(getCustomerLoginRoute(location.pathname));
      }

      toast.success(`${config.label} account created`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full">
        <div
          className={`mx-auto w-full max-w-sm rounded-2xl bg-white p-8 shadow-xl transition duration-200 hover:shadow-2xl ${
            isCustomerLoginRoute ? 'border-2 border-black ring-1 ring-black/60' : 'border-2 border-black'
          }`}
        >
          <div className="space-y-2">
            <p className="text-2xl font-semibold text-gray-900">{APP_NAME}</p>
            <p className="text-sm text-gray-500">{subtitle}</p>
          </div>

          <div className="mt-6 flex rounded-lg bg-gray-100 p-1">
            <div className="grid w-full grid-cols-2 gap-1">
              {[
                { id: 'login', label: 'Login' },
                { id: 'register', label: 'Register' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => switchMode(tab.id)}
                  className={`rounded-md px-4 py-2 text-sm font-medium transition-all duration-200 ${
                    activeMode === tab.id ? 'bg-white text-black shadow' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {activeMode === 'login' ? (
            <form className="mt-6 space-y-4" onSubmit={handleLoginSubmit}>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="text"
                  value={loginForm.email}
                  onChange={(event) => {
                    setLoginForm((current) => ({ ...current, email: event.target.value }));
                    setErrors((current) => ({ ...current, email: '' }));
                  }}
                  placeholder={`${config.role}@${APP_DOMAIN}`}
                  className={inputClass}
                />
                {errors.email ? <p className="text-xs text-red-500">{errors.email}</p> : null}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  value={loginForm.password}
                  onChange={(event) => {
                    setLoginForm((current) => ({ ...current, password: event.target.value }));
                    setErrors((current) => ({ ...current, password: '' }));
                  }}
                  placeholder="Enter password"
                  className={inputClass}
                />
                {errors.password ? <p className="text-xs text-red-500">{errors.password}</p> : null}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-black py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-gray-900 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </form>
          ) : (
            <form className="mt-6 space-y-4" onSubmit={handleRegisterSubmit}>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <input
                  type="text"
                  value={registerForm.name}
                  onChange={(event) => {
                    setRegisterForm((current) => ({ ...current, name: event.target.value }));
                    setErrors((current) => ({ ...current, name: '' }));
                  }}
                  placeholder="Enter full name"
                  className={inputClass}
                />
                {errors.name ? <p className="text-xs text-red-500">{errors.name}</p> : null}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="text"
                  value={registerForm.email}
                  onChange={(event) => {
                    setRegisterForm((current) => ({ ...current, email: event.target.value }));
                    setErrors((current) => ({ ...current, email: '' }));
                  }}
                  placeholder={`${config.role}@${APP_DOMAIN}`}
                  className={inputClass}
                />
                {errors.email ? <p className="text-xs text-red-500">{errors.email}</p> : null}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  value={registerForm.password}
                  onChange={(event) => {
                    setRegisterForm((current) => ({ ...current, password: event.target.value }));
                    setErrors((current) => ({ ...current, password: '' }));
                  }}
                  placeholder="Create password"
                  className={inputClass}
                />
                {errors.password ? <p className="text-xs text-red-500">{errors.password}</p> : null}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-black py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-gray-900 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? 'Creating account...' : 'Register'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
