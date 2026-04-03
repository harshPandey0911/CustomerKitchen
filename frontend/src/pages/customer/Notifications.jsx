import { formatDisplayDate } from '../../data/customerOwnership';

const cardClass = 'customer-surface rounded-[28px] p-5';

const getToneClasses = (tone) => {
  if (tone === 'success') {
    return 'customer-badge';
  }

  if (tone === 'warning') {
    return 'customer-badge-soft';
  }

  if (tone === 'danger') {
    return 'customer-badge-deep';
  }

  if (tone === 'accent') {
    return 'customer-badge';
  }

  return 'customer-badge-soft';
};

export default function Notifications({ notifications, unreadCount }) {
  const stats = [
    { label: 'Total Updates', value: notifications.length, meta: 'Warranty, service, and order alerts' },
    {
      label: 'Warranty Alerts',
      value: notifications.filter((notification) => notification.type === 'warranty').length,
      meta: 'Coverage-related reminders',
    },
    {
      label: 'Service Updates',
      value: notifications.filter((notification) => notification.type === 'service').length,
      meta: 'Repair and technician activity',
    },
    { label: 'Unread Before Open', value: unreadCount, meta: 'Badge count before viewing this page' },
  ];

  return (
    <div className="space-y-6 lg:space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-black lg:text-3xl">Notifications</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-700">
          Stay ahead of expiring warranties, technician updates, and ownership milestones without losing signal in the noise.
        </p>
      </div>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className={`${cardClass} customer-stat-card`}>
            <p className="text-[17px] font-bold text-gray-900">{stat.label}</p>
            <p className="mt-3 text-3xl font-bold text-black">{stat.value}</p>
            <p className="mt-2 text-sm text-gray-700">{stat.meta}</p>
          </div>
        ))}
      </section>

      <section className="space-y-4">
        {notifications.map((notification) => (
          <article key={notification.id} className={cardClass}>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`rounded-full border px-3 py-1 text-xs font-medium capitalize ${getToneClasses(notification.tone)}`}>
                    {notification.type}
                  </span>
                  <span className="customer-label text-xs uppercase tracking-wide">{formatDisplayDate(notification.createdAt)}</span>
                </div>
                <h2 className="mt-4 text-lg font-bold text-black">{notification.title}</h2>
                <p className="mt-3 max-w-3xl text-sm leading-6 text-gray-700">{notification.message}</p>
              </div>
            </div>
          </article>
        ))}

        {notifications.length === 0 ? (
          <div className={`${cardClass} text-center`}>
            <p className="text-lg font-bold text-black">All caught up</p>
            <p className="mt-3 text-sm leading-6 text-gray-700">
              New warranty reminders and service updates will appear here as soon as they are available.
            </p>
          </div>
        ) : null}
      </section>
    </div>
  );
}
