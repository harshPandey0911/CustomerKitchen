# Kitchen Appliance - Dynamic Role-Based Login System

## Overview

A single `Login.jsx` component that dynamically changes UI based on URL route parameters. No need for separate login pages!

---

## Route Structure

### New Dynamic Routes (Single Component)

| Route | UI Type | Purpose |
|-------|---------|---------|
| `/login` | Phone + OTP | Customer login (default) |
| `/login/admin` | Email + Password | Admin login |
| `/login/subadmin` | Email + Password | Sub Admin login |
| `/login/distributor` | Email + Password | Distributor login |
| `/login/retailer` | Email + Password | Retailer login |

### How It Works

```jsx
// In Login.jsx
const { role: urlRole } = useParams();
const currentRole = urlRole || 'customer';  // Default to customer

// Show different UI based on role
if (config.showPhoneOtp) {
  // Show phone + OTP form (customer only)
} else {
  // Show email + password form (all other roles)
}
```

---

## Test URLs

### Customer (Phone + OTP)
```
http://localhost:5173/login
```
- **Credentials**: Phone: 9876543210, OTP: 123456
- **Redirects to**: `/customer-dashboard`

### Admin (Email + Password)
```
http://localhost:5173/login/admin
```
- **Credentials**: Email: admin@kitchenappliance.com, Password: (any)
- **Redirects to**: `/admin-dashboard`

### Sub Admin (Email + Password)
```
http://localhost:5173/login/subadmin
```
- **Credentials**: Email: subadmin@kitchenappliance.com, Password: (any)
- **Redirects to**: `/subadmin-dashboard`

### Distributor (Email + Password)
```
http://localhost:5173/login/distributor
```
- **Credentials**: Email: distributor@kitchenappliance.com, Password: (any)
- **Redirects to**: `/distributor-dashboard`

### Retailer (Email + Password)
```
http://localhost:5173/login/retailer
```
- **Credentials**: Email: retailer@kitchenappliance.com, Password: (any)
- **Redirects to**: `/retailer-dashboard`

---

## Features

### Dynamic UI Based on Role

```javascript
const roleConfig = {
  customer: {
    icon: '👤',
    title: 'Welcome back',
    subtitle: 'Sign in to your account to continue',
    showPhoneOtp: true,  // Show phone input
  },
  admin: {
    icon: '👨‍💼',
    title: 'Admin Login',
    subtitle: 'Sign in to your admin account',
    showPhoneOtp: false,  // Show email + password
  },
  // ... other roles
};
```

### Conditional Form Rendering

```jsx
{config.showPhoneOtp ? (
  // Customer: Phone + OTP form
  <form onSubmit={handleSendOtp}>
    {/* Phone input */}
  </form>
) : (
  // Other roles: Email + Password form
  <form onSubmit={handleEmailPasswordLogin}>
    {/* Email & password inputs */}
  </form>
)}
```

### Auto-Redirect After Login

```javascript
const dashboardMap = {
  customer: '/customer-dashboard',
  admin: '/admin-dashboard',
  subadmin: '/subadmin-dashboard',
  distributor: '/distributor-dashboard',
  retailer: '/retailer-dashboard',
};

navigate(dashboardMap[currentRole]);
```

---

## Authentication Flow

### Step 1: User visits login page
```
/login/admin → Shows admin login form
/login → Shows customer login form
```

### Step 2: Component gets role from URL
```javascript
const { role } = useParams();
const currentRole = role || 'customer';
```

### Step 3: Display correct form based on role
```
Admin/SubAdmin/Distributor/Retailer → Email + Password
Customer → Phone + OTP
```

### Step 4: Save to localStorage
```javascript
localStorage.setItem('role', currentRole);
localStorage.setItem('loginData', {
  email: 'admin@kitchenappliance.com',  // or phone for customers
  role: 'admin',
  isLoggedIn: true
});
```

### Step 5: Redirect to dashboard
```
Admin → /admin-dashboard
Customer → /customer-dashboard
// etc.
```

