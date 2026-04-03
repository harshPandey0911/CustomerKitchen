import { formatDisplayDate, getProductImage, getWarrantyDetails } from '../../data/customerOwnership';

const surfaceClass = 'rounded-3xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/60';

const getWarrantyBadgeClass = (status) => {
  if (status === 'active') {
    return 'bg-emerald-50 text-emerald-700';
  }

  return 'bg-rose-50 text-rose-700';
};

const getProgressBarClass = (status) => {
  if (status === 'active') {
    return 'bg-slate-900';
  }

  return 'bg-rose-500';
};

export default function MyProducts({ products, onNavigate }) {
  const productSnapshots = products.map((product) => ({
    ...product,
    warranty: getWarrantyDetails(product.purchaseDate, product.warrantyMonths),
    image: getProductImage(product.productName),
  }));

  const activeCount = productSnapshots.filter((product) => product.warranty.status === 'active').length;
  const expiringSoonCount = productSnapshots.filter(
    (product) => product.warranty.status === 'active' && product.warranty.daysRemaining <= 30,
  ).length;

  const stats = [
    { label: 'Registered Products', value: productSnapshots.length, meta: 'Appliances under management' },
    { label: 'Active Coverage', value: activeCount, meta: 'Products still covered by warranty' },
    { label: 'Expiring Soon', value: expiringSoonCount, meta: 'Coverage ending within 30 days' },
  ];

  if (productSnapshots.length === 0) {
    return (
      <div className={`${surfaceClass} text-center`}>
        <h1 className="text-2xl font-semibold text-slate-950">My Products</h1>
        <p className="mt-3 text-sm leading-6 text-slate-500">
          You have not registered any appliances yet. Add your first product to unlock warranty tracking and service history.
        </p>
        <button
          type="button"
          onClick={() => onNavigate('/customer/register-product')}
          className="mt-6 rounded-full bg-slate-950 px-5 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-black"
        >
          Register Product
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 lg:space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-950 lg:text-3xl">My Products</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            Review every registered appliance, see warranty health at a glance, and catch expiring coverage before it becomes a problem.
          </p>
        </div>
        <button
          type="button"
          onClick={() => onNavigate('/customer/register-product')}
          className="rounded-full bg-slate-950 px-5 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-black"
        >
          Register Another Product
        </button>
      </div>

      <section className="grid gap-4 md:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.label} className={surfaceClass}>
            <p className="text-sm text-slate-500">{stat.label}</p>
            <p className="mt-3 text-3xl font-semibold text-slate-950">{stat.value}</p>
            <p className="mt-2 text-sm text-slate-500">{stat.meta}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-5 md:grid-cols-2 2xl:grid-cols-3">
        {productSnapshots.map((product) => (
          <article
            key={product.id}
            className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm shadow-slate-200/60 transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
          >
            <img src={product.image} alt={product.productName} className="h-48 w-full object-cover" />

            <div className="space-y-4 p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-lg font-semibold text-slate-950">{product.productName}</p>
                  <p className="mt-1 text-sm text-slate-500">{product.brand} / {product.modelNumber}</p>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${getWarrantyBadgeClass(product.warranty.status)}`}>
                  {product.warranty.status}
                </span>
              </div>

              <div className="grid gap-3 text-sm text-slate-500 sm:grid-cols-2">
                <div className="rounded-2xl bg-slate-50 p-3">
                  <p className="text-xs uppercase tracking-wide text-slate-400">Purchased</p>
                  <p className="mt-2 font-medium text-slate-800">{formatDisplayDate(product.purchaseDate)}</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-3">
                  <p className="text-xs uppercase tracking-wide text-slate-400">Expires</p>
                  <p className="mt-2 font-medium text-slate-800">{formatDisplayDate(product.warranty.expiryDate)}</p>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between gap-3 text-sm">
                  <span className="font-medium text-slate-800">Warranty used</span>
                  <span className="text-slate-500">{product.warranty.progressPercent}%</span>
                </div>
                <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-slate-200">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${getProgressBarClass(product.warranty.status)}`}
                    style={{ width: `${product.warranty.progressPercent}%` }}
                  />
                </div>
                <p className="mt-3 text-sm text-slate-500">
                  {product.warranty.status === 'active'
                    ? `${product.warranty.daysRemaining} day${product.warranty.daysRemaining === 1 ? '' : 's'} of warranty remaining`
                    : 'Warranty coverage has expired'}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 text-xs text-slate-500">
                <span className="rounded-full bg-slate-100 px-3 py-1">Warranty: {product.warrantyMonths} months</span>
                {product.invoiceName ? <span className="rounded-full bg-slate-100 px-3 py-1">Invoice: {product.invoiceName}</span> : null}
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
