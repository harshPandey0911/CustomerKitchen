import { useState } from 'react';
import { formatDisplayDate, serviceIssueTypes } from '../../data/customerOwnership';

const inputClass =
  'w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-slate-300 focus:ring-4 focus:ring-slate-100';

const cardClass = 'rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/60';

const getStatusBadgeClass = (status) => {
  if (status === 'Completed') {
    return 'bg-emerald-50 text-emerald-700';
  }

  if (status === 'In Progress') {
    return 'bg-amber-50 text-amber-700';
  }

  return 'bg-slate-100 text-slate-700';
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
            <h1 className="text-2xl font-semibold text-slate-950 lg:text-3xl">Service Requests</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              Log appliance issues quickly and keep the full service timeline visible, from request intake through technician completion.
            </p>
          </div>
          <button
            type="button"
            onClick={openModal}
            disabled={products.length === 0}
            className="rounded-full bg-slate-950 px-5 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-black disabled:cursor-not-allowed disabled:opacity-50"
          >
            Raise Request
          </button>
        </div>

        {products.length === 0 ? (
          <div className={`${cardClass} text-center`}>
            <p className="text-lg font-semibold text-slate-950">Register a product before requesting service</p>
            <p className="mt-3 text-sm leading-6 text-slate-500">
              Service requests are tied to owned appliances, so start by adding at least one registered product to your dashboard.
            </p>
            <button
              type="button"
              onClick={() => onNavigate('/customer/register-product')}
              className="mt-6 rounded-full bg-slate-950 px-5 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-black"
            >
              Register Product
            </button>
          </div>
        ) : null}

        <section className="grid gap-4 md:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.label} className={cardClass}>
              <p className="text-sm text-slate-500">{stat.label}</p>
              <p className="mt-3 text-3xl font-semibold text-slate-950">{stat.value}</p>
              <p className="mt-2 text-sm text-slate-500">{stat.meta}</p>
            </div>
          ))}
        </section>

        <section className="grid gap-5 xl:grid-cols-2">
          {serviceRequests.map((request) => (
            <article key={request.id} className={cardClass}>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-lg font-semibold text-slate-950">{request.productName}</p>
                  <p className="mt-1 text-sm text-slate-500">{request.issueType} / {request.id}</p>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusBadgeClass(request.status)}`}>
                  {request.status}
                </span>
              </div>

              <p className="mt-4 text-sm leading-6 text-slate-500">{request.description}</p>

              <div className="mt-5 grid gap-3 text-sm text-slate-500 sm:grid-cols-2">
                <div className="rounded-2xl bg-slate-50 p-3">
                  <p className="text-xs uppercase tracking-wide text-slate-400">Created</p>
                  <p className="mt-2 font-medium text-slate-800">{formatDisplayDate(request.createdAt)}</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-3">
                  <p className="text-xs uppercase tracking-wide text-slate-400">Assigned Technician</p>
                  <p className="mt-2 font-medium text-slate-800">{request.assignedTechnician}</p>
                </div>
              </div>

              {request.imageName ? (
                <p className="mt-4 inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">
                  Attachment: {request.imageName}
                </p>
              ) : null}
            </article>
          ))}
        </section>
      </div>

      {isModalOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 p-4">
          <div className="flex h-[90vh] w-full max-w-md flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-900/10 md:max-w-2xl">
            <div className="flex items-start justify-between gap-4 border-b border-slate-200 p-4 md:p-5">
              <div>
                <h2 className="text-xl font-semibold text-slate-950">Raise Service Request</h2>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Tell us what went wrong and we will add the request to your service timeline instantly.
                </p>
              </div>
              <button
                type="button"
                onClick={closeModal}
                className="rounded-full border border-slate-200 px-3 py-1 text-sm text-slate-600 transition-colors duration-200 hover:bg-slate-50"
              >
                Close
              </button>
            </div>

            <form className="flex min-h-0 flex-1 flex-col" onSubmit={handleSubmit}>
              <div className="flex-1 overflow-y-auto p-4 pb-6 md:p-5">
                <div className="grid gap-5 md:grid-cols-2">
                  <label className="space-y-2 md:col-span-2">
                    <span className="text-sm font-medium text-slate-700">Select Product</span>
                    <select name="productId" value={form.productId} onChange={handleChange} className={inputClass} required>
                      {products.map((product) => (
                        <option key={product.id} value={product.id}>
                          {product.productName} / {product.brand}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="space-y-2 md:col-span-2">
                    <span className="text-sm font-medium text-slate-700">Issue Type</span>
                    <select name="issueType" value={form.issueType} onChange={handleChange} className={inputClass} required>
                      {serviceIssueTypes.map((issueType) => (
                        <option key={issueType} value={issueType}>
                          {issueType}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="space-y-2 md:col-span-2">
                    <span className="text-sm font-medium text-slate-700">Description</span>
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

                  <label className="space-y-2 md:col-span-2">
                    <span className="text-sm font-medium text-slate-700">Upload Image</span>
                    <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-5">
                      <input type="file" accept=".jpg,.jpeg,.png" onChange={handleFileChange} className="w-full text-sm text-slate-500" />
                      <p className="mt-2 text-sm text-slate-500">
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
                    className="flex-1 rounded-lg bg-slate-950 px-5 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:bg-black"
                  >
                    Submit Request
                  </button>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="flex-1 rounded-lg bg-slate-200 px-5 py-2.5 text-sm font-medium text-slate-700 transition-colors duration-200 hover:bg-slate-300"
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
