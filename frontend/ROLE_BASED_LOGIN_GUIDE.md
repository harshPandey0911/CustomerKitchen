# Kitchen Appliance Multi-Role Login System - Complete Guide

## Overview
This is a role-based authentication system with separate login pages for each role type. Each role has its own login mechanism and dashboard.

---

## Available Routes

### Public Routes
| Route | Component | Purpose |
|-------|-----------|---------|
| `/` | Landing | Home/Landing page |
| `/login-hub` | LoginHub | Central login hub showing all login options |

### Customer Login Routes
| Route | Component | Purpose |
|-------|-----------|---------|
| `/login` | Login | Customer login with phone + OTP |
| `/signup` | Signup | Customer registration |
| `/verify-otp` | VerifyOtp | OTP verification for customer login |

### Role-Based Login Routes
| Route | Component | Purpose |
|-------|-----------|---------|
| `/admin-login` | AdminLogin | Admin login (Email + Password) |
| `/subadmin-login` | SubAdminLogin | Sub Admin login (Email + Password) |
| `/distributor-login` | DistributorLogin | Distributor login (Email + Password) |
| `/retailer-login` | RetailerLogin | Retailer login (Email + Password) |

### Protected Dashboard Routes
| Route | Role | Component |
|-------|------|-----------|
| `/admin` or `/admin-dashboard` | admin | AdminDashboard |
| `/subadmin` or `/subadmin-dashboard` | subadmin | SubAdminDashboard |
| `/distributor` or `/distributor-dashboard` | distributor | DistributorDashboard |
| `/retailer` or `/retailer-dashboard` | retailer | RetailerDashboard |
| `/customer` or `/customer-dashboard` | customer | CustomerDashboard |

---

## Login Flows

### Customer Login Flow
```
/login (Phone Input)
    ↓
/verify-otp (OTP Verification)
    ↓
/customer-dashboard (Redirect on success)
```

### Admin/SubAdmin/Distributor/Retailer Flow
```
/admin-login (Email + Password)
    ↓
/admin-dashboard (Redirect on success)
```

---

## Authentication Logic

### How It Works:
1. User selects their role and goes to respective login page
2. Login page collects credentials (phone for customer, email+password for others)
3. On success, role is saved to localStorage:
   ```javascript
   localStorage.setItem("role", "admin")
   localStorage.setItem("loginData", JSON.stringify({...}))
   ```
4. ProtectedRoute component checks role before allowing access to dashboard
5. If wrong role tries to access dashboard, redirects to their own dashboard

### LocalStorage Structure:
```javascript
// LoginData
{
  phone: "9876543210",           // For customer
  email: "admin@kitchenappliance.com", // For other roles
  role: "admin",
  userName: "Admin_user",
  isLoggedIn: true,
  loginTime: "4/2/2026, 2:31:45 PM"
}

// Role (for quick access)
localStorage.getItem("role") // Returns: "admin"
```

---

## ProtectedRoute Component

The `ProtectedRoute` component validates:
- User is logged in (`isLoggedIn === true`)
- User has the correct role
- If validation fails, redirects to login or their dashboard

```javascript
// Usage:
<ProtectedRoute allowedRoles={['admin']}>
  <AdminDashboard />
</ProtectedRoute>
```

---

## UI/UX Features

### Consistent Design Across All Logins:
- **Background**: `bg-gray-100`
- **Card**: `bg-white rounded-xl shadow-md p-8`
- **Buttons**: `bg-indigo-600 hover:bg-indigo-700`
- **Form Inputs**: With focus states and validation

### Each Login Page Includes:
- Role-specific icon (👨‍💼 for admin, 📦 for distributor, etc.)
- Error messages
- Form validation
- Loading states
- Link back to customer login

---

## Testing Guide

### Test Admin Login:
1. Go to `/admin-login`
2. Enter email: `admin@kitchenappliance.com`
3. Enter password: `password123`
4. Click Login
5. Should redirect to `/admin-dashboard`

### Test Customer Login:
1. Go to `/login`
2. Enter phone: `9876543210`
3. Click "Send OTP"
4. On OTP page, enter: `123456`
5. Should redirect to `/customer-dashboard`

### Test Access Control:
1. Login as admin
2. Try accessing `/customer-dashboard`
3. Should redirect to `/admin-dashboard`

---

## File Structure

```
src/
├── pages/
│   ├── auth/
│   │   ├── Login.jsx               (Customer OTP login)
│   │   ├── Signup.jsx              (Customer registration)
│   │   ├── VerifyOtp.jsx           (OTP verification)
│   │   ├── AdminLogin.jsx          (Admin email/password)
│   │   ├── SubAdminLogin.jsx       (SubAdmin email/password)
│   │   ├── DistributorLogin.jsx    (Distributor email/password)
│   │   ├── RetailerLogin.jsx       (Retailer email/password)
│   │   └── LoginHub.jsx            (Central login selector)
│   ├── dashboards/
│   │   ├── AdminDashboard.jsx
│   │   ├── SubAdminDashboard.jsx
│   │   ├── DistributorDashboard.jsx
│   │   ├── RetailerDashboard.jsx
│   │   └── CustomerDashboard.jsx
│   └── Landing.jsx
├── routes/
│   └── AppRoutes.jsx               (All routes configuration)
└── components/
    └── auth/
        └── ProtectedRoute.jsx      (Role-based route protection)
```

---

## Common Issues & Solutions

### Issue: User redirected to login after login
**Solution**: Check localStorage has `isLoggedIn: true`

### Issue: Wrong role accessing dashboard
**Solution**: ProtectedRoute checks role, redirects to user's dashboard

### Issue: OTP not working
**Solution**: ProtectedRoute checks `isLoggedIn`, make sure it's set to true

---

## Additional Features

### Role-Based Redirects:
When a user tries to access a protected route without proper credentials:
- Unauthenticated → Redirected to `/login`
- Wrong role → Redirected to their own dashboard

### Quick Route Access:
- `/admin` → Alias for `/admin-dashboard`
- `/subadmin` → Alias for `/subadmin-dashboard`
- etc.

---

## Future Enhancements

1. Add "Remember Me" functionality
2. Implement session timeout
3. Add password reset flow
4. Add account recovery options
5. Integrate with backend API
6. Add 2FA support

---

Last Updated: April 2, 2026
Version: 1.0

