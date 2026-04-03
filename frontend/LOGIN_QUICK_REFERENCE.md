# Login System - Quick Reference Card

## 🎯 Demo Credentials (One-Click Login)

```
┌─────────────────────────────────────────────────────────────┐
│                     ADMIN USER                              │
├─────────────────────────────────────────────────────────────┤
│ Email:       admin@test.com                                 │
│ Password:    password123                                    │
│ Role:        Admin                                          │
│ Dashboard:   /admin-dashboard                               │
│ Access:      Full system access ⚙️                          │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                   SUB ADMIN USER                            │
├─────────────────────────────────────────────────────────────┤
│ Email:       subadmin@test.com                              │
│ Password:    password123                                    │
│ Role:        Sub Admin                                      │
│ Dashboard:   /subadmin-dashboard                            │
│ Access:      Limited operational access 👨‍💼                │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                 DISTRIBUTOR USER                            │
├─────────────────────────────────────────────────────────────┤
│ Email:       distributor@test.com                           │
│ Password:    password123                                    │
│ Role:        Distributor                                    │
│ Dashboard:   /distributor-dashboard                         │
│ Access:      Distribution management 🚚                     │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                   RETAILER USER                             │
├─────────────────────────────────────────────────────────────┤
│ Email:       retailer@test.com                              │
│ Password:    password123                                    │
│ Role:        Retailer                                       │
│ Dashboard:   /retailer-dashboard                            │
│ Access:      Retail store management 🏪                     │
└─────────────────────────────────────────────────────────────┘
```

## 🔑 How to Login

### Option 1: Click Demo Credentials
1. Go to `/login`
2. Click any demo credential card
3. Auto-filled and authenticated instantly
4. Redirected to role dashboard

### Option 2: Manual Login
1. Go to `/login`
2. Enter email (must contain: admin/subadmin/distributor/retailer)
3. Enter password (min 6 characters)
4. Click "Login"
5. Role detected → redirected to dashboard

## 📧 Email-to-Role Mapping

| Email Keyword | Role | Icon |
|---|---|---|
| Contains `admin` | Admin | ⚙️ |
| Contains `subadmin` | Sub Admin | 👨‍💼 |
| Contains `distributor` | Distributor | 🚚 |
| Contains `retailer` | Retailer | 🏪 |

**Examples:**
- `admin@company.com` → Admin Dashboard
- `john.subadmin@app.com` → Sub Admin Dashboard
- `distributor.team@business.com` → Distributor Dashboard
- `retailer123@store.com` → Retailer Dashboard

## ⚡ Quick Test Cases

### Test Case 1: Valid Admin Login
```
Email: admin@test.com
Password: password123
Expected: Redirect to /admin-dashboard ✅
```

### Test Case 2: Empty Fields
```
Email: (empty)
Password: (empty)
Expected: Error "Please enter both email and password" ❌
```

### Test Case 3: Short Password
```
Email: admin@test.com
Password: pass
Expected: Error "Password must be at least 6 characters" ❌
```

### Test Case 4: Role Detection
```
Email: distributor.test@company.com
Password: password123
Expected: Redirect to /distributor-dashboard ✅
```

### Test Case 5: Demo Click
```
Click: Distributor demo card
Expected: Auto-fill & redirect to /distributor-dashboard ✅
```

## 🎨 UI Features

- ✅ Dark modern theme
- ✅ Glassmorphism design
- ✅ Animated gradients
- ✅ Responsive mobile
- ✅ Toast notifications
- ✅ Loading states
- ✅ Error messages
- ✅ One-click demos

## 💾 LocalStorage Data

After successful login, browser stores:
```javascript
localStorage.getItem('loginData')
// Returns:
{
  email: "admin@test.com",
  userName: "admin",
  role: "Admin",
  isLoggedIn: true,
  loginTime: "2026-04-02T12:30:45.123Z"
}
```

## 🚪 Logout

To logout, any dashboard component can use:
```javascript
localStorage.removeItem('loginData');
navigate('/login');
```

Then login info is cleared and user redirected to login page.

## ⚠️ Common Issues

### Issue: Login not redirecting
**Solution:** 
- Check email contains role keyword (admin/subadmin/etc)
- Verify `/admin-dashboard` route exists in AppRoutes
- Check browser console for errors

### Issue: Demo credentials not working
**Solution:**
- Clear browser cache
- Try manual login instead
- Check localStorage is enabled

### Issue: Form validation not showing
**Solution:**
- Make sure fields are empty
- Check console for js errors
- Refresh page

## 📱 Login Page URL

```
http://localhost:5173/login
```

Replace `localhost:5173` with your actual dev/production URL.

## 🔐 Password Requirements

- Minimum 6 characters
- No special character requirements (demo only)
- Case-sensitive

**Example valid passwords:**
- password123
- MyPass456
- 123456
- testpass

## 📊 After Login

### Admin Dashboard Features
- 📊 Sales analytics
- 📦 Inventory management
- 🛒 Order management
- 📝 Reports & analytics
- 👥 Sub admin management
- 🔧 Service requests

### Distributor Dashboard
- 🚚 Distribution tracking
- 📦 Inventory
- 🛒 Orders
- 💰 Revenue

### Retailer Dashboard
- 🏪 Store management
- 📊 Sales
- 📦 Stock
- 💳 Transactions

### Sub Admin Dashboard
- ⚙️ Limited admin functions
- 📋 Management features

## 📞 Support

For login issues:
1. Check browser console (F12)
2. Verify localStorage
3. Clear cache and retry
4. Check network tab for API errors

---

**Status:** ✅ Live & Ready
**Last Updated:** April 2, 2026
**Version:** 1.0 Pro

