import { LuBell, LuPackage, LuPlus, LuWrench } from 'react-icons/lu';
import DashboardCards from '../../components/customer/dashboard/DashboardCards';
import { formatDisplayDate, getProductImage, getWarrantyDetails } from '../../data/customerOwnership';

const sectionShellClass = 'rounded-[24px] bg-white p-4 !shadow-[0_14px_34px_rgba(30,30,30,0.08)]';

const actionIconWrapClass =
  'flex h-11 w-11 items-center justify-center rounded-2xl bg-[#F4ECE7] text-[#8B5E3C]';

function SectionHeading({ title, description, actionLabel, onAction }) {
  return (
    <div className="flex items-end justify-between gap-3 px-1">
      <div className="min-w-0">
        <h2 className="text-[1.05rem] font-bold tracking-[-0.03em] text-[#1E1E1E]">{title}</h2>
        <p className="mt-1 text-sm leading-6 text-[#6B6B6B]">{description}</p>
      </div>
      {actionLabel ? (
        <button
          type="button"
          onClick={onAction}
          className="flex-none text-xs font-semibold text-[#8B5E3C] transition-all duration-300 ease-out active:scale-95"
        >
          {actionLabel}
        </button>
      ) : null}
    </div>
  );
}

export default function CustomerHome({ userName, products, serviceRequests, notifications, unreadCount, onNavigate }) {
  const firstName = userName?.trim()?.split(/\s+/)[0] || 'H';
  const productSnapshots = products.map((product) => ({
    ...product,
    image: getProductImage(product.productName),
    warranty: getWarrantyDetails(product.purchaseDate, product.warrantyMonths),
  }));

  const activeWarrantyCount = productSnapshots.filter((product) => product.warranty.status === 'active').length;
  const openRequestCount = serviceRequests.filter((request) => request.status !== 'Completed').length;
  const expiringSoonProducts = productSnapshots
    .filter((product) => product.warranty.status === 'active' && product.warranty.daysRemaining <= 30)
    .sort((left, right) => left.warranty.daysRemaining - right.warranty.daysRemaining);
  const expiringSoonCount = expiringSoonProducts.length;
  const recentRequest = [...serviceRequests]
    .sort((left, right) => new Date(right.updatedAt || right.createdAt).getTime() - new Date(left.updatedAt || left.createdAt).getTime())[0];
  const latestNotification = notifications[0];

  const cards = [
    {
      title: 'Registered Products',
      value: String(productSnapshots.length),
      subtitle: 'Appliances already added to your dashboard.',
    },
    {
      title: 'Active Warranties',
      value: String(activeWarrantyCount),
      subtitle: 'Products still covered and protected.',
    },
    {
      title: 'Open Requests',
      value: String(openRequestCount),
      subtitle: 'Service jobs currently waiting on updates.',
    },
    {
      title: 'Expiring Soon',
      value: String(expiringSoonCount),
      subtitle: 'Warranties ending within the next 30 days.',
    },
  ];

  const activityItems = [
    recentRequest
      ? {
          id: `request-${recentRequest.id}`,
          icon: LuWrench,
          title: 'Service request created',
          description: `${recentRequest.productName} / ${recentRequest.issueType}`,
          meta: formatDisplayDate(recentRequest.createdAt),
        }
      : null,
    expiringSoonProducts[0]
      ? {
          id: `expiry-${expiringSoonProducts[0].id}`,
          icon: LuBell,
          title: 'Warranty expiring soon',
          description: `${expiringSoonProducts[0].productName} expires in ${expiringSoonProducts[0].warranty.daysRemaining} day${
            expiringSoonProducts[0].warranty.daysRemaining === 1 ? '' : 's'
          }`,
          meta: formatDisplayDate(expiringSoonProducts[0].warranty.expiryDate),
        }
      : null,
    latestNotification
      ? {
          id: latestNotification.id,
          icon: LuBell,
          title: latestNotification.title,
          description: latestNotification.message,
          meta: formatDisplayDate(latestNotification.createdAt),
        }
      : null,
  ].filter(Boolean);

  const quickActions = [
    {
      label: 'Register Product',
      description: 'Add a new appliance and invoice details.',
      path: '/customer/register-product',
      icon: LuPlus,
    },
    {
      label: 'Raise Service Request',
      description: 'Log a repair or installation issue quickly.',
      path: '/customer/service',
      icon: LuWrench,
    },
    {
      label: 'Track Warranty',
      description: 'Review warranty status across all products.',
      path: '/customer/products',
      icon: LuBell,
    },
  ];

  return (
    <div className="space-y-5 pb-2">
      <section className="overflow-hidden rounded-[28px] bg-[linear-gradient(135deg,#8B5E3C_0%,#A9745B_100%)] p-5 text-white !shadow-[0_18px_42px_rgba(139,94,60,0.22)]">
        <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/75">Dashboard Overview</p>
        <div className="mt-3 flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h1 className="text-[1.45rem] font-bold tracking-[-0.04em] text-white">Hello, {firstName}</h1>
            <p className="mt-2 text-sm leading-6 text-white/80">
              A richer view of your products, warranty coverage, and service activity in one place.
            </p>
          </div>

          <div className="min-w-[88px] rounded-2xl bg-white/14 px-3 py-3 text-right backdrop-blur-sm">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/70">Unread</p>
            <p className="mt-2 text-[1.7rem] font-extrabold leading-none tracking-[-0.05em] text-white">{unreadCount}</p>
          </div>
        </div>

        <div className="mt-4 rounded-[22px] bg-white/12 px-4 py-3">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/75">Priority Watch</p>
          <p className="mt-2 text-sm leading-6 text-white/90">
            {expiringSoonProducts[0]
              ? `${expiringSoonProducts[0].productName} warranty ends on ${formatDisplayDate(expiringSoonProducts[0].warranty.expiryDate)}.`
              : 'All active warranties look healthy right now.'}
          </p>
        </div>
      </section>

      <DashboardCards cards={cards} />

      <section className="space-y-3">
        <SectionHeading
          title="My Products"
          description="Quick visibility into the appliances you manage most often."
          actionLabel="View All"
          onAction={() => onNavigate('/customer/products')}
        />

        <div className="grid grid-cols-2 gap-4">
          {productSnapshots.slice(0, 4).map((product) => (
            <button
              key={product.id}
              type="button"
              onClick={() => onNavigate('/customer/products')}
              className="overflow-hidden rounded-[22px] bg-white text-left !shadow-[0_14px_34px_rgba(30,30,30,0.08)] transition-all duration-300 ease-out active:scale-95"
            >
              <img src={product.image} alt={product.productName} className="h-24 w-full object-cover" />
              <div className="space-y-3 p-4">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-bold leading-5 text-[#1E1E1E]">{product.productName}</p>
                  <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#F4ECE7] text-[#8B5E3C]">
                    <LuPackage className="h-4 w-4" />
                  </span>
                </div>
                <p className="text-xs leading-5 text-[#6B6B6B]">{product.brand}</p>
                <div className="space-y-1 text-[11px] text-[#6B6B6B]">
                  <div className="flex items-center gap-1.5">
                    <LuBell className="h-3.5 w-3.5 text-[#8B5E3C]" />
                    <span className="truncate">
                      {product.warranty.status === 'active'
                        ? `${product.warranty.daysRemaining} days warranty left`
                        : 'Warranty expired'}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <LuPackage className="h-3.5 w-3.5 text-[#8B5E3C]" />
                    <span className="truncate">{product.modelNumber}</span>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <SectionHeading
          title="Recent Activity"
          description="Fresh updates across service requests, warranties, and alerts."
        />

        <div className={`${sectionShellClass} space-y-3`}>
          {activityItems.map((item) => {
            const Icon = item.icon;

            return (
              <div key={item.id} className="flex items-start gap-3 rounded-[18px] bg-[#FBF8F5] p-3">
                <span className={actionIconWrapClass}>
                  <Icon className="h-5 w-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold leading-5 text-[#1E1E1E]">{item.title}</p>
                  <p className="mt-1 text-sm leading-6 text-[#6B6B6B]">{item.description}</p>
                  <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#A9745B]">{item.meta}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="space-y-3">
        <SectionHeading
          title="Quick Actions"
          description="Jump into the most common ownership tasks without losing context."
        />

        <div className={`${sectionShellClass} space-y-3`}>
          {quickActions.map((action) => {
            const Icon = action.icon;

            return (
              <button
                key={action.label}
                type="button"
                onClick={() => onNavigate(action.path)}
                className="flex w-full items-center gap-3 rounded-[18px] bg-[#FBF8F5] p-3 text-left transition-all duration-300 ease-out active:scale-95"
              >
                <span className={actionIconWrapClass}>
                  <Icon className="h-5 w-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-[#1E1E1E]">{action.label}</p>
                  <p className="mt-1 text-sm leading-6 text-[#6B6B6B]">{action.description}</p>
                </div>
                <span className="text-lg font-semibold text-[#A9745B]">&gt;</span>
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
}
