import { formatDisplayDate, getWarrantyDetails } from '../../data/customerOwnership';

const surfaceClass = 'customer-surface customer-card-item rounded-3xl p-5 transition-all duration-200 hover:-translate-y-0.5';

const getRequestBadgeClass = (status) => {
  if (status === 'Completed') {
    return 'customer-badge';
  }

  if (status === 'In Progress') {
    return 'customer-badge-soft';
  }

  return 'customer-badge-deep';
};

const getNotificationAccent = (tone) => {
  if (tone === 'success') {
    return 'bg-[#dbc7b4]';
  }

  if (tone === 'warning') {
    return 'bg-[#ead8c7]';
  }

  if (tone === 'danger') {
    return 'bg-[#cfb4a0]';
  }

  if (tone === 'accent') {
    return 'bg-[#eee4db]';
  }

  return 'bg-[#f3ece5]';
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
        <div className="customer-hero rounded-2xl p-5 text-white">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[2px] text-white/65">Product Dashboard</p>
            <h2 className="text-[22px] font-semibold leading-snug text-white">Welcome back,</h2>
            <h3 className="font-bold tracking-tight text-white">{userName}</h3>
          </div>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/75">
            Manage your appliances, warranties, and service requests in one place.
          </p>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className={`${surfaceClass} customer-stat-card`}>
            <p className="text-[17px] font-bold text-gray-900">{stat.label}</p>
            <p className="mt-3 text-3xl font-bold text-black">{stat.value}</p>
            <p className="mt-2 text-sm text-gray-700">{stat.meta}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.35fr_1fr]">
        <div className={surfaceClass}>
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="customer-section-title text-lg font-bold">Quick Actions</h2>
              <p className="customer-section-subtext mt-1 text-sm">Move through the most common ownership tasks without friction.</p>
            </div>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {quickActions.map((action) => (
              <button
                key={action.label}
                type="button"
                onClick={() => onNavigate(action.path)}
                className="customer-soft-surface customer-card-item rounded-2xl p-4 text-left transition-all duration-200 hover:-translate-y-0.5 hover:bg-white"
              >
                <p className="customer-section-title text-[15px] font-semibold">{action.label}</p>
                <p className="customer-section-subtext mt-2 text-sm leading-6">{action.description}</p>
                <span className="customer-link-btn mt-4 inline-flex text-sm font-semibold underline">Open</span>
              </button>
            ))}
          </div>
        </div>

        <div className={surfaceClass}>
          <h2 className="customer-section-title text-lg font-bold">Coverage Spotlight</h2>
          <p className="customer-section-subtext mt-1 text-sm">Keep an eye on products that may need attention next.</p>

          <div className="mt-5 space-y-4">
            {expiringSoonProducts.length > 0 ? (
              expiringSoonProducts.map((product) => (
                <div key={product.id} className="customer-soft-surface customer-card-item rounded-2xl p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="customer-section-title text-[16px] font-semibold">{product.productName}</p>
                      <p className="customer-section-subtext mt-1 text-sm">{product.brand} / {product.modelNumber}</p>
                    </div>
                    <span className="customer-badge-soft rounded-full px-3 py-1 text-xs font-medium">
                      {product.warranty.daysRemaining} days left
                    </span>
                  </div>
                  <div className="customer-progress-track mt-4 h-2 overflow-hidden rounded-full">
                    <div
                      className="customer-progress-bar h-full rounded-full transition-all duration-300"
                      style={{ width: `${product.warranty.progressPercent}%` }}
                    />
                  </div>
                  <p className="mt-3 text-sm text-gray-700">Expires on {formatDisplayDate(product.warranty.expiryDate)}</p>
                </div>
              ))
            ) : (
              <div className="customer-soft-surface customer-card-item rounded-2xl border-dashed p-5 text-sm leading-6 text-gray-700">
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
              <h2 className="customer-section-title text-lg font-bold">Recent Service Activity</h2>
              <p className="customer-section-subtext mt-1 text-sm">Track progress across repairs, installations, and replacements.</p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('/customer/service')}
              className="customer-link-btn text-sm font-semibold transition-colors duration-200"
            >
              View all
            </button>
          </div>

          <div className="mt-5 space-y-4">
            {recentRequests.map((request) => (
              <div key={request.id} className="customer-soft-surface customer-card-item rounded-2xl p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="customer-section-title text-[16px] font-semibold">{request.productName}</p>
                    <p className="customer-section-subtext mt-1 text-sm">{request.issueType} / {request.id}</p>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs font-medium ${getRequestBadgeClass(request.status)}`}>
                    {request.status}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-700">{request.description}</p>
                <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-700">
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
              <h2 className="customer-section-title text-lg font-bold">Latest Notifications</h2>
              <p className="customer-section-subtext mt-1 text-sm">Important coverage and service signals in one feed.</p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('/customer/notifications')}
              className="customer-link-btn text-sm font-semibold transition-colors duration-200"
            >
              Open
            </button>
          </div>

          <div className="mt-5 space-y-4">
            {notifications.slice(0, 3).map((notification) => (
              <div key={notification.id} className="customer-soft-surface customer-card-item flex gap-3 rounded-2xl p-4">
                <span className={`mt-1 h-2.5 w-2.5 flex-none rounded-full ${getNotificationAccent(notification.tone)}`} />
                <div className="min-w-0">
                  <p className="customer-section-title text-[15px] font-semibold">{notification.title}</p>
                  <p className="customer-section-subtext mt-2 text-sm leading-6">{notification.message}</p>
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
