import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import SubAdminDashboardContent from '../../components/admin/SubAdminDashboardContent';
import Inventory from '../../components/admin/Inventory';
import Orders from '../../components/admin/Orders';
import ServiceRequests from '../../components/admin/ServiceRequests';
import PanelLayout from '../../components/layouts/PanelLayout';
import { APP_DOMAIN } from '../../constants/branding';

const permissions = ['dashboard', 'inventory', 'orders', 'service'];

const menuItems = [
  {
    heading: 'Overview',
    items: [{ id: 'dashboard', label: 'Dashboard', icon: 'dashboard' }],
  },
  {
    heading: 'Operations',
    items: [
      { id: 'inventory', label: 'Inventory', icon: 'box' },
      { id: 'orders', label: 'Orders', icon: 'cart' },
    ],
  },
  {
    heading: 'Support',
    items: [{ id: 'service', label: 'Service Requests', icon: 'tool' }],
  },
  {
    heading: 'System',
    items: [{ id: 'logout', label: 'Logout', icon: 'logout', action: 'logout' }],
  },
];

const SubAdminDashboard = () => {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');

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

  const currentTitle = useMemo(() => {
    const item = menuItems
      .flatMap((section) => section.items)
      .find((menuItem) => menuItem.id === activeMenu);

    return item?.label || 'Dashboard';
  }, [activeMenu]);

  const handleLogout = () => {
    localStorage.removeItem('loginData');
    localStorage.removeItem('role');
    navigate('/subadmin/login');
  };

  const handleMenuSelect = (item) => {
    if (item.action === 'logout') {
      handleLogout();
      return;
    }

    if (!permissions.includes(item.id)) {
      return;
    }

    setActiveMenu(item.id);
  };

  return (
    <PanelLayout
      panelLabel="Sub Admin Panel"
      title={currentTitle}
      subtitle="Operations-first workspace with the same sticky shell and compact navigation."
      menuSections={menuItems}
      activeItem={activeMenu}
      onSelectItem={handleMenuSelect}
      searchValue={searchQuery}
      onSearchChange={setSearchQuery}
      userName="Sub Admin"
      userEmail={`subadmin@${APP_DOMAIN}`}
      profileActions={[
        { label: 'Profile Settings', onClick: () => {} },
        { label: 'Notifications', onClick: () => {} },
        { label: 'Preferences', onClick: () => {} },
      ]}
      onLogout={handleLogout}
    >
      {renderContent()}
    </PanelLayout>
  );
};

export default SubAdminDashboard;
