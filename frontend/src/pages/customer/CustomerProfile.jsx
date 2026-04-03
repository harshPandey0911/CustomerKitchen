import { APP_NAME } from '../../constants/branding';

const cardClass = 'rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/60';

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
        <div className={cardClass}>
          <p className="text-sm text-slate-500">Registered Products</p>
          <p className="mt-3 text-3xl font-semibold text-slate-950">{products.length}</p>
          <p className="mt-2 text-sm text-slate-500">Appliances currently tracked</p>
        </div>
        <div className={cardClass}>
          <p className="text-sm text-slate-500">Open Service Requests</p>
          <p className="mt-3 text-3xl font-semibold text-slate-950">{openRequests}</p>
          <p className="mt-2 text-sm text-slate-500">Requests still waiting on completion</p>
        </div>
        <div className={cardClass}>
          <p className="text-sm text-slate-500">Unread Notifications</p>
          <p className="mt-3 text-3xl font-semibold text-slate-950">{unreadCount}</p>
          <p className="mt-2 text-sm text-slate-500">Fresh alerts across warranty and service</p>
        </div>
      </section>

      <section className="grid gap-5 xl:grid-cols-2">
        <div className={cardClass}>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">Account</p>
          <div className="mt-5 overflow-hidden rounded-3xl border border-slate-200">
            {accountActions.map((action) => (
              <button
                key={action.label}
                type="button"
                onClick={() => onNavigate(action.path)}
                className="flex w-full items-center justify-between gap-3 border-b border-slate-200 px-5 py-4 text-left transition-colors duration-200 last:border-b-0 hover:bg-slate-50"
              >
                <div>
                  <p className="font-medium text-slate-950">{action.label}</p>
                  <p className="mt-1 text-sm text-slate-500">{action.meta}</p>
                </div>
                <span className="text-slate-300">&gt;</span>
              </button>
            ))}
          </div>
        </div>

        <div className={cardClass}>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">Support</p>
          <div className="mt-5 overflow-hidden rounded-3xl border border-slate-200">
            {supportActions.map((action) => (
              <button
                key={action.label}
                type="button"
                onClick={() => onNavigate(action.path)}
                className="flex w-full items-center justify-between gap-3 border-b border-slate-200 px-5 py-4 text-left transition-colors duration-200 last:border-b-0 hover:bg-slate-50"
              >
                <div>
                  <p className="font-medium text-slate-950">{action.label}</p>
                  <p className="mt-1 text-sm text-slate-500">{action.meta}</p>
                </div>
                <span className="text-slate-300">&gt;</span>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
