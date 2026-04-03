import { useMemo, useState } from 'react';
import { warrantyPeriodOptions } from '../../data/customerOwnership';
import { APP_NAME } from '../../constants/branding';

const inputClass = 'input-field';
const selectClass = 'input-field';
const labelClass = 'customer-label mb-2 block text-[16px] font-bold';

const initialFormState = (productOptions) => ({
  productName: productOptions[0]?.name || '',
  brand: '',
  modelNumber: '',
  purchaseDate: '',
  warrantyMonths: String(warrantyPeriodOptions[1] || 12),
  invoiceName: '',
});

export default function RegisterProduct({ productOptions, onSubmit }) {
  const [form, setForm] = useState(() => initialFormState(productOptions));

  const selectedProduct = useMemo(
    () => productOptions.find((product) => product.name === form.productName) || productOptions[0],
    [form.productName, productOptions],
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleFileChange = (event) => {
    const invoiceName = event.target.files?.[0]?.name || '';
    setForm((current) => ({ ...current, invoiceName }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({
      ...form,
      warrantyMonths: Number(form.warrantyMonths),
    });
    setForm(initialFormState(productOptions));
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_380px]">
      <section className="customer-surface customer-card-item rounded-[28px] p-6 lg:p-8">
        <div className="max-w-2xl">
          <h1 className="customer-page-title text-2xl lg:text-3xl">Register Product</h1>
          <p className="customer-page-subtext mt-2 text-sm leading-relaxed">
            Add a newly purchased appliance to your ownership dashboard and keep invoice, coverage, and service history together from day one.
          </p>
        </div>

        <form className="customer-section-wrapper mt-8 grid gap-5 md:grid-cols-2" onSubmit={handleSubmit}>
          <label className="block md:col-span-2">
            <span className={labelClass}>Product Name</span>
            <select name="productName" value={form.productName} onChange={handleChange} className={selectClass} required>
              {productOptions.map((option) => (
                <option key={option.name} value={option.name}>
                  {option.name}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className={labelClass}>Brand</span>
            <input
              type="text"
              name="brand"
              value={form.brand}
              onChange={handleChange}
              className={inputClass}
              placeholder={APP_NAME}
              required
            />
          </label>

          <label className="block">
            <span className={labelClass}>Model Number</span>
            <input
              type="text"
              name="modelNumber"
              value={form.modelNumber}
              onChange={handleChange}
              className={inputClass}
              placeholder="KH-MX500"
              required
            />
          </label>

          <label className="block">
            <span className={labelClass}>Purchase Date</span>
            <input type="date" name="purchaseDate" value={form.purchaseDate} onChange={handleChange} className={inputClass} required />
          </label>

          <label className="block">
            <span className={labelClass}>Warranty Period</span>
            <select name="warrantyMonths" value={form.warrantyMonths} onChange={handleChange} className={selectClass} required>
              {warrantyPeriodOptions.map((period) => (
                <option key={period} value={period}>
                  {period} months
                </option>
              ))}
            </select>
          </label>

          <label className="block md:col-span-2">
            <span className={labelClass}>Upload Invoice</span>
            <div className="customer-soft-surface customer-card-item rounded-2xl border border-dashed px-4 py-5">
              <input type="file" accept=".jpg,.jpeg,.png,.pdf" onChange={handleFileChange} className="file-input-field" />
              <p className="customer-subheading mt-2 text-sm">
                {form.invoiceName ? `Selected file: ${form.invoiceName}` : 'Invoice upload is optional. We will store the file name in this mock flow.'}
              </p>
            </div>
          </label>

          <div className="md:col-span-2 flex flex-wrap items-center gap-3 pt-2">
            <button
              type="submit"
              className="customer-primary-btn rounded-full px-5 py-2.5 text-sm"
            >
              Save Product
            </button>
            <span className="customer-subheading text-sm">You will be redirected to My Products after saving.</span>
          </div>
        </form>
      </section>

      <aside className="space-y-4">
        <div className="customer-surface customer-card-item overflow-hidden rounded-[28px]">
          <img src={selectedProduct?.image} alt={selectedProduct?.name} className="h-56 w-full object-cover" />
          <div className="space-y-3 p-5">
            <p className="customer-section-title text-lg font-bold">{selectedProduct?.name}</p>
            <p className="customer-section-subtext text-sm leading-6">
              A quick preview keeps product registration grounded and helps users confirm they are adding the correct appliance.
            </p>
          </div>
        </div>

        <div className="customer-surface customer-card-item rounded-[28px] p-5">
          <h2 className="customer-section-title text-lg font-bold">Why register?</h2>
          <div className="customer-section-subtext mt-4 space-y-4 text-sm leading-6">
            <p>Track every warranty with a clear expiry date and visual usage bar.</p>
            <p>Raise service requests faster because appliance details are already attached.</p>
            <p>Receive proactive alerts when warranty coverage is about to expire.</p>
          </div>
        </div>
      </aside>
    </div>
  );
}
