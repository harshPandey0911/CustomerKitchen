import { formatDisplayDate, getWarrantyDetails } from '../../data/customerOwnership';

const surfaceClass = 'rounded-3xl border border-slate-200 bg-white/90 p-5 shadow-sm shadow-slate-200/60 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md';

const getRequestBadgeClass = (status) => {
  if (status === 'Completed') {
    return 'bg-emerald-50 text-emerald-700';
  }

  if (status === 'In Progress') {
    return 'bg-amber-50 text-amber-700';
  }

  return 'bg-slate-100 text-slate-700';
};

const getNotificationAccent = (tone) => {
  if (tone === 'success') {
    return 'bg-emerald-100';
  }

  if (tone === 'warning') {
    return 'bg-amber-100';
  }

  if (tone === 'danger') {
    return 'bg-rose-100';
  }

  if (tone === 'accent') {
    return 'bg-sky-100';
  }

  return 'bg-slate-100';
};

export default function CustomerHome({ userName, products, serviceRequests, notifications, unreadCount, onNavigate }) {
  const productSnapshots = products.map((product) => ({
    ...product,
    warranty: getWarrantyDetails(product.purchaseDate, product.warrantyMonths),
  }));

  const activeWarrantyCount = productSnapshots.filter((product) => product.warranty.status === 'active').length;
  const openRequestCount = serviceRequests.filter((request) => request.status !== 'Completed').length;
  const expiringSoonProducts = productSnapshots
    .filter((product) => product.warranty.status === 'active' && product.warranty.daysRemaining <= 45)
    .sort((left, right) => left.warranty.daysRemaining - right.warranty.daysRemaining)
    .slice(0, 3);
  const recentRequests = [...serviceRequests]
    .sort((left, right) => new Date(right.updatedAt || right.createdAt).getTime() - new Date(left.updatedAt || left.createdAt).getTime())
    .slice(0, 3);

  const stats = [
    { label: 'Registered Products', value: products.length, meta: 'Appliances under one dashboard' },
    { label: 'Active Warranties', value: activeWarrantyCount, meta: 'Coverage currently available' },
    { label: 'Open Requests', value: openRequestCount, meta: 'Jobs still in motion' },
    { label: 'Unread Alerts', value: unreadCount, meta: 'Warranty and service updates' },
  ];

  const quickActions = [
    {
      label: 'Register Product',
      description: 'Add a new appliance with invoice and warranty details.',
      path: '/customer/register-product',
    },
    {
      label: 'My Products',
      description: 'Review ownership history and warranty progress visually.',
      path: '/customer/products',
    },
    {
      label: 'Raise Service Request',
      description: 'Log a repair, installation, or replacement in seconds.',
      path: '/customer/service',
    },
    {
      label: 'Notifications',
      description: 'Stay on top of expiring coverage and service updates.',
      path: '/customer/notifications',
    },
  ];

  return (
    <div className="space-y-6 lg:space-y-8">
      <section className="mx-auto max-w-3xl">
        <div className="rounded-xl bg-black p-6 text-white shadow-md">
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gray-400">Product Dashboard</p>
          <h1 className="mt-3 text-xl font-semibold leading-tight text-white">Welcome back, {userName}</h1>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-gray-300">
            Manage your appliances, warranties, and service requests in one place.
          </p>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className={surfaceClass}>
            <p className="text-sm text-slate-500">{stat.label}</p>
            <p className="mt-3 text-3xl font-semibold text-slate-950">{stat.value}</p>
            <p className="mt-2 text-sm text-slate-500">{stat.meta}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.35fr_1fr]">
        <div className={surfaceClass}>
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold text-slate-950">Quick Actions</h2>
              <p className="mt-1 text-sm text-slate-500">Move through the most common ownership tasks without friction.</p>
            </div>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {quickActions.map((action) => (
              <button
                key={action.label}
                type="button"
                onClick={() => onNavigate(action.path)}
                className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-white"
              >
                <p className="text-sm font-semibold text-slate-950">{action.label}</p>
                <p className="mt-2 text-sm leading-6 text-slate-500">{action.description}</p>
                <span className="mt-4 inline-flex text-sm font-medium text-slate-700">Open</span>
              </button>
            ))}
          </div>
        </div>

        <div className={surfaceClass}>
          <h2 className="text-lg font-semibold text-slate-950">Coverage Spotlight</h2>
          <p className="mt-1 text-sm text-slate-500">Keep an eye on products that may need attention next.</p>

          <div className="mt-5 space-y-4">
            {expiringSoonProducts.length > 0 ? (
              expiringSoonProducts.map((product) => (
                <div key={product.id} className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-medium text-slate-950">{product.productName}</p>
                      <p className="mt-1 text-sm text-slate-500">{product.brand} / {product.modelNumber}</p>
                    </div>
                    <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
                      {product.warranty.daysRemaining} days left
                    </span>
                  </div>
                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-200">
                    <div
                      className="h-full rounded-full bg-amber-500 transition-all duration-300"
                      style={{ width: `${product.warranty.progressPercent}%` }}
                    />
                  </div>
                  <p className="mt-3 text-sm text-slate-500">Expires on {formatDisplayDate(product.warranty.expiryDate)}</p>
                </div>
              ))
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50/70 p-5 text-sm leading-6 text-slate-500">
                Your active warranties look healthy right now. Newly registered products will show up here automatically.
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.2fr_1fr]">
        <div className={surfaceClass}>
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold text-slate-950">Recent Service Activity</h2>
              <p className="mt-1 text-sm text-slate-500">Track progress across repairs, installations, and replacements.</p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('/customer/service')}
              className="text-sm font-medium text-slate-700 transition-colors duration-200 hover:text-black"
            >
              View all
            </button>
          </div>

          <div className="mt-5 space-y-4">
            {recentRequests.map((request) => (
              <div key={request.id} className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-medium text-slate-950">{request.productName}</p>
                    <p className="mt-1 text-sm text-slate-500">{request.issueType} / {request.id}</p>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs font-medium ${getRequestBadgeClass(request.status)}`}>
                    {request.status}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-500">{request.description}</p>
                <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-500">
                  <span>Updated {formatDisplayDate(request.updatedAt || request.createdAt)}</span>
                  <span>Technician: {request.assignedTechnician}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={surfaceClass}>
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold text-slate-950">Latest Notifications</h2>
              <p className="mt-1 text-sm text-slate-500">Important coverage and service signals in one feed.</p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('/customer/notifications')}
              className="text-sm font-medium text-slate-700 transition-colors duration-200 hover:text-black"
            >
              Open
            </button>
          </div>

          <div className="mt-5 space-y-4">
            {notifications.slice(0, 3).map((notification) => (
              <div key={notification.id} className="flex gap-3 rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
                <span className={`mt-1 h-2.5 w-2.5 flex-none rounded-full ${getNotificationAccent(notification.tone)}`} />
                <div className="min-w-0">
                  <p className="text-sm font-medium text-slate-950">{notification.title}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-500">{notification.message}</p>
                  <p className="mt-3 text-xs uppercase tracking-wide text-slate-400">{formatDisplayDate(notification.createdAt)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
