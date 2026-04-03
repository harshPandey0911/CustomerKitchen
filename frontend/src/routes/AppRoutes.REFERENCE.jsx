// Reference route patterns for this project.
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Landing from '../pages/Landing';
import CustomerLogin from '../pages/auth/CustomerLogin';
import VerifyOtp from '../pages/auth/VerifyOtp';
import AdminLogin from '../pages/auth/AdminLogin';
import SubAdminLogin from '../pages/auth/SubAdminLogin';
import DistributorLogin from '../pages/auth/DistributorLogin';
import RetailerLogin from '../pages/auth/RetailerLogin';
import Signup from '../pages/auth/Signup';
import AdminDashboard from '../pages/dashboards/AdminDashboard';
import SubAdminDashboard from '../pages/dashboards/SubAdminDashboard';
import Distributor from '../pages/dashboards/Distributor';
import RetailerDashboard from '../pages/dashboards/RetailerDashboard';
import CustomerDashboard from '../pages/dashboards/CustomerDashboard';
import NotFound from '../pages/NotFound';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<CustomerLogin />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/subadmin/login" element={<SubAdminLogin />} />
        <Route path="/distributor/login" element={<DistributorLogin />} />
        <Route path="/retailer/login" element={<RetailerLogin />} />
        <Route path="/customer/login" element={<CustomerLogin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />

        {/* Role dashboards */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/subadmin/dashboard" element={<SubAdminDashboard />} />
        <Route path="/distributor/dashboard" element={<Distributor />} />
        <Route path="/retailer/dashboard" element={<RetailerDashboard />} />
        <Route path="/customer/home" element={<CustomerDashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
