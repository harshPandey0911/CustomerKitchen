# Kitchen Appliance - Quick Access URLs

## Landing & Hub
- http://localhost:5173/              - Home/Landing
- http://localhost:5173/login-hub     - Login Hub (Select Role)

---

## Customer Login (Phone + OTP)
- http://localhost:5173/login         - Customer Login with Phone
- http://localhost:5173/signup        - Customer Registration
- http://localhost:5173/verify-otp    - Verify OTP

Test: Enter phone 9876543210 → OTP 123456

---

## Role-Based Login (Email + Password)

### Admin
- http://localhost:5173/admin-login   - Go Here
- http://localhost:5173/admin         - Dashboard (after login)
- → Test: admin@kitchenappliance.com / password123

### Sub Admin
- http://localhost:5173/subadmin-login    - Go Here
- http://localhost:5173/subadmin          - Dashboard (after login)
- → Test: subadmin@kitchenappliance.com / password123

### Distributor
- http://localhost:5173/distributor-login - Go Here
- http://localhost:5173/distributor       - Dashboard (after login)
- → Test: distributor@kitchenappliance.com / password123

### Retailer
- http://localhost:5173/retailer-login    - Go Here
- http://localhost:5173/retailer          - Dashboard (after login)
- → Test: retailer@kitchenappliance.com / password123

### Customer
- http://localhost:5173/customer      - Customer Dashboard (after OTP login)

---

## Alternative Routes (Same as above)
- /admin-dashboard
- /subadmin-dashboard
- /distributor-dashboard
- /retailer-dashboard
- /customer-dashboard

---

## How to Test

### Flow 1: Admin Login
1. Go to: http://localhost:5173/admin-login
2. Email: admin@kitchenappliance.com
3. Password: anything
4. Click Login
5. Redirects to: /admin-dashboard

### Flow 2: Customer Login
1. Go to: http://localhost:5173/login
2. Phone: 9876543210
3. Click "Send OTP"
4. Enter OTP: 123456
5. Redirects to: /customer-dashboard

### Flow 3: Access Control Test
1. After admin login
2. Try to access: /customer-dashboard
3. Will redirect back to: /admin-dashboard

---

## Key Features

✅ Role-based separate login pages
✅ Email + Password for admin/subadmin/distributor/retailer
✅ Phone + OTP for customers
✅ Protected routes (ProtectedRoute component)
✅ localStorage-based session
✅ Automatic role-based redirects
✅ Tailwind CSS styling
✅ Error handling & validation

---

Created: April 2, 2026

