import { useEffect, useMemo, useState } from 'react';
import { formatDisplayDate, getProductImage, serviceIssueTypes } from '../../data/customerOwnership';

const inputClass = 'input-field';
const selectClass = 'input-field';
const labelClass = 'customer-label mb-2 block text-[16px] font-bold';

const cardClass = 'customer-surface customer-card-item rounded-[28px] p-5';

const getStatusBadgeClass = (status) => {
  if (status === 'Completed') {
    return 'customer-badge';
  }

  if (status === 'In Progress') {
    return 'customer-badge-soft';
  }

  return 'customer-badge-deep';
};

const getInitialForm = (products) => ({
  productId: products[0]?.id || '',
  issueType: serviceIssueTypes[0],
  description: '',
  imageName: '',
});

export default function ServiceRequests({ products, serviceRequests, onSubmit, onNavigate }) {
  const [showServiceForm, setShowServiceForm] = useState(false);
  const [form, setForm] = useState(() => getInitialForm(products));

  const selectedProduct = useMemo(
    () => products.find((product) => product.id === form.productId) || products[0] || null,
    [form.productId, products],
  );

  const selectedProductImage = selectedProduct ? getProductImage(selectedProduct.productName) : '';

  useEffect(() => {
    if (!showServiceForm) {
      document.body.classList.remove('modal-open');
      return undefined;
    }

    document.body.classList.add('modal-open');

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setShowServiceForm(false);
      }
    };

    document.addEventListener('keydown', handleEscape);

    return () => {
      document.body.classList.remove('modal-open');
      document.removeEventListener('keydown', handleEscape);
    };
  }, [showServiceForm]);

  const openForm = () => {
    setForm(getInitialForm(products));
    setShowServiceForm(true);
  };

  const closeForm = () => {
    setShowServiceForm(false);
    setForm(getInitialForm(products));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleFileChange = (event) => {
    const imageName = event.target.files?.[0]?.name || '';
    setForm((current) => ({ ...current, imageName }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const selectedProduct = products.find((product) => product.id === form.productId);

    if (!selectedProduct) {
      return;
    }

    onSubmit({
      productId: selectedProduct.id,
      productName: selectedProduct.productName,
      issueType: form.issueType,
      description: form.description,
      imageName: form.imageName,
    });
    closeForm();
  };

  const openRequests = serviceRequests.filter((request) => request.status !== 'Completed').length;

  const stats = [
    { label: 'Total Requests', value: serviceRequests.length, meta: 'Service requests on record' },
    { label: 'Open Requests', value: openRequests, meta: 'Pending or active service jobs' },
    {
      label: 'Completed',
      value: serviceRequests.filter((request) => request.status === 'Completed').length,
      meta: 'Resolved service requests',
    },
  ];

  return (
    <>
      <div className="space-y-6 lg:space-y-8">
        <div className="customer-service-hero">
          <div className="max-w-2xl">
            <h1 className="customer-page-title text-2xl lg:text-3xl">Service Requests</h1>
            <p className="customer-page-subtext mt-2 max-w-2xl text-sm leading-relaxed">
              Log appliance issues quickly and keep the full service timeline visible, from request intake through technician completion.
            </p>
          </div>
          <button
            type="button"
            onClick={openForm}
            disabled={products.length === 0}
            className="customer-service-hero-button customer-primary-btn rounded-xl px-5 py-2.5 text-sm disabled:cursor-not-allowed disabled:opacity-50"
          >
            Raise Service Request
          </button>
        </div>

        {products.length === 0 ? (
          <div className={`${cardClass} text-center`}>
            <p className="customer-heading text-lg font-bold">Register a product before requesting service</p>
            <p className="customer-subheading mt-3 text-sm leading-6">
              Service requests are tied to owned appliances, so start by adding at least one registered product to your dashboard.
            </p>
            <button
              type="button"
              onClick={() => onNavigate('/customer/register-product')}
              className="customer-primary-btn mt-6 rounded-full px-5 py-2.5 text-sm"
            >
              Register Product
            </button>
          </div>
        ) : null}

        <section className="grid gap-4 md:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.label} className={`${cardClass} customer-stat-card`}>
              <p className="customer-heading text-[17px] font-bold">{stat.label}</p>
              <p className="customer-heading mt-3 text-3xl font-bold">{stat.value}</p>
              <p className="customer-subheading mt-2 text-sm">{stat.meta}</p>
            </div>
          ))}
        </section>

        <section className="grid gap-5 xl:grid-cols-2">
          {serviceRequests.map((request) => (
            <article key={request.id} className={cardClass}>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="customer-section-title text-lg font-bold">{request.productName}</p>
                  <p className="customer-section-subtext mt-1 text-sm">{request.issueType} / {request.id}</p>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusBadgeClass(request.status)}`}>
                  {request.status}
                </span>
              </div>

              <p className="customer-section-subtext mt-4 text-sm leading-6">{request.description}</p>

              <div className="customer-subheading mt-5 grid gap-3 text-sm sm:grid-cols-2">
                <div className="customer-soft-surface customer-card-item rounded-2xl p-3">
                  <p className="text-xs uppercase tracking-wide text-slate-400">Created</p>
                  <p className="customer-heading mt-2 font-medium">{formatDisplayDate(request.createdAt)}</p>
                </div>
                <div className="customer-soft-surface customer-card-item rounded-2xl p-3">
                  <p className="text-xs uppercase tracking-wide text-slate-400">Assigned Technician</p>
                  <p className="customer-heading mt-2 font-medium">{request.assignedTechnician}</p>
                </div>
              </div>

              {request.imageName ? (
                <p className="customer-chip mt-4 inline-flex rounded-full px-3 py-1 text-xs">
                  Attachment: {request.imageName}
                </p>
              ) : null}
            </article>
          ))}
        </section>
      </div>

      {showServiceForm ? (
        <div className="customer-modal-overlay" onClick={closeForm}>
          <div className="customer-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="customer-modal-header">
              <div className="flex-1">
                <h2 className="customer-section-title text-lg font-bold">Raise Service Request</h2>
              </div>
              <button
                type="button"
                onClick={closeForm}
                className="customer-modal-close-btn"
                aria-label="Close form"
              >
                ✕
              </button>
            </div>

            <div className="customer-modal-content">
              <p className="customer-page-subtext mb-4 text-sm leading-relaxed">
                Share the issue clearly so your appliance request can move into support tracking with the right product details attached.
              </p>

              <form className="customer-section-wrapper mt-0 grid gap-4" onSubmit={handleSubmit}>
                <label className="block">
                  <span className={labelClass}>Select Product</span>
                  <select name="productId" value={form.productId} onChange={handleChange} className={selectClass} required>
                    {products.map((product) => (
                      <option key={product.id} value={product.id}>
                        {product.productName} / {product.brand}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block">
                  <span className={labelClass}>Issue Type</span>
                  <select name="issueType" value={form.issueType} onChange={handleChange} className={selectClass} required>
                    {serviceIssueTypes.map((issueType) => (
                      <option key={issueType} value={issueType}>
                        {issueType}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block">
                  <span className={labelClass}>Description</span>
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    rows={4}
                    className={`${inputClass} resize-none`}
                    placeholder="Describe the issue clearly so the technician has enough context."
                    required
                  />
                </label>

                <label className="block">
                  <span className={labelClass}>Upload Image</span>
                  <div className="customer-soft-surface customer-card-item rounded-2xl border border-dashed px-4 py-5">
                    <input type="file" accept=".jpg,.jpeg,.png" onChange={handleFileChange} className="file-input-field" />
                    <p className="customer-subheading mt-2 text-sm">
                      {form.imageName ? `Selected file: ${form.imageName}` : 'Optional, but helpful for faster troubleshooting.'}
                    </p>
                  </div>
                </label>

                <div className="flex flex-col gap-2 pt-2 sm:flex-row sm:items-center sm:gap-3">
                  <button
                    type="submit"
                    className="customer-primary-btn rounded-full px-5 py-2.5 text-sm"
                  >
                    Submit Request
                  </button>
                  <button
                    type="button"
                    onClick={closeForm}
                    className="customer-secondary-btn rounded-full px-5 py-2.5 text-sm"
                  >
                    Cancel
                  </button>
                </div>

                <p className="customer-subheading text-xs leading-relaxed">
                  The request will appear instantly in your service timeline after saving.
                </p>
              </form>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
