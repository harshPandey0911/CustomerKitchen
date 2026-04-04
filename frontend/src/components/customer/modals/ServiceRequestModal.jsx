import { useEffect, useMemo, useState } from 'react';
import { LuImage, LuPackage, LuWrench } from 'react-icons/lu';
import { getProductImage, serviceIssueTypes } from '../../../data/customerOwnership';
import ModalWrapper from './ModalWrapper';

const labelClass = 'mb-2 block text-sm font-semibold text-[#1E1E1E]';
const fieldClass = 'input-field !min-h-[54px] !rounded-[16px] !border-[#E7DDD5] !bg-white !text-[#1E1E1E] placeholder:!text-[#9CA3AF]';
const fileFieldClass = 'file-input-field !rounded-[16px] !border-[#E7DDD5] !bg-white';

const createInitialForm = (products) => ({
  productId: products[0]?.id || '',
  issueType: serviceIssueTypes[0],
  description: '',
  imageName: '',
});

export default function ServiceRequestModal({ open, onClose, products, onSubmit }) {
  const [form, setForm] = useState(() => createInitialForm(products));

  useEffect(() => {
    if (open) {
      setForm(createInitialForm(products));
    }
  }, [open, products]);

  const selectedProduct = useMemo(
    () => products.find((product) => product.id === form.productId) || products[0] || null,
    [form.productId, products],
  );
  const selectedProductImage = selectedProduct ? getProductImage(selectedProduct.productName) : '';

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
  };

  if (!products.length) {
    return null;
  }

  return (
    <ModalWrapper open={open} title="Raise Service Request" onClose={onClose}>
      <div className="space-y-4 pb-6">
        <section className="rounded-[24px] bg-white p-4 !shadow-[0_14px_34px_rgba(30,30,30,0.08)]">
          <div className="flex items-center gap-3">
            <div className="flex h-16 w-16 flex-none items-center justify-center overflow-hidden rounded-[18px] bg-[#FBF8F5]">
              {selectedProductImage ? (
                <img
                  src={selectedProductImage}
                  alt={selectedProduct?.productName || 'Selected product'}
                  className="h-full w-full object-cover"
                />
              ) : (
                <LuPackage className="h-6 w-6 text-[#8B5E3C]" />
              )}
            </div>

            <div className="min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#A9745B]">Selected Product</p>
              <p className="mt-1 text-sm font-semibold text-[#1E1E1E]">{selectedProduct?.productName || 'Choose a product'}</p>
              <p className="mt-1 text-sm leading-6 text-[#6B7280]">Share the issue details so support can respond faster.</p>
            </div>
          </div>
        </section>

        <section className="rounded-[24px] bg-white p-4 !shadow-[0_14px_34px_rgba(30,30,30,0.08)]">
          <div>
            <h3 className="text-[1rem] font-bold tracking-[-0.02em] text-[#1E1E1E]">Request details</h3>
            <p className="mt-1 text-sm leading-6 text-[#6B7280]">Describe the problem clearly for a faster service response.</p>
          </div>

          <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
            <label className="block">
              <span className={labelClass}>Select Product</span>
              <select name="productId" value={form.productId} onChange={handleChange} className={fieldClass} required>
                {products.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.productName} / {product.brand}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className={labelClass}>Issue Type</span>
              <select name="issueType" value={form.issueType} onChange={handleChange} className={fieldClass} required>
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
                className={`${fieldClass} resize-none !min-h-[120px]`}
                placeholder="Describe the issue clearly so the technician has enough context."
                required
              />
            </label>

            <label className="block">
              <span className={labelClass}>Upload Image</span>
              <input
                type="file"
                accept=".jpg,.jpeg,.png"
                onChange={handleFileChange}
                className={fileFieldClass}
              />
              <p className="mt-2 text-xs leading-5 text-[#6B7280]">
                {form.imageName ? `Selected file: ${form.imageName}` : 'Optional, but useful for faster troubleshooting.'}
              </p>
            </label>

            <button
              type="submit"
              className="w-full rounded-[18px] px-4 py-4 text-sm font-semibold text-white !shadow-[0_16px_30px_rgba(110,75,42,0.28)] transition-all duration-300 ease-out active:scale-95"
              style={{ background: 'linear-gradient(135deg, #A9745B, #6E4B2A)' }}
            >
              Submit Request
            </button>
          </form>
        </section>

        <section className="rounded-[24px] bg-white p-4 !shadow-[0_14px_34px_rgba(30,30,30,0.08)]">
          <div className="space-y-3">
            <div className="flex items-center gap-3 rounded-[18px] bg-[#FBF8F5] px-3.5 py-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F4ECE7] text-[#8B5E3C]">
                <LuWrench className="h-4 w-4" />
              </span>
              <span className="text-sm font-medium text-[#1E1E1E]">Track service progress</span>
            </div>

            <div className="flex items-center gap-3 rounded-[18px] bg-[#FBF8F5] px-3.5 py-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F4ECE7] text-[#8B5E3C]">
                <LuImage className="h-4 w-4" />
              </span>
              <span className="text-sm font-medium text-[#1E1E1E]">Attach issue photos for better support</span>
            </div>
          </div>
        </section>
      </div>
    </ModalWrapper>
  );
}
