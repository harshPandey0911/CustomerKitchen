import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { LuHouse, LuPackage, LuPlus, LuUserRound, LuWrench } from 'react-icons/lu';
import Support from '../customer/Support';
import About from '../customer/About';
import CustomerHome from '../customer/CustomerHome';
import MyProducts from '../customer/MyProducts';
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
import Header from '../../components/customer/dashboard/Header';
import BottomNav from '../../components/customer/dashboard/BottomNav';
import RegisterProductModal from '../../components/customer/modals/RegisterProductModal';
import ServiceRequestModal from '../../components/customer/modals/ServiceRequestModal';

const navItems = [
  { id: 'home', label: 'Home', path: '/customer/home', icon: LuHouse },
  { id: 'products', label: 'Products', path: '/customer/products', icon: LuPackage },
  { id: 'register', label: 'Register', path: '/customer/register-product', icon: LuPlus, isCenter: true },
  { id: 'service', label: 'Service', path: '/customer/service', icon: LuWrench },
  { id: 'profile', label: 'Profile', path: '/customer/profile', icon: LuUserRound },
];

const profilePaths = ['/customer/profile', '/customer/edit-profile', '/customer/profile/edit', '/customer/support', '/customer/about'];
const registerModalPath = '/customer/register-product';

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

const CustomerDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [products, setProducts] = useState(() => readStorage('customerOwnedProducts', initialOwnedProducts));
  const [serviceRequests, setServiceRequests] = useState(() => readStorage('customerServiceRequests', initialServiceRequests));
  const [readNotificationIds, setReadNotificationIds] = useState(() => readStorage('customerReadNotificationIds', []));
  const [profile, setProfile] = useState(() => readStorage('customerProfile', getDefaultCustomerProfile()));
  const [openProfile, setOpenProfile] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const [lastContentPath, setLastContentPath] = useState(() =>
    location.pathname === registerModalPath ? '/customer/products' : location.pathname,
  );

  const notifications = useMemo(() => buildCustomerNotifications(products, serviceRequests), [products, serviceRequests]);
  const unreadCount = notifications.filter((notification) => !readNotificationIds.includes(notification.id)).length;
  const currentPath = location.pathname;
  const resolvedPath = currentPath === registerModalPath ? lastContentPath : currentPath;
  const userName = profile.fullName || 'Customer';
  const avatarInitial = 'H';
  const activeNavId = profilePaths.includes(resolvedPath)
    ? 'profile'
    : navItems.find((item) => item.path === resolvedPath)?.id || null;
  const isModalOpen = Boolean(activeModal);

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
    if (currentPath !== registerModalPath) {
      setLastContentPath(currentPath);
    }
  }, [currentPath]);

  useEffect(() => {
    if (currentPath === registerModalPath) {
      setActiveModal('register');
    }
  }, [currentPath]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.profile-container')) {
        setOpenProfile(false);
      }
    };

    document.addEventListener('pointerdown', handleClickOutside);
    return () => document.removeEventListener('pointerdown', handleClickOutside);
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

    if (path === registerModalPath) {
      setLastContentPath(resolvedPath);
      setActiveModal('register');
      return;
    }

    window.scrollTo(0, 0);
    navigate(path);
  };

  const openServiceModal = () => {
    setOpenProfile(false);

    if (products.length === 0) {
      toast('Register a product before raising a service request.');
      setLastContentPath(resolvedPath);
      setActiveModal('register');
      return;
    }

    setActiveModal('service');
  };

  const closeModal = () => {
    setActiveModal(null);

    if (currentPath === registerModalPath) {
      window.scrollTo(0, 0);
      navigate(lastContentPath || '/customer/products', { replace: true });
    }
  };

  const closeModalAndNavigate = (path) => {
    setActiveModal(null);
    setOpenProfile(false);
    window.scrollTo(0, 0);

    if (currentPath === registerModalPath) {
      navigate(path, { replace: true });
      return;
    }

    if (currentPath !== path) {
      navigate(path);
    }
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
    closeModalAndNavigate('/customer/products');
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
    closeModalAndNavigate('/customer/service');
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
    switch (resolvedPath) {
      case '/customer/products':
        return <MyProducts products={products} onNavigate={navigateWithScroll} />;
      case '/customer/service':
        return (
          <ServiceRequests
            products={products}
            serviceRequests={serviceRequests}
            onNavigate={navigateWithScroll}
            onOpenServiceModal={openServiceModal}
          />
        );
      case '/customer/notifications':
        return <Notifications notifications={notifications} unreadCount={unreadCount} />;
      case '/customer/profile':
        return (
          <CustomerProfile
            profile={profile}
            avatarInitial={avatarInitial}
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
            onOpenServiceModal={openServiceModal}
          />
        );
    }
  };

  return (
    <div
      className="customer-panel min-h-screen overflow-x-hidden bg-[#F8F6F4]"
      style={{
        '--customer-primary': '#8B5E3C',
        '--customer-dark': '#1E1E1E',
        '--customer-light': '#A9745B',
        '--customer-accent': '#A9745B',
        '--customer-bg': '#F8F6F4',
        '--customer-card': '#FFFFFF',
        '--customer-border': '#ECE4DD',
        '--customer-text': '#1E1E1E',
        '--customer-muted': '#6B6B6B',
        '--customer-soft': '#F3ECE7',
      }}
    >
      <div className="fixed inset-x-0 top-0 z-30">
        <div className="mx-auto w-full max-w-[420px] px-4">
          <div className="profile-container">
            <Header
              title={APP_NAME}
              subtitle="Product Dashboard"
              unreadCount={unreadCount}
              avatarInitial={avatarInitial}
              isProfileMenuOpen={openProfile}
              onNotificationsClick={() => navigateWithScroll('/customer/notifications')}
              onToggleProfileMenu={() => setOpenProfile((current) => !current)}
              onOpenProfile={() => navigateWithScroll('/customer/profile')}
              onEditProfile={() => navigateWithScroll('/customer/profile/edit')}
              onLogout={handleLogout}
            />
          </div>
        </div>
      </div>

      <main className="mx-auto min-h-screen w-full max-w-[420px] px-4 pb-32 pt-[112px]">
        <div key={resolvedPath} className="min-w-0 transition-all duration-300 ease-out">
          {renderPage()}
        </div>
      </main>

      {!isModalOpen ? <BottomNav items={navItems} activeId={activeNavId} onNavigate={navigateWithScroll} /> : null}

      <RegisterProductModal
        open={activeModal === 'register'}
        onClose={closeModal}
        productOptions={ownershipProductOptions}
        onSubmit={handleRegisterProduct}
      />
      <ServiceRequestModal
        open={activeModal === 'service'}
        onClose={closeModal}
        products={products}
        onSubmit={handleRaiseServiceRequest}
      />
    </div>
  );
};

export default CustomerDashboard;
