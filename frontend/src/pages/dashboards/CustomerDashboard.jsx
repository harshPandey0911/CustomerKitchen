import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Support from '../customer/Support';
import About from '../customer/About';
import CustomerHome from '../customer/CustomerHome';
import MyProducts from '../customer/MyProducts';
import RegisterProduct from '../customer/RegisterProduct';
import ServiceRequests from '../customer/ServiceRequests';
import Notifications from '../customer/Notifications';
import CustomerProfile from '../customer/CustomerProfile';
import EditProfile from '../customer/EditProfile';
import {
  buildCustomerNotifications,
  initialOwnedProducts,
  initialServiceRequests,
  ownershipProductOptions,
} from '../../data/customerOwnership';
import { APP_DOMAIN, APP_NAME } from '../../constants/branding';

const navItems = [
  { id: 'home', label: 'Home', mobileLabel: 'Home', path: '/customer/home', icon: 'home' },
  { id: 'products', label: 'My Products', mobileLabel: 'Products', path: '/customer/products', icon: 'products' },
  { id: 'register', label: 'Register Product', mobileLabel: 'Register', path: '/customer/register-product', icon: 'register' },
  { id: 'service', label: 'Service Requests', mobileLabel: 'Service', path: '/customer/service', icon: 'service' },
  { id: 'notifications', label: 'Notifications', mobileLabel: 'Alerts', path: '/customer/notifications', icon: 'notifications' },
  { id: 'profile', label: 'Profile', mobileLabel: 'Profile', path: '/customer/profile', icon: 'profile' },
];

const mobileNavItems = navItems.filter((item) => item.id !== 'notifications');

const profilePaths = ['/customer/profile', '/customer/edit-profile', '/customer/profile/edit', '/customer/support', '/customer/about'];

const technicianDirectory = {
  Repair: 'Rohit Menon',
  Installation: 'Aisha Verma',
  Replacement: 'Ananya Shah',
};

const readStorage = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

