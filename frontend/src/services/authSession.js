const toTitleCase = (value) =>
  value
    .split(/[\s._-]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');

export const getLoginRouteConfig = (pathname = '') => {
  const normalizedPath = pathname.toLowerCase();

  switch (normalizedPath) {
    case '/admin/login':
      return { role: 'admin', dashboardPath: '/admin/dashboard', label: 'Admin' };
    case '/subadmin/login':
      return { role: 'subadmin', dashboardPath: '/subadmin/dashboard', label: 'Sub Admin' };
    case '/distributor/login':
    case '/distributer/login':
      return { role: 'distributor', dashboardPath: '/distributor/dashboard', label: 'Distributor' };
    case '/retailer/login':
      return { role: 'retailer', dashboardPath: '/retailer/dashboard', label: 'Retailer' };
    case '/customer/login':
    case '/login':
    default:
      return { role: 'customer', dashboardPath: '/customer/home', label: 'Customer' };
  }
};

export const saveDummyLoginSession = ({ pathname, email, rememberMe = true, displayNameOverride }) => {
  const config = getLoginRouteConfig(pathname);
  const trimmedEmail = email.trim();
  const emailName = trimmedEmail.split('@')[0] || config.label;
  const displayName = displayNameOverride?.trim() || toTitleCase(emailName) || config.label;

  const loginData = {
    email: trimmedEmail,
    role: config.role,
    userName: config.role === 'customer' ? displayName : `${config.label}_${emailName}`,
    isLoggedIn: true,
    rememberMe,
    loginTime: new Date().toLocaleString(),
  };

  localStorage.setItem('loginData', JSON.stringify(loginData));
  localStorage.setItem('role', config.role);
  localStorage.setItem(
    'user',
    JSON.stringify({
      email: trimmedEmail,
      role: config.role,
      userName: loginData.userName,
    })
  );

  console.log('Login Success');

  return { ...config, loginData };
};
