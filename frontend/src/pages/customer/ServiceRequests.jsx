import { useState } from 'react';
import { formatDisplayDate, serviceIssueTypes } from '../../data/customerOwnership';

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState(() => getInitialForm(products));

  const openModal = () => {
    setForm(getInitialForm(products));
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
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
    closeModal();
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
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="customer-page-title text-2xl lg:text-3xl">Service Requests</h1>
            <p className="customer-page-subtext mt-2 max-w-2xl text-sm leading-relaxed">
              Log appliance issues quickly and keep the full service timeline visible, from request intake through technician completion.
            </p>
          </div>
          <button
            type="button"
            onClick={openModal}
            disabled={products.length === 0}
            className="customer-primary-btn rounded-full px-5 py-2.5 text-sm disabled:cursor-not-allowed disabled:opacity-50"
          >
            Raise Request
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

      {isModalOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#3E2C23]/35 p-4">
          <div className="customer-surface customer-card-item flex h-[90vh] w-full max-w-md flex-col overflow-hidden rounded-2xl shadow-2xl md:max-w-2xl">
            <div className="flex items-start justify-between gap-4 border-b border-slate-200 p-4 md:p-5">
              <div>
                <h2 className="customer-page-title text-xl font-bold">Raise Service Request</h2>
                <p className="customer-page-subtext mt-2 text-sm leading-relaxed">
                  Tell us what went wrong and we will add the request to your service timeline instantly.
                </p>
              </div>
              <button
                type="button"
                onClick={closeModal}
                className="customer-secondary-btn rounded-full px-3 py-1 text-sm"
              >
                Close
              </button>
            </div>

            <form className="flex min-h-0 flex-1 flex-col" onSubmit={handleSubmit}>
              <div className="flex-1 overflow-y-auto p-4 pb-6 md:p-5">
                <div className="customer-section-wrapper grid gap-5 md:grid-cols-2">
                  <label className="block md:col-span-2">
                    <span className={labelClass}>Select Product</span>
                    <select name="productId" value={form.productId} onChange={handleChange} className={selectClass} required>
                      {products.map((product) => (
                        <option key={product.id} value={product.id}>
                          {product.productName} / {product.brand}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="block md:col-span-2">
                    <span className={labelClass}>Issue Type</span>
                    <select name="issueType" value={form.issueType} onChange={handleChange} className={selectClass} required>
                      {serviceIssueTypes.map((issueType) => (
                        <option key={issueType} value={issueType}>
                          {issueType}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="block md:col-span-2">
                    <span className={labelClass}>Description</span>
                    <textarea
                      name="description"
                      value={form.description}
                      onChange={handleChange}
                      rows={5}
                      className={`${inputClass} resize-none`}
                      placeholder="Describe the issue clearly so the technician has enough context."
                      required
                    />
                  </label>

                  <label className="block md:col-span-2">
                    <span className={labelClass}>Upload Image</span>
                    <div className="customer-soft-surface customer-card-item rounded-2xl border border-dashed px-4 py-5">
                      <input type="file" accept=".jpg,.jpeg,.png" onChange={handleFileChange} className="file-input-field" />
                      <p className="customer-subheading mt-2 text-sm">
                        {form.imageName ? `Selected file: ${form.imageName}` : 'Optional, but helpful for faster troubleshooting.'}
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              <div className="border-t border-slate-200 p-4 pb-6 md:p-5 md:pb-5">
                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="customer-primary-btn flex-1 rounded-lg px-5 py-2.5 text-sm"
                  >
                    Submit Request
                  </button>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="customer-secondary-btn flex-1 rounded-lg px-5 py-2.5 text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}
