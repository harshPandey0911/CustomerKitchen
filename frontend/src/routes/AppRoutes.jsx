import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Auth pages
import CustomerLogin from '../pages/auth/CustomerLogin';
import Signup from '../pages/auth/Signup';
import VerifyOtp from '../pages/auth/VerifyOtp';
import AdminLogin from '../pages/auth/AdminLogin';
import SubAdminLogin from '../pages/auth/SubAdminLogin';
import DistributorLogin from '../pages/auth/DistributorLogin';
import RetailerLogin from '../pages/auth/RetailerLogin';
import LoginHub from '../pages/auth/LoginHub';

// Dashboards
import AdminDashboard from '../pages/dashboards/AdminDashboard';
import SubAdminDashboard from '../pages/dashboards/SubAdminDashboard';
import Distributor from '../pages/dashboards/Distributor';
import RetailerDashboard from '../pages/dashboards/RetailerDashboard';
import CustomerDashboard from '../pages/dashboards/CustomerDashboard';
import CategoryProducts from '../pages/customer/CategoryProducts';
import NotFound from '../pages/NotFound';

// Guard
import ProtectedRoute from '../components/auth/ProtectedRoute';
import ScrollToTop from '../components/ScrollToTop';

// Landing
import Landing from '../pages/Landing';

const AppRoutes = () => {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login-hub" element={<LoginHub />} />

        {/* Explicit auth routes - keep role routes above wildcard */}
        <Route path="/login" element={<CustomerLogin />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/subadmin/login" element={<SubAdminLogin />} />
        <Route path="/distributer/login" element={<Navigate to="/distributor/login" replace />} />
        <Route path="/distributor/login" element={<DistributorLogin />} />
        <Route path="/retailer/login" element={<RetailerLogin />} />
        <Route path="/customer/login" element={<CustomerLogin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />

        {/* Protected role routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={['admin']} redirectTo="/admin/login">
              <Navigate to="/admin/dashboard" replace />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRoles={['admin']} redirectTo="/admin/login">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/subadmin"
          element={
            <ProtectedRoute allowedRoles={['subadmin']} redirectTo="/subadmin/login">
              <Navigate to="/subadmin/dashboard" replace />
            </ProtectedRoute>
          }
        />
        <Route
          path="/subadmin/dashboard"
          element={
            <ProtectedRoute allowedRoles={['subadmin']} redirectTo="/subadmin/login">
              <SubAdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/distributor"
          element={
            <ProtectedRoute allowedRoles={['distributor']} redirectTo="/distributor/login">
              <Navigate to="/distributor/dashboard" replace />
            </ProtectedRoute>
          }
        />
        <Route path="/distributer" element={<Navigate to="/distributor" replace />} />
        <Route path="/distributer/dashboard" element={<Navigate to="/distributor/dashboard" replace />} />
        <Route path="/distributer/retailers" element={<Navigate to="/distributor/retailers" replace />} />
        <Route
          path="/distributor/dashboard"
          element={
            <ProtectedRoute allowedRoles={['distributor']} redirectTo="/distributor/login">
              <Distributor />
            </ProtectedRoute>
          }
        />
        <Route
          path="/distributor/retailers"
          element={
            <ProtectedRoute allowedRoles={['distributor']} redirectTo="/distributor/login">
              <Distributor initialSection="retailers" />
            </ProtectedRoute>
          }
        />

        <Route
          path="/retailer"
          element={
            <ProtectedRoute allowedRoles={['retailer']} redirectTo="/retailer/login">
              <Navigate to="/retailer/dashboard" replace />
            </ProtectedRoute>
          }
        />
        <Route
          path="/retailer/dashboard"
          element={
            <ProtectedRoute allowedRoles={['retailer']} redirectTo="/retailer/login">
              <RetailerDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/customer"
          element={
            <ProtectedRoute allowedRoles={['customer']} redirectTo="/customer/login">
              <Navigate to="/customer/home" replace />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customer/home"
          element={
            <ProtectedRoute allowedRoles={['customer']} redirectTo="/customer/login">
              <CustomerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customer/products"
          element={
            <ProtectedRoute allowedRoles={['customer']} redirectTo="/customer/login">
              <CustomerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customer/register-product"
          element={
            <ProtectedRoute allowedRoles={['customer']} redirectTo="/customer/login">
              <CustomerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customer/service"
          element={
            <ProtectedRoute allowedRoles={['customer']} redirectTo="/customer/login">
              <CustomerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customer/notifications"
          element={
            <ProtectedRoute allowedRoles={['customer']} redirectTo="/customer/login">
              <CustomerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customer/profile"
          element={
            <ProtectedRoute allowedRoles={['customer']} redirectTo="/customer/login">
              <CustomerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customer/edit-profile"
          element={
            <ProtectedRoute allowedRoles={['customer']} redirectTo="/customer/login">
              <CustomerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customer/profile/edit"
          element={
            <ProtectedRoute allowedRoles={['customer']} redirectTo="/customer/login">
              <CustomerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customer/support"
          element={
            <ProtectedRoute allowedRoles={['customer']} redirectTo="/customer/login">
              <CustomerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customer/about"
          element={
            <ProtectedRoute allowedRoles={['customer']} redirectTo="/customer/login">
              <CustomerDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/customer/shop" element={<Navigate to="/customer/home" replace />} />
        <Route path="/customer/orders" element={<Navigate to="/customer/service" replace />} />
        <Route path="/customer/more" element={<Navigate to="/customer/profile" replace />} />
        <Route
          path="/customer/category/:category"
          element={
            <ProtectedRoute allowedRoles={['customer']} redirectTo="/customer/login">
              <CategoryProducts />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