const createId = (prefix) => `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

const getDefaultCustomerProfile = () => {
  const loginData = readStorage('loginData', {});
  const customerData = readStorage('customerData', {});

  return {
    fullName: loginData.userName || customerData.name || 'Customer',
    email: loginData.email || customerData.email || `customer@${APP_DOMAIN}`,
    phone: loginData.phone || customerData.phone || '',
  };
};

const renderIcon = (icon) => {
  switch (icon) {
    case 'home':
      return (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 10.25 12 3l9 7.25V20a1 1 0 0 1-1 1h-5.5v-6h-5v6H4a1 1 0 0 1-1-1v-9.75Z" />
        </svg>
      );
    case 'products':
      return (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 7h16M7 4h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm3 7h4m-4 4h6" />
        </svg>
      );
    case 'register':
      return (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 5v14m7-7H5" />
        </svg>
      );
    case 'service':
      return (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M14.7 6.3a5 5 0 0 1 0 7.07l-5.4 5.39a2 2 0 1 1-2.82-2.82l5.4-5.4a1.5 1.5 0 0 0-2.12-2.11L4.7 13.52" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="m13 11 2 2" />
        </svg>
      );
    case 'notifications':
      return (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 17H5.76A1.76 1.76 0 0 1 4 15.24V14l1.4-1.4A2 2 0 0 0 6 11.2V9a6 6 0 0 1 12 0v2.2a2 2 0 0 0 .6 1.4L20 14v1.24A1.76 1.76 0 0 1 18.24 17H15Zm0 0a3 3 0 1 1-6 0" />
        </svg>
      );
    case 'profile':
      return (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0Zm-8 14a4 4 0 0 1 8 0" />
        </svg>
      );
    default:
      return (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="4" strokeWidth={1.8} />
        </svg>
      );
  }
};

const CustomerDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [products, setProducts] = useState(() => readStorage('customerOwnedProducts', initialOwnedProducts));
  const [serviceRequests, setServiceRequests] = useState(() => readStorage('customerServiceRequests', initialServiceRequests));
  const [readNotificationIds, setReadNotificationIds] = useState(() => readStorage('customerReadNotificationIds', []));
  const [profile, setProfile] = useState(() => readStorage('customerProfile', getDefaultCustomerProfile()));
  const [openProfile, setOpenProfile] = useState(false);

  const notifications = useMemo(() => buildCustomerNotifications(products, serviceRequests), [products, serviceRequests]);
  const unreadCount = notifications.filter((notification) => !readNotificationIds.includes(notification.id)).length;
  const currentPath = location.pathname;
  const userName = profile.fullName || 'Customer';
  const activeNavId = profilePaths.includes(currentPath)
    ? 'profile'
    : navItems.find((item) => item.path === currentPath)?.id || 'home';

  useEffect(() => {
    localStorage.setItem('customerOwnedProducts', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('customerServiceRequests', JSON.stringify(serviceRequests));
  }, [serviceRequests]);

  useEffect(() => {
    localStorage.setItem('customerReadNotificationIds', JSON.stringify(readNotificationIds));
  }, [readNotificationIds]);

  useEffect(() => {
    localStorage.setItem('customerProfile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    if (currentPath !== '/customer/notifications') {
      return;
    }

    setReadNotificationIds((current) => {
      const merged = new Set(current);
      notifications.forEach((notification) => merged.add(notification.id));
      return Array.from(merged);
    });
  }, [currentPath, notifications]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.profile-container')) {
        setOpenProfile(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleLogout = () => {
    setOpenProfile(false);
    localStorage.removeItem('loginData');
    localStorage.removeItem('role');
    localStorage.removeItem('user');
    navigate('/customer/login');
  };

  const navigateWithScroll = (path) => {
    setOpenProfile(false);
    window.scrollTo(0, 0);
    navigate(path);
  };

  const handleRegisterProduct = (payload) => {
    const nextProduct = {
      id: createId('prd'),
      productName: payload.productName.trim(),
      brand: payload.brand.trim(),
      modelNumber: payload.modelNumber.trim(),
      purchaseDate: payload.purchaseDate,
      warrantyMonths: Number(payload.warrantyMonths),
      invoiceName: payload.invoiceName || '',
    };

    setProducts((current) => [nextProduct, ...current]);
    toast.success('Product registered successfully.');
    navigate('/customer/products');
  };

  const handleRaiseServiceRequest = (payload) => {
    const timestamp = new Date().toISOString();
    const nextRequest = {
      id: createId('SR'),
      productId: payload.productId,
      productName: payload.productName,
      issueType: payload.issueType,
      description: payload.description.trim(),
      imageName: payload.imageName || '',
      status: 'Pending',
      assignedTechnician: technicianDirectory[payload.issueType] || 'Support Desk',
      createdAt: timestamp,
      updatedAt: timestamp,
    };

    setServiceRequests((current) => [nextRequest, ...current]);
    toast.success('Service request submitted.');
  };

  const handleProfileUpdate = (payload) => {
    const nextProfile = {
      fullName: payload.fullName.trim(),
      email: payload.email.trim(),
      phone: payload.phone.trim(),
    };

    setProfile(nextProfile);

    const loginData = readStorage('loginData', {});
    localStorage.setItem(
      'loginData',
      JSON.stringify({
        ...loginData,
        userName: nextProfile.fullName,
        email: nextProfile.email,
        phone: nextProfile.phone,
      }),
    );

    const user = readStorage('user', {});
    localStorage.setItem(
      'user',
      JSON.stringify({
        ...user,
        userName: nextProfile.fullName,
        email: nextProfile.email,
        phone: nextProfile.phone,
      }),
    );

    const customerData = readStorage('customerData', null);
    if (customerData) {
      localStorage.setItem(
        'customerData',
        JSON.stringify({
          ...customerData,
          name: nextProfile.fullName,
          email: nextProfile.email,
          phone: nextProfile.phone,
        }),
      );
    }

    toast.success('Profile updated successfully');
    navigate('/customer/profile');
  };

  const renderPage = () => {
    switch (currentPath) {
      case '/customer/products':
        return <MyProducts products={products} onNavigate={navigateWithScroll} />;
      case '/customer/register-product':
        return <RegisterProduct productOptions={ownershipProductOptions} onSubmit={handleRegisterProduct} />;
      case '/customer/service':
        return (
          <ServiceRequests
            products={products}
            serviceRequests={serviceRequests}
            onSubmit={handleRaiseServiceRequest}
            onNavigate={navigateWithScroll}
          />
        );
      case '/customer/notifications':
        return <Notifications notifications={notifications} unreadCount={unreadCount} />;
      case '/customer/profile':
        return (
          <CustomerProfile
            products={products}
            serviceRequests={serviceRequests}
            unreadCount={unreadCount}
            onNavigate={navigateWithScroll}
          />
        );
      case '/customer/edit-profile':
      case '/customer/profile/edit':
        return <EditProfile profile={profile} onSubmit={handleProfileUpdate} onCancel={() => navigateWithScroll('/customer/profile')} />;
      case '/customer/support':
        return <Support />;
      case '/customer/about':
        return <About />;
      case '/customer/home':
      default:
        return (
          <CustomerHome
            userName={userName}
            products={products}
            serviceRequests={serviceRequests}
            notifications={notifications}
            unreadCount={unreadCount}
            onNavigate={navigateWithScroll}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,_#f8fafc_0%,_#f1f5f9_100%)]">
      <div className="mx-auto w-full max-w-[1440px] px-4 py-4 md:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
          <aside className="hidden lg:block">
            <div className="sticky top-4 space-y-4">
              <div className="overflow-hidden rounded-[32px] bg-slate-950 p-6 text-white shadow-lg shadow-slate-300/40">
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-300">{APP_NAME}</p>
                <h2 className="mt-4 text-2xl font-semibold leading-tight">Customer Panel</h2>
                <p className="mt-3 text-sm leading-6 text-slate-300">
                  A premium appliance ownership view for warranty tracking, service intake, and product history.
                </p>
              </div>

              <nav className="rounded-[28px] border border-slate-200 bg-white p-3 shadow-sm shadow-slate-200/60">
                {navItems.map((item) => {
                  const active = item.id === activeNavId;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => navigateWithScroll(item.path)}
                      className={`mb-2 flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left transition-all duration-200 last:mb-0 ${
                        active
                          ? 'bg-slate-950 text-white shadow-sm'
                          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-950'
                      }`}
                    >
                      <span className={active ? 'text-white' : 'text-slate-400'}>{renderIcon(item.icon)}</span>
                      <span className="text-sm font-medium">{item.label}</span>
                    </button>
                  );
                })}
              </nav>

              <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/60">
                <p className="text-sm font-semibold text-slate-950">Need help?</p>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Support and About stay one click away inside Profile, so the ownership workflow never feels disconnected.
                </p>
              </div>
            </div>
          </aside>

          <div className="min-w-0 space-y-4 md:space-y-6">
            <header className="sticky top-0 z-30 flex h-[60px] items-center justify-between bg-white px-6 shadow-sm">
              <div className="flex items-center justify-between gap-4 w-full">
                <div className="min-w-0">
                  <p className="text-lg font-semibold text-slate-950">{APP_NAME}</p>
                  <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-slate-400">Product Dashboard</p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => navigateWithScroll('/customer/notifications')}
                    className="relative flex h-9 w-9 items-center justify-center rounded-full text-slate-500 transition-all duration-200 hover:scale-105 hover:text-indigo-600"
                    aria-label="Open notifications"
                  >
                    {renderIcon('notifications')}
                    {unreadCount > 0 ? (
                      <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-semibold text-white">
                        {unreadCount}
                      </span>
                    ) : null}
                  </button>

                  <div className="relative profile-container">
                    <button
                      type="button"
                      onClick={() => setOpenProfile((current) => !current)}
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-950 text-sm font-semibold text-white transition-all duration-200 hover:scale-105"
                      aria-label="Open profile menu"
                    >
                      {userName.charAt(0).toUpperCase()}
                    </button>

                    {openProfile ? (
                      <div className="absolute right-0 mt-2 w-44 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg z-50 transition-all duration-200">
                        <button
                          type="button"
                          onClick={() => navigateWithScroll('/customer/profile/edit')}
                          className="w-full px-4 py-2 text-left text-sm text-slate-700 transition-colors duration-200 hover:bg-gray-100"
                        >
                          Edit Profile
                        </button>
                        <button
                          type="button"
                          onClick={handleLogout}
                          className="w-full px-4 py-2 text-left text-sm text-red-600 transition-colors duration-200 hover:bg-red-100"
                        >
                          Logout
                        </button>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </header>

            <main className="pb-24 lg:pb-6">
              <div className="transition-all duration-300">{renderPage()}</div>
            </main>
          </div>
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 backdrop-blur lg:hidden">
        <nav className="grid grid-cols-5 px-1 py-2">
          {mobileNavItems.map((item) => {
            const active = item.id === activeNavId;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => navigateWithScroll(item.path)}
                className={`flex flex-col items-center gap-1 rounded-2xl px-2 py-2 text-[11px] transition-all duration-200 ${
                  active ? 'text-slate-950' : 'text-slate-400'
                }`}
              >
                <span className={active ? 'text-slate-950' : 'text-slate-400'}>{renderIcon(item.icon)}</span>
                <span>{item.mobileLabel}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default CustomerDashboard;
