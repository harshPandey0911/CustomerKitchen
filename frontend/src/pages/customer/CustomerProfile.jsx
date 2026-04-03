import { APP_NAME } from '../../constants/branding';
import ProfileCard from '../../components/customer/profile/ProfileCard';
import StatsCards from '../../components/customer/profile/StatsCards';
import AccountSection from '../../components/customer/profile/AccountSection';
import SupportSection from '../../components/customer/profile/SupportSection';

export default function CustomerProfile({ profile, avatarInitial = 'H', products, serviceRequests, unreadCount, onNavigate }) {
  const openRequests = serviceRequests.filter((request) => request.status !== 'Completed').length;

  const accountActions = [
    {
      label: 'My Products',
      meta: `${products.length} registered appliance${products.length === 1 ? '' : 's'}`,
      path: '/customer/products',
      icon: 'products',
    },
    {
      label: 'Register Product',
      meta: 'Add a new appliance to the dashboard',
      path: '/customer/register-product',
      icon: 'register',
    },
  ];

  const supportActions = [
    { label: 'Support', meta: `Talk to the ${APP_NAME} support team`, path: '/customer/support', icon: 'support' },
    { label: 'About', meta: 'See product dashboard details and version info', path: '/customer/about', icon: 'about' },
  ];

  const stats = [
    { label: 'Registered Products', value: products.length },
    { label: 'Open Requests', value: openRequests },
    { label: 'Notifications', value: unreadCount },
  ];

  return (
    <div className="space-y-4">
      <ProfileCard
        avatarInitial={avatarInitial}
        fullName={profile?.fullName || 'Customer'}
        email={profile?.email || 'customer@kitchenappliance.com'}
      />
      <StatsCards stats={stats} />
      <AccountSection actions={accountActions} onNavigate={onNavigate} />
      <SupportSection actions={supportActions} onNavigate={onNavigate} />
    </div>
  );
}
