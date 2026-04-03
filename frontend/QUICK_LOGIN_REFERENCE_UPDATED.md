# Kitchen Appliance - Quick Access URLs (Updated: Dynamic Login System)

## Landing & Hub
- http://localhost:5173/              - Home/Landing
- http://localhost:5173/login-hub     - Login Hub (Select Role)

---

## Dynamic Role-Based Login (NEW - Single Component!)

### Customer (Phone + OTP)
- http://localhost:5173/login         - Go Here
- Phone: 9876543210, OTP: 123456
- → Redirects to: /customer-dashboard

### Admin (Email + Password)
- http://localhost:5173/login/admin   - Go Here
- Email: admin@kitchenappliance.com, Password: (any)
- → Redirects to: /admin-dashboard

### Sub Admin (Email + Password)
- http://localhost:5173/login/subadmin - Go Here
- Email: subadmin@kitchenappliance.com, Password: (any)
- → Redirects to: /subadmin-dashboard

### Distributor (Email + Password)
- http://localhost:5173/login/distributor - Go Here
- Email: distributor@kitchenappliance.com, Password: (any)
- → Redirects to: /distributor-dashboard

### Retailer (Email + Password)
- http://localhost:5173/login/retailer - Go Here
- Email: retailer@kitchenappliance.com, Password: (any)
- → Redirects to: /retailer-dashboard

---

## Legacy Routes (Still Work for Backward Compatibility)

### Admin
- http://localhost:5173/admin-login

### Sub Admin
- http://localhost:5173/subadmin-login

### Distributor
- http://localhost:5173/distributor-login

### Retailer
- http://localhost:5173/retailer-login

---

## Protected Dashboards
- http://localhost:5173/admin or /admin-dashboard
- http://localhost:5173/subadmin or /subadmin-dashboard
- http://localhost:5173/distributor or /distributor-dashboard
- http://localhost:5173/retailer or /retailer-dashboard
- http://localhost:5173/customer or /customer-dashboard

---

## How to Test

### Flow 1: Admin Login (Dynamic Route)
1. Go to: http://localhost:5173/login/admin
2. Email: admin@kitchenappliance.com
3. Password: anything
4. Click Login
5. Redirects to: /admin-dashboard

### Flow 2: Customer Login (Dynamic Route)
1. Go to: http://localhost:5173/login
2. Phone: 9876543210
3. Click "Send OTP"
4. Enter OTP: 123456
5. Redirects to: /customer-dashboard

### Flow 3: Sub Admin Login (Dynamic Route)
1. Go to: http://localhost:5173/login/subadmin
2. Email: subadmin@kitchenappliance.com
3. Password: anything
4. Click Login
5. Redirects to: /subadmin-dashboard

### Flow 4: Access Control Test
1. After admin login
2. Try to access: /customer-dashboard
3. Will redirect back to: /admin-dashboard

---

## Key Features

✅ One dynamic Login component for all roles
✅ Role-based UI: Phone+OTP for customer, Email+Password for others
✅ URL parameter determines login form
✅ Protected routes (ProtectedRoute component)
✅ localStorage-based session
✅ Automatic role-based redirects
✅ Tailwind CSS styling (gray-100 bg, white cards, indigo buttons)
✅ Backward compatible with old routes

---

## Advantage: NEW Dynamic System

| Aspect | Old System (5 files) | New System (1 file) |
|--------|----------|---------|
| Files | 5 separate components | 1 dynamic component |
| Routes | /admin-login, /subadmin-login, etc. | /login/admin, /login/subadmin, etc. |
| Code | Duplicated across files | Single source of truth |
| Maintenance | Update 5 files | Update 1 file |
| New Roles | Add new component + file | Add roleConfig entry |

---

Created: April 2, 2026
Updated: Version 2.0 (Dynamic Login System)