---

## Code Structure

### Single Login Component (200 lines)
```jsx
import { useParams } from 'react-router-dom';

const Login = () => {
  const { role: urlRole } = useParams();
  const currentRole = urlRole || 'customer';

  // Configure UI based on role
  const config = roleConfig[currentRole];

  // Handle different login flows
  const handleSendOtp = async (e) => { /* ... */ };
  const handleEmailPasswordLogin = async (e) => { /* ... */ };

  return (
    <div>
      {config.showPhoneOtp ? (
        <PhoneForm />
      ) : (
        <EmailPasswordForm />
      )}
    </div>
  );
};
```

---

## Benefits

✅ **Single Component** - No need for 5 separate login files
✅ **DRY Code** - Reusable roleConfig for all roles
✅ **Easy Maintenance** - Update UI in one place
✅ **Scalable** - Add new roles easily
✅ **Type-Safe** - Fallback to 'customer' if no role provided
✅ **URL-Based** - Route determines what UI to show

---

## Backward Compatibility

Old routes still work:
- `/admin-login` → Still works (separate component)
- `/subadmin-login` → Still works (separate component)
- etc.

**New preferred routes:**
- `/login/admin` → Dynamic component
- `/login/subadmin` → Dynamic component
- etc.

---

## Customization

### Add New Role

1. Add to `roleConfig`:
```javascript
const roleConfig = {
  // ... existing roles
  newrole: {
    icon: '🎯',
    title: 'New Role Login',
    subtitle: 'Sign in to your account',
    showPhoneOtp: false,
  },
};
```

2. Add to `dashboardMap`:
```javascript
const dashboardMap = {
  // ... existing roles
  newrole: '/newrole-dashboard',
};
```

3. That's it! Route `/login/newrole` will work automatically!

---

## localStorage Structure

```javascript
// After customer login
{
  phone: "9876543210",
  role: "customer",
  userName: "User_3210",
  isLoggedIn: false,  // Waits for OTP verification
  loginTime: "4/2/2026, 2:31:45 PM"
}

// After admin login
{
  email: "admin@kitchenappliance.com",
  role: "admin",
  userName: "admin_admin",
  isLoggedIn: true,  // Immediately logged in
  loginTime: "4/2/2026, 2:31:45 PM"
}
```

---

## File Structure

```
src/
├── pages/
│   └── auth/
│       ├── Login.jsx                   (SINGLE dynamic component!)
│       ├── Signup.jsx
│       ├── VerifyOtp.jsx
│       ├── AdminLogin.jsx              (Legacy - optional)
│       ├── SubAdminLogin.jsx           (Legacy - optional)
│       ├── DistributorLogin.jsx        (Legacy - optional)
│       ├── RetailerLogin.jsx           (Legacy - optional)
│       └── LoginHub.jsx
└── routes/
    └── AppRoutes.jsx                   (Updated with /login/:role)
```

---

## Migration Notes

### Old Way (5 separate files):
```jsx
/admin-login → AdminLogin.jsx
/subadmin-login → SubAdminLogin.jsx
/distributor-login → DistributorLogin.jsx
/retailer-login → RetailerLogin.jsx
/login → Login.jsx
```

### New Way (1 file):
```jsx
/login → Login.jsx (default: customer)
/login/admin → Login.jsx (role: admin)
/login/subadmin → Login.jsx (role: subadmin)
/login/distributor → Login.jsx (role: distributor)
/login/retailer → Login.jsx (role: retailer)
```

---

## Advantages Over Separate Components

| Aspect | Separate Files | Single Dynamic |
|--------|----------|---------|
| Files | 5 components | 1 component |
| Code Duplication | High | Zero |
| Styling | 5x styled | 1x styled |
| Maintenance | Complex | Simple |
| New Roles | Add new file | Add roleConfig |
| Testing | Test each file | Test 1 file |

---

Last Updated: April 2, 2026
Version: 2.0 (Dynamic)

