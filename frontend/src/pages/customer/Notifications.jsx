import { formatDisplayDate } from '../../data/customerOwnership';

const cardClass = 'rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/60';

const getToneClasses = (tone) => {
  if (tone === 'success') {
    return 'bg-emerald-50 text-emerald-700 border-emerald-100';
  }

  if (tone === 'warning') {
    return 'bg-amber-50 text-amber-700 border-amber-100';
  }

  if (tone === 'danger') {
    return 'bg-rose-50 text-rose-700 border-rose-100';
  }

  if (tone === 'accent') {
    return 'bg-sky-50 text-sky-700 border-sky-100';
  }

  return 'bg-slate-50 text-slate-700 border-slate-200';
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
        <h1 className="text-2xl font-semibold text-slate-950 lg:text-3xl">Notifications</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
          Stay ahead of expiring warranties, technician updates, and ownership milestones without losing signal in the noise.
        </p>
      </div>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className={cardClass}>
            <p className="text-sm text-slate-500">{stat.label}</p>
            <p className="mt-3 text-3xl font-semibold text-slate-950">{stat.value}</p>
            <p className="mt-2 text-sm text-slate-500">{stat.meta}</p>
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
                  <span className="text-xs uppercase tracking-wide text-slate-400">{formatDisplayDate(notification.createdAt)}</span>
                </div>
                <h2 className="mt-4 text-lg font-semibold text-slate-950">{notification.title}</h2>
                <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-500">{notification.message}</p>
              </div>
            </div>
          </article>
        ))}

        {notifications.length === 0 ? (
          <div className={`${cardClass} text-center`}>
            <p className="text-lg font-semibold text-slate-950">All caught up</p>
            <p className="mt-3 text-sm leading-6 text-slate-500">
              New warranty reminders and service updates will appear here as soon as they are available.
            </p>
          </div>
        ) : null}
      </section>
    </div>
  );
}
