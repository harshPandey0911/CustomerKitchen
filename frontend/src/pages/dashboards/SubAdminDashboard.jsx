import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiBox, FiHome, FiLogOut, FiShoppingCart, FiTool } from 'react-icons/fi';

import SubAdminDashboardContent from '../../components/admin/SubAdminDashboardContent';
import Inventory from '../../components/admin/Inventory';
import Orders from '../../components/admin/Orders';
import ServiceRequests from '../../components/admin/ServiceRequests';
import { APP_DOMAIN, APP_NAME } from '../../constants/branding';

const SubAdminDashboard = () => {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);

  const permissions = ['dashboard', 'inventory', 'orders', 'service'];
  const menuItems = [
    {
      heading: 'Overview',
      items: [{ id: 'dashboard', label: 'Dashboard', icon: <FiHome /> }],
    },
    {
      heading: 'Operations',
      items: [
        { id: 'inventory', label: 'Inventory', icon: <FiBox /> },
        { id: 'orders', label: 'Orders', icon: <FiShoppingCart /> },
      ],
    },
    {
      heading: 'Support',
      items: [{ id: 'service', label: 'Service Requests', icon: <FiTool /> }],
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem('loginData');
    localStorage.removeItem('role');
    navigate('/subadmin/login');
  };

  const renderContent = () => {
    switch (activeMenu) {
      case 'dashboard':
        return <SubAdminDashboardContent />;
      case 'inventory':
        return <Inventory />;
      case 'orders':
        return <Orders />;
      case 'service':
        return <ServiceRequests />;
      default:
        return <SubAdminDashboardContent />;
    }
  };

  const getTitle = () => {
    const item = menuItems.flatMap((section) => section.items).find((menuItem) => menuItem.id === activeMenu);
    return item?.label || 'Dashboard';
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
            <p className="text-xs text-gray-400">Sub Admin Panel</p>
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
                {section.items.map((item) => {
                  const hasAccess = permissions.includes(item.id);
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveMenu(item.id);
                        setSidebarOpen(false);
                      }}
                      disabled={!hasAccess}
                      className={`flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                        activeMenu === item.id
                          ? 'bg-black text-white'
                          : 'text-gray-600 hover:bg-gray-100'
                      } ${!hasAccess ? 'cursor-not-allowed opacity-50' : ''}`}
                    >
                      <span className="text-lg">
                        {item.icon}
                      </span>
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className="border-t border-gray-200 p-4">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm text-red-500 transition-colors hover:text-red-600"
          >
            <span className="text-lg">
              <FiLogOut />
            </span>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto bg-gray-100 md:ml-64">
        <header className="sticky top-0 z-20 border-b border-gray-200 bg-white">
          <div className="flex h-16 items-center justify-between px-6">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="rounded-lg p-2 text-gray-600 transition hover:bg-gray-100 md:hidden"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
              <h2 className="text-lg font-semibold text-gray-900">{getTitle()}</h2>
            </div>

            <div className="relative">
              <button
                onClick={() => setProfileDropdown(!profileDropdown)}
                className="flex items-center gap-3 rounded-lg px-2 py-2 transition hover:bg-gray-100"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-sm font-semibold text-white">
                  U
                </div>
              </button>

              {profileDropdown && (
                <div className="absolute right-0 mt-2 w-56 rounded-lg border border-gray-200 bg-white shadow-lg">
                  <div className="border-b border-gray-200 p-4">
                    <p className="text-sm font-semibold text-gray-900">Sub Admin</p>
                    <p className="text-xs text-gray-500">{`subadmin@${APP_DOMAIN}`}</p>
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
        </header>

        <div className="p-6">{renderContent()}</div>
      </main>
    </div>
  );
};

export default SubAdminDashboard;
