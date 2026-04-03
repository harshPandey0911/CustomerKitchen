import { useEffect, useMemo, useState } from 'react';
import ServiceHeader from '../../components/customer/service/ServiceHeader';
import StatsCards from '../../components/customer/service/StatsCards';
import RequestList from '../../components/customer/service/RequestList';
import { getProductImage, serviceIssueTypes } from '../../data/customerOwnership';

const inputClass = 'input-field';
const selectClass = 'input-field';
const labelClass = 'mb-2 block text-sm font-semibold text-[#1E1E1E]';

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
  const sortedRequests = [...serviceRequests].sort(
    (left, right) => new Date(right.updatedAt || right.createdAt).getTime() - new Date(left.updatedAt || left.createdAt).getTime(),
  );

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
    const currentProduct = products.find((product) => product.id === form.productId);

    if (!currentProduct) {
      return;
    }

    onSubmit({
      productId: currentProduct.id,
      productName: currentProduct.productName,
      issueType: form.issueType,
      description: form.description,
      imageName: form.imageName,
    });
    closeForm();
  };

  const openRequests = serviceRequests.filter((request) => request.status !== 'Completed').length;
  const stats = [
    { label: 'Total Requests', value: serviceRequests.length },
    { label: 'Open Requests', value: openRequests },
    { label: 'Completed', value: serviceRequests.filter((request) => request.status === 'Completed').length },
  ];

  return (
    <>
      <div className="space-y-4">
        <ServiceHeader disabled={products.length === 0} onRaiseRequest={openForm} />

        {products.length === 0 ? (
          <div className="rounded-[24px] bg-white p-5 text-center !shadow-[0_14px_34px_rgba(30,30,30,0.08)]">
            <p className="text-lg font-bold text-[#1E1E1E]">Register a product before requesting service</p>
            <p className="mt-3 text-sm leading-6 text-[#6B7280]">
              Service requests are tied to owned appliances, so start by adding at least one registered product to your dashboard.
            </p>
            <button
              type="button"
              onClick={() => onNavigate('/customer/register-product')}
              className="mt-4 rounded-xl bg-[#8B5E3C] px-4 py-2.5 text-sm font-semibold text-white !shadow-[0_10px_24px_rgba(139,94,60,0.24)] transition-all duration-300 ease-out active:scale-95"
            >
              Register Product
            </button>
          </div>
        ) : null}

        <StatsCards stats={stats} />
        <RequestList requests={sortedRequests} />
      </div>

      {showServiceForm ? (
        <div className="customer-modal-overlay modal-centered" onClick={closeForm}>
          <div
            className="customer-modal-box !mx-4 !max-h-[calc(100vh-3rem)] !max-w-[392px] !rounded-[28px] !shadow-[0_24px_48px_rgba(30,30,30,0.18)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="customer-modal-header">
              <div className="flex-1">
                <h2 className="text-lg font-bold text-[#1E1E1E]">Raise Service Request</h2>
              </div>
              <button
                type="button"
                onClick={closeForm}
                className="customer-modal-close-btn"
                aria-label="Close form"
              >
                x
              </button>
            </div>

            <div className="customer-modal-content">
              <div className="space-y-4">
                <div className="rounded-[22px] bg-white p-4 !shadow-[0_10px_24px_rgba(30,30,30,0.08)]">
                  <div className="flex items-center gap-3">
                    <div className="flex h-16 w-16 flex-none items-center justify-center overflow-hidden rounded-[18px] bg-[#FBF8F5]">
                      {selectedProductImage ? (
                        <img
                          src={selectedProductImage}
                          alt={selectedProduct?.productName || 'Selected product'}
                          className="h-full w-full object-cover"
                        />
                      ) : null}
                    </div>
                    <div className="min-w-0">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#A9745B]">Selected Product</p>
                      <p className="mt-1 text-sm font-semibold text-[#1E1E1E]">{selectedProduct?.productName || 'Choose a product'}</p>
                      <p className="mt-1 text-sm text-[#6B7280]">Attach issue details so support can respond faster.</p>
                    </div>
                  </div>
                </div>

                <form className="space-y-4" onSubmit={handleSubmit}>
                  <label className="block">
                    <span className={labelClass}>Select Product</span>
                    <select
                      name="productId"
                      value={form.productId}
                      onChange={handleChange}
                      className={`${selectClass} !min-h-[52px] !rounded-[16px] !border-[#E7DDD5]`}
                      required
                    >
                      {products.map((product) => (
                        <option key={product.id} value={product.id}>
                          {product.productName} / {product.brand}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="block">
                    <span className={labelClass}>Issue Type</span>
                    <select
                      name="issueType"
                      value={form.issueType}
                      onChange={handleChange}
                      className={`${selectClass} !min-h-[52px] !rounded-[16px] !border-[#E7DDD5]`}
                      required
                    >
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
                      className={`${inputClass} resize-none !rounded-[16px] !border-[#E7DDD5]`}
                      placeholder="Describe the issue clearly so the technician has enough context."
                      required
                    />
                  </label>

                  <label className="block">
                    <span className={labelClass}>Upload Image</span>
                    <div className="rounded-[18px] bg-white">
                      <input
                        type="file"
                        accept=".jpg,.jpeg,.png"
                        onChange={handleFileChange}
                        className="file-input-field !rounded-[16px] !border-[#E7DDD5]"
                      />
                      <p className="mt-2 text-sm text-[#6B7280]">
                        {form.imageName ? `Selected file: ${form.imageName}` : 'Optional, but helpful for faster troubleshooting.'}
                      </p>
                    </div>
                  </label>

                  <div className="flex gap-3 pt-2">
                    <button
                      type="submit"
                      className="flex-1 rounded-[16px] px-4 py-3 text-sm font-semibold text-white !shadow-[0_16px_30px_rgba(110,75,42,0.28)] transition-all duration-300 ease-out active:scale-95"
                      style={{ background: 'linear-gradient(135deg, #A9745B, #6E4B2A)' }}
                    >
                      Submit Request
                    </button>
                    <button
                      type="button"
                      onClick={closeForm}
                      className="rounded-[16px] bg-[#F4ECE7] px-4 py-3 text-sm font-semibold text-[#8B5E3C] transition-all duration-300 ease-out active:scale-95"
                    >
                      Cancel
                    </button>
                  </div>

                  <p className="text-xs leading-relaxed text-[#6B7280]">
                    The request will appear instantly in your service timeline after saving.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
