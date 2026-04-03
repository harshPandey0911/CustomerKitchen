import { formatDisplayDate, getProductImage, getWarrantyDetails } from '../../data/customerOwnership';

const surfaceClass = 'customer-surface customer-card-item rounded-3xl p-5';

const getWarrantyBadgeClass = (status) => {
  if (status === 'active') {
    return 'customer-badge';
  }

  return 'customer-badge-deep';
};

const getProgressBarClass = (status) => {
  if (status === 'active') {
    return 'customer-progress-bar';
  }

  return 'bg-[#8b6a53]';
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
        <h1 className="customer-page-title text-2xl">My Products</h1>
        <p className="customer-page-subtext mt-3 text-sm leading-6">
          You have not registered any appliances yet. Add your first product to unlock warranty tracking and service history.
        </p>
        <button
          type="button"
          onClick={() => onNavigate('/customer/register-product')}
          className="customer-primary-btn mt-6 rounded-full px-5 py-2.5 text-sm"
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
          <h1 className="customer-page-title text-2xl lg:text-3xl">My Products</h1>
          <p className="customer-page-subtext mt-2 max-w-2xl text-sm leading-6">
            Review every registered appliance, see warranty health at a glance, and catch expiring coverage before it becomes a problem.
          </p>
        </div>
        <button
          type="button"
          onClick={() => onNavigate('/customer/register-product')}
          className="customer-primary-btn rounded-full px-5 py-2.5 text-sm"
        >
          Register Another Product
        </button>
      </div>

      <section className="grid gap-4 md:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.label} className={`${surfaceClass} customer-stat-card`}>
            <p className="text-[17px] font-bold text-gray-900">{stat.label}</p>
            <p className="mt-3 text-3xl font-bold text-black">{stat.value}</p>
            <p className="mt-2 text-sm text-gray-700">{stat.meta}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-5 md:grid-cols-2 2xl:grid-cols-3">
        {productSnapshots.map((product) => (
          <article
            key={product.id}
            className="customer-surface customer-card-item overflow-hidden rounded-[28px] transition-all duration-200 hover:-translate-y-1"
          >
            <img src={product.image} alt={product.productName} className="h-48 w-full object-cover" />

            <div className="space-y-4 p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="customer-section-title text-lg font-bold">{product.productName}</p>
                  <p className="customer-section-subtext mt-1 text-sm">{product.brand} / {product.modelNumber}</p>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${getWarrantyBadgeClass(product.warranty.status)}`}>
                  {product.warranty.status}
                </span>
              </div>

              <div className="grid gap-3 text-sm text-gray-700 sm:grid-cols-2">
                <div className="customer-soft-surface customer-card-item rounded-2xl p-3">
                  <p className="text-xs uppercase tracking-wide text-slate-400">Purchased</p>
                  <p className="mt-2 font-medium text-slate-800">{formatDisplayDate(product.purchaseDate)}</p>
                </div>
                <div className="customer-soft-surface customer-card-item rounded-2xl p-3">
                  <p className="text-xs uppercase tracking-wide text-slate-400">Expires</p>
                  <p className="mt-2 font-medium text-slate-800">{formatDisplayDate(product.warranty.expiryDate)}</p>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between gap-3 text-sm">
                  <span className="font-medium text-slate-800">Warranty used</span>
                  <span className="text-gray-700">{product.warranty.progressPercent}%</span>
                </div>
                <div className="customer-progress-track mt-3 h-2.5 overflow-hidden rounded-full">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${getProgressBarClass(product.warranty.status)}`}
                    style={{ width: `${product.warranty.progressPercent}%` }}
                  />
                </div>
                <p className="mt-3 text-sm text-gray-700">
                  {product.warranty.status === 'active'
                    ? `${product.warranty.daysRemaining} day${product.warranty.daysRemaining === 1 ? '' : 's'} of warranty remaining`
                    : 'Warranty coverage has expired'}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 text-xs text-gray-700">
                <span className="customer-chip rounded-full px-3 py-1">Warranty: {product.warrantyMonths} months</span>
                {product.invoiceName ? <span className="customer-chip rounded-full px-3 py-1">Invoice: {product.invoiceName}</span> : null}
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
