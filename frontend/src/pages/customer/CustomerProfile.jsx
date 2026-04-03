import { APP_NAME } from '../../constants/branding';

const cardClass = 'customer-surface customer-card-item rounded-[28px] p-5';

export default function CustomerProfile({ products, serviceRequests, unreadCount, onNavigate }) {
  const openRequests = serviceRequests.filter((request) => request.status !== 'Completed').length;

  const accountActions = [
    {
      label: 'My Products',
      meta: `${products.length} registered appliance${products.length === 1 ? '' : 's'}`,
      path: '/customer/products',
    },
    {
      label: 'Register Product',
      meta: 'Add a new appliance to the dashboard',
      path: '/customer/register-product',
    },
    {
      label: 'Service Requests',
      meta: `${openRequests} active request${openRequests === 1 ? '' : 's'}`,
      path: '/customer/service',
    },
    {
      label: 'Notifications',
      meta: `${unreadCount} unread update${unreadCount === 1 ? '' : 's'}`,
      path: '/customer/notifications',
    },
  ];

  const supportActions = [
    { label: 'Support', meta: `Talk to the ${APP_NAME} support team`, path: '/customer/support' },
    { label: 'About', meta: 'See product dashboard details and version info', path: '/customer/about' },
  ];

  return (
    <div className="space-y-6 lg:space-y-8">
      <section className="grid gap-4 md:grid-cols-3">
        <div className={`${cardClass} customer-stat-card`}>
          <p className="text-[17px] font-bold text-gray-900">Registered Products</p>
          <p className="mt-3 text-3xl font-bold text-black">{products.length}</p>
          <p className="mt-2 text-sm text-gray-700">Appliances currently tracked</p>
        </div>
        <div className={`${cardClass} customer-stat-card`}>
          <p className="text-[17px] font-bold text-gray-900">Open Service Requests</p>
          <p className="mt-3 text-3xl font-bold text-black">{openRequests}</p>
          <p className="mt-2 text-sm text-gray-700">Requests still waiting on completion</p>
        </div>
        <div className={`${cardClass} customer-stat-card`}>
          <p className="text-[17px] font-bold text-gray-900">Unread Notifications</p>
          <p className="mt-3 text-3xl font-bold text-black">{unreadCount}</p>
          <p className="mt-2 text-sm text-gray-700">Fresh alerts across warranty and service</p>
        </div>
      </section>

      <section className="grid gap-5 xl:grid-cols-2">
        <div className={cardClass}>
          <p className="customer-label text-xs font-semibold uppercase tracking-[0.28em]">Account</p>
          <div className="customer-section-wrapper mt-5 space-y-3">
            {accountActions.map((action) => (
              <button
                key={action.label}
                type="button"
                onClick={() => onNavigate(action.path)}
                className="customer-card-item customer-card-row flex w-full text-left"
              >
                <div>
                  <p className="customer-section-title text-[15px] font-semibold">{action.label}</p>
                  <p className="customer-section-subtext mt-1 text-sm">{action.meta}</p>
                </div>
                <span className="customer-card-arrow">&gt;</span>
              </button>
            ))}
          </div>
        </div>

        <div className={cardClass}>
          <p className="customer-label text-xs font-semibold uppercase tracking-[0.28em]">Support</p>
          <div className="customer-section-wrapper mt-5 space-y-3">
            {supportActions.map((action) => (
              <button
                key={action.label}
                type="button"
                onClick={() => onNavigate(action.path)}
                className="customer-card-item customer-card-row flex w-full text-left"
              >
                <div>
                  <p className="customer-section-title text-[15px] font-semibold">{action.label}</p>
                  <p className="customer-section-subtext mt-1 text-sm">{action.meta}</p>
                </div>
                <span className="customer-card-arrow">&gt;</span>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
