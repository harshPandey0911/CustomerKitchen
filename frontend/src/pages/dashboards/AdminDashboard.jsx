import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ModernDashboard from '../../components/admin/ModernDashboard';
import Inventory from '../../components/admin/Inventory';
import Orders from '../../components/admin/Orders';
import SubAdminsManagement from '../../components/admin/SubAdminsManagement';
import Reports from '../../components/admin/Reports';
import ServiceRequests from '../../components/admin/ServiceRequests';
import BusinessRules from '../../components/admin/BusinessRules';
import OperationalReports from '../../components/admin/OperationalReports';
import PerformanceReports from '../../components/admin/PerformanceReports';
import RewardSystem from '../../components/admin/RewardSystem';
import PermissionsControl from '../../components/admin/PermissionsControl';
import SystemControl from '../../components/admin/SystemControl';
import Distributor from './Distributor';
import RetailerDashboard from './RetailerDashboard';
import RetailersManagement from '../../components/admin/RetailersManagement';
import { adminUi } from '../../components/admin/adminStyles';
import { APP_DOMAIN, APP_NAME } from '../../constants/branding';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');

  const userName =
    JSON.parse(localStorage.getItem('loginData') || '{}')?.userName ||
    'Admin User';

  const handleLogout = () => {
    localStorage.removeItem('loginData');
    localStorage.removeItem('role');
    navigate('/admin/login');
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess('');

    if (!passwordData.oldPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      setPasswordError('Please fill all fields');
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError('New passwords do not match');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setPasswordError('New password must be at least 6 characters');
      return;
    }

    setPasswordSuccess('Password changed successfully!');
    setPasswordData({ oldPassword: '', newPassword: '', confirmPassword: '' });
    setTimeout(() => {
      setShowPasswordModal(false);
      setPasswordSuccess('');
    }, 2000);
  };

  const menuItems = [
    {
      heading: 'Overview',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
      ],
    },
    {
      heading: 'Management',
      items: [
        { id: 'subadmins', label: 'Sub Admins', icon: 'users' },
        { id: 'business-rules', label: 'Business Rules', icon: 'settings' },
        { id: 'inventory-alerts', label: 'Inventory', icon: 'box' },
        { id: 'stock-requests', label: 'Orders', icon: 'cart' },
        { id: 'distributor-performance', label: 'Distributors', icon: 'truck' },
        { id: 'retailer-performance', label: 'Retailers', icon: 'store' },
      ],
    },
    {
      heading: 'Insights',
      items: [
        { id: 'financial-reports', label: 'Reports', icon: 'chart' },
      ],
    },
    {
      heading: 'Support',
      items: [
        { id: 'service-requests', label: 'Service Requests', icon: 'tool' },
      ],
    },
    {
      heading: 'System',
      items: [
        { id: 'permissions', label: 'Permissions', icon: 'lock' },
        { id: 'system-control', label: 'Settings', icon: 'gear' },
      ],
    },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <ModernDashboard />;
      case 'inventory-alerts':
        return <Inventory />;
      case 'stock-requests':
        return <Orders />;
      case 'service-requests':
        return <ServiceRequests />;
      case 'subadmins':
        return <SubAdminsManagement />;
      case 'business-rules':
        return <BusinessRules />;
      case 'financial-reports':
        return <Reports />;
      case 'operational-reports':
        return <OperationalReports />;
      case 'performance-reports':
        return <PerformanceReports />;
      case 'rewards':
        return <RewardSystem />;
      case 'permissions':
        return <PermissionsControl />;
      case 'system-control':
        return <SystemControl />;
      case 'distributor-performance':
        return <Distributor embedded />;
      case 'retailer-performance':
        return <RetailersManagement />;
      default:
        return null;
    }
  };

  const getTitle = () => {
    const item = menuItems.flatMap((section) => section.items).find((menuItem) => menuItem.id === activeSection);
    return item?.label || 'Dashboard';
  };

  const resetPasswordModal = () => {
    setShowPasswordModal(false);
    setPasswordError('');
    setPasswordSuccess('');
    setPasswordData({ oldPassword: '', newPassword: '', confirmPassword: '' });
  };

  const renderSidebarIcon = (icon) => {
    switch (icon) {
      case 'dashboard':
        return (
          <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 13h8V3H3v10Zm10 8h8V11h-8v10ZM3 21h8v-6H3v6Zm10-10h8V3h-8v8Z" />
          </svg>
        );
      case 'users':
        return (
          <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2m18 0v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75M13 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" />
          </svg>
        );
      case 'settings':
      case 'gear':
        return (
          <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317a1 1 0 0 1 1.35-.936l.707.288a1 1 0 0 0 .894 0l.707-.288a1 1 0 0 1 1.35.936l.058.761a1 1 0 0 0 .59.84l.67.3a1 1 0 0 1 .524 1.296l-.275.712a1 1 0 0 0 .129 1.018l.462.607a1 1 0 0 1 0 1.214l-.462.607a1 1 0 0 0-.129 1.018l.275.712a1 1 0 0 1-.524 1.296l-.67.3a1 1 0 0 0-.59.84l-.058.761a1 1 0 0 1-1.35.936l-.707-.288a1 1 0 0 0-.894 0l-.707.288a1 1 0 0 1-1.35-.936l-.058-.761a1 1 0 0 0-.59-.84l-.67-.3a1 1 0 0 1-.524-1.296l.275-.712a1 1 0 0 0-.129-1.018l-.462-.607a1 1 0 0 1 0-1.214l.462-.607a1 1 0 0 0 .129-1.018l-.275-.712a1 1 0 0 1 .524-1.296l.67-.3a1 1 0 0 0 .59-.84l.058-.761Z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          </svg>
        );
      case 'box':
        return (
          <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m20 7-8 4-8-4m16 0-8-4-8 4m16 0v10l-8 4m-8-14v10l8 4m0-10v10" />
          </svg>
        );
      case 'cart':
        return (
          <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m1.6 8L5.4 5M7 13l-1.5 7M17 13l1.5 7M9 20a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm10 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" />
          </svg>
        );
      case 'truck':
        return (
          <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v10m-7 0a2 2 0 1 0 4 0m-4 0a2 2 0 1 1 4 0m7 0a2 2 0 1 0-4 0m4 0h1a1 1 0 0 0 1-1v-3l-3-4h-3" />
          </svg>
        );
      case 'store':
        return (
          <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9.5 4.5 4h15L21 9.5M5 10v9h14v-9M9 19v-5h6v5" />
          </svg>
        );
      case 'chart':
        return (
          <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20V10m5 10V4m5 16v-7M4 20h16" />
          </svg>
        );
      case 'tool':
        return (
          <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18v3h3l6.3-6.3a4 4 0 0 0 5.4-5.4l-2.1 2.1a2 2 0 1 1-2.8-2.8l2-2.3Z" />
          </svg>
        );
      case 'lock':
        return (
          <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V8a4 4 0 1 0-8 0v3m-1 0h10a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2Z" />
          </svg>
        );
      default:
        return (
          <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="4" strokeWidth={2} />
          </svg>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r border-gray-200 bg-gray-50 transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="relative flex items-center gap-3 border-b border-gray-200 p-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-black text-sm font-semibold text-white">
            KH
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-800">{APP_NAME}</p>
            <p className="text-xs text-gray-400">Admin Dashboard</p>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="absolute right-4 rounded-md p-1 text-gray-500 transition hover:bg-gray-200 md:hidden"
          >
            x
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-4">
          {menuItems.map((section) => (
            <div key={section.heading}>
              <p className="mb-2 mt-4 px-1 text-xs uppercase tracking-wide text-gray-400">
                {section.heading}
              </p>
              <div className="space-y-1">
                {section.items.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveSection(item.id);
                      setSidebarOpen(false);
                    }}
                    className={`flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                      activeSection === item.id
                        ? 'bg-black text-white'
                        : 'text-gray-500 hover:bg-gray-200'
                    }`}
                  >
                      <span
                        className={`flex h-6 w-6 items-center justify-center rounded-md text-xs ${
                          activeSection === item.id
                            ? 'bg-white text-black'
                            : 'bg-gray-200 text-gray-500'
                        }`}
                      >
                        {renderSidebarIcon(item.icon)}
                      </span>
                      <span>{item.label}</span>
                    </button>
                ))}
              </div>
            </div>
          ))}
        </nav>
      </aside>

      <main className="flex-1 overflow-y-auto bg-gray-100 md:ml-64">
        <header className="sticky top-0 z-20 h-16 border border-gray-200 bg-white">
          <div className="flex h-16 items-center justify-between px-6">
            <div className="flex items-center gap-6">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="rounded-md p-2 text-gray-600 transition-all duration-200 hover:bg-gray-200 md:hidden"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>

              <div className="hidden items-center gap-2 text-xs text-gray-400 sm:flex">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10.25 12 3l9 7.25V20a1 1 0 0 1-1 1h-5.5v-6h-5v6H4a1 1 0 0 1-1-1v-9.75Z"
                  />
                </svg>
                <span>Admin</span>
                <span>/</span>
                <span className="font-medium text-gray-700">{getTitle()}</span>
              </div>

              <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-700">
                {getTitle()}
              </h2>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden w-64 items-center rounded-md bg-gray-100 px-3 py-2 md:flex">
                <svg
                  className="mr-2 h-4 w-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m21 21-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full bg-transparent text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none"
                />
              </div>

              <button className="flex h-8 w-8 items-center justify-center rounded-md text-gray-500 transition-all duration-200 hover:bg-gray-200">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-1.4-1.4A2 2 0 0 1 18 14.2V11a6 6 0 1 0-12 0v3.2a2 2 0 0 1-.6 1.4L4 17h5m6 0a3 3 0 1 1-6 0m6 0H9"
                  />
                </svg>
              </button>

              <button className="flex h-8 w-8 items-center justify-center rounded-md text-gray-500 transition-all duration-200 hover:bg-gray-200">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10.325 4.317a1 1 0 0 1 1.35-.936l.707.288a1 1 0 0 0 .894 0l.707-.288a1 1 0 0 1 1.35.936l.058.761a1 1 0 0 0 .59.84l.67.3a1 1 0 0 1 .524 1.296l-.275.712a1 1 0 0 0 .129 1.018l.462.607a1 1 0 0 1 0 1.214l-.462.607a1 1 0 0 0-.129 1.018l.275.712a1 1 0 0 1-.524 1.296l-.67.3a1 1 0 0 0-.59.84l-.058.761a1 1 0 0 1-1.35.936l-.707-.288a1 1 0 0 0-.894 0l-.707.288a1 1 0 0 1-1.35-.936l-.058-.761a1 1 0 0 0-.59-.84l-.67-.3a1 1 0 0 1-.524-1.296l.275-.712a1 1 0 0 0-.129-1.018l-.462-.607a1 1 0 0 1 0-1.214l.462-.607a1 1 0 0 0 .129-1.018l-.275-.712a1 1 0 0 1 .524-1.296l.67-.3a1 1 0 0 0 .59-.84l.058-.761Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              </button>

              <div className="relative">
                <button
                  onClick={() => setProfileDropdown(!profileDropdown)}
                  className="flex items-center gap-3 rounded-md px-1 py-1 transition-all duration-200 hover:bg-gray-100"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-sm font-semibold text-white">
                    {userName.charAt(0).toUpperCase()}
                  </div>
                </button>

                {profileDropdown && (
                  <div className="absolute right-0 mt-2 w-56 rounded-lg border border-gray-200 bg-white shadow-lg">
                    <div className="border-b border-gray-200 p-4">
                      <p className="text-sm font-semibold text-gray-900">{userName}</p>
                      <p className="text-xs text-gray-500">{`admin@${APP_DOMAIN}`}</p>
                    </div>
                    <div className="space-y-1 p-2">
                      <button className="w-full rounded-md px-3 py-2 text-left text-sm text-gray-700 transition hover:bg-gray-100">
                        Profile Settings
                      </button>
                      <button className="w-full rounded-md px-3 py-2 text-left text-sm text-gray-700 transition hover:bg-gray-100">
                        Notifications
                      </button>
                      <button className="w-full rounded-md px-3 py-2 text-left text-sm text-gray-700 transition hover:bg-gray-100">
                        Preferences
                      </button>
                      <button
                        onClick={() => {
                          setShowPasswordModal(true);
                          setProfileDropdown(false);
                          setPasswordError('');
                          setPasswordSuccess('');
                        }}
                        className="w-full rounded-md px-3 py-2 text-left text-sm text-gray-700 transition hover:bg-gray-100"
                      >
                        Change Password
                      </button>
                    </div>
                    <div className="border-t border-gray-200 p-2">
                      <button
                        onClick={() => {
                          handleLogout();
                          setProfileDropdown(false);
                        }}
                        className="w-full rounded-md px-3 py-2 text-left text-sm font-semibold text-red-600 transition hover:bg-red-50"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        <div className="p-6">
          <div className="min-h-full bg-gray-100 text-gray-800">{renderContent()}</div>
        </div>

        {showPasswordModal && (
          <div className={adminUi.modalOverlay}>
            <div className={adminUi.modal}>
              <div className="flex items-center justify-between border-b border-gray-200 p-6">
                <h3 className="text-xl font-semibold text-gray-900">Change Password</h3>
                <button
                  onClick={resetPasswordModal}
                  className="text-2xl text-gray-400 transition hover:text-gray-600"
                >
                  x
                </button>
              </div>

              <form onSubmit={handlePasswordChange} className="space-y-4 p-6">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Current Password
                  </label>
                  <input
                    type="password"
                    placeholder="Enter current password"
                    value={passwordData.oldPassword}
                    onChange={(e) =>
                      setPasswordData({ ...passwordData, oldPassword: e.target.value })
                    }
                    className={adminUi.input}
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    New Password
                  </label>
                  <input
                    type="password"
                    placeholder="Enter new password"
                    value={passwordData.newPassword}
                    onChange={(e) =>
                      setPasswordData({ ...passwordData, newPassword: e.target.value })
                    }
                    className={adminUi.input}
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    placeholder="Confirm new password"
                    value={passwordData.confirmPassword}
                    onChange={(e) =>
                      setPasswordData({ ...passwordData, confirmPassword: e.target.value })
                    }
                    className={adminUi.input}
                  />
                </div>

                {passwordError && (
                  <div className="rounded-lg border border-red-200 bg-red-50 p-3">
                    <p className="text-sm text-red-700">{passwordError}</p>
                  </div>
                )}

                {passwordSuccess && (
                  <div className="rounded-lg border border-green-200 bg-green-50 p-3">
                    <p className="text-sm text-green-700">{passwordSuccess}</p>
                  </div>
                )}

                <div className="flex gap-3 border-t border-gray-200 pt-4">
                  <button
                    type="button"
                    onClick={resetPasswordModal}
                    className={`flex-1 ${adminUi.secondaryButton} py-2`}
                  >
                    Cancel
                  </button>
                  <button type="submit" className={`flex-1 ${adminUi.primaryButton}`}>
                    Update Password
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
