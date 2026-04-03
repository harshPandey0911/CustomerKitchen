import { useMemo, useState } from 'react';
import { warrantyPeriodOptions } from '../../data/customerOwnership';
import { APP_NAME } from '../../constants/branding';

const inputClass =
  'w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-slate-300 focus:ring-4 focus:ring-slate-100';

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
      <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/60 lg:p-8">
        <div className="max-w-2xl">
          <h1 className="text-2xl font-semibold text-slate-950 lg:text-3xl">Register Product</h1>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            Add a newly purchased appliance to your ownership dashboard and keep invoice, coverage, and service history together from day one.
          </p>
        </div>

        <form className="mt-8 grid gap-5 md:grid-cols-2" onSubmit={handleSubmit}>
          <label className="space-y-2 md:col-span-2">
            <span className="text-sm font-medium text-slate-700">Product Name</span>
            <select name="productName" value={form.productName} onChange={handleChange} className={inputClass} required>
              {productOptions.map((option) => (
                <option key={option.name} value={option.name}>
                  {option.name}
                </option>
              ))}
            </select>
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-700">Brand</span>
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

          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-700">Model Number</span>
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

          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-700">Purchase Date</span>
            <input type="date" name="purchaseDate" value={form.purchaseDate} onChange={handleChange} className={inputClass} required />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-700">Warranty Period</span>
            <select name="warrantyMonths" value={form.warrantyMonths} onChange={handleChange} className={inputClass} required>
              {warrantyPeriodOptions.map((period) => (
                <option key={period} value={period}>
                  {period} months
                </option>
              ))}
            </select>
          </label>

          <label className="space-y-2 md:col-span-2">
            <span className="text-sm font-medium text-slate-700">Upload Invoice</span>
            <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-5">
              <input type="file" accept=".jpg,.jpeg,.png,.pdf" onChange={handleFileChange} className="w-full text-sm text-slate-500" />
              <p className="mt-2 text-sm text-slate-500">
                {form.invoiceName ? `Selected file: ${form.invoiceName}` : 'Invoice upload is optional. We will store the file name in this mock flow.'}
              </p>
            </div>
          </label>

          <div className="md:col-span-2 flex flex-wrap items-center gap-3 pt-2">
            <button
              type="submit"
              className="rounded-full bg-slate-950 px-5 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-black"
            >
              Save Product
            </button>
            <span className="text-sm text-slate-500">You will be redirected to My Products after saving.</span>
          </div>
        </form>
      </section>

      <aside className="space-y-4">
        <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm shadow-slate-200/60">
          <img src={selectedProduct?.image} alt={selectedProduct?.name} className="h-56 w-full object-cover" />
          <div className="space-y-3 p-5">
            <p className="text-lg font-semibold text-slate-950">{selectedProduct?.name}</p>
            <p className="text-sm leading-6 text-slate-500">
              A quick preview keeps product registration grounded and helps users confirm they are adding the correct appliance.
            </p>
          </div>
        </div>

        <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/60">
          <h2 className="text-lg font-semibold text-slate-950">Why register?</h2>
          <div className="mt-4 space-y-4 text-sm leading-6 text-slate-500">
            <p>Track every warranty with a clear expiry date and visual usage bar.</p>
            <p>Raise service requests faster because appliance details are already attached.</p>
            <p>Receive proactive alerts when warranty coverage is about to expire.</p>
          </div>
        </div>
      </aside>
    </div>
  );
}
