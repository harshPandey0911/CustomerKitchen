const labelClass = 'mb-2 block text-sm font-semibold text-[#1E1E1E]';
const fieldClass = 'input-field !min-h-[54px] !rounded-[16px] !border-[#E7DDD5] !bg-white !text-[#1E1E1E] placeholder:!text-[#9CA3AF]';
const fileFieldClass = 'file-input-field !rounded-[16px] !border-[#E7DDD5] !bg-white';

export default function RegisterForm({
  form,
  productOptions,
  warrantyOptions,
  brandPlaceholder,
  onChange,
  onFileChange,
  onSubmit,
}) {
  return (
    <section className="rounded-[24px] bg-white p-4 !shadow-[0_14px_34px_rgba(30,30,30,0.08)]">
      <div>
        <h2 className="text-[1rem] font-bold tracking-[-0.02em] text-[#1E1E1E]">Product details</h2>
        <p className="mt-1 text-sm leading-6 text-[#6B7280]">
          Add a few essentials to connect warranty coverage and invoice records.
        </p>
      </div>

      <form className="mt-5 space-y-4" onSubmit={onSubmit}>
        <label className="block">
          <span className={labelClass}>Product Name</span>
          <select name="productName" value={form.productName} onChange={onChange} className={fieldClass} required>
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
            onChange={onChange}
            className={fieldClass}
            placeholder={brandPlaceholder}
            required
          />
        </label>

        <label className="block">
          <span className={labelClass}>Purchase Date</span>
          <input
            type="date"
            name="purchaseDate"
            value={form.purchaseDate}
            onChange={onChange}
            className={fieldClass}
            required
          />
        </label>

        <label className="block">
          <span className={labelClass}>Warranty Period</span>
          <select name="warrantyMonths" value={form.warrantyMonths} onChange={onChange} className={fieldClass} required>
            {warrantyOptions.map((period) => (
              <option key={period} value={period}>
                {period} months
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className={labelClass}>Upload Invoice</span>
          <input type="file" accept=".jpg,.jpeg,.png,.pdf" onChange={onFileChange} className={fileFieldClass} />
          <p className="mt-2 text-xs leading-5 text-[#6B7280]">
            {form.invoiceName ? `Selected file: ${form.invoiceName}` : 'Optional, but useful for faster warranty support.'}
          </p>
        </label>

        <button
          type="submit"
          className="w-full rounded-[18px] px-4 py-4 text-sm font-semibold text-white !shadow-[0_16px_30px_rgba(110,75,42,0.28)] transition-all duration-300 ease-out active:scale-95"
          style={{ background: 'linear-gradient(135deg, #A9745B, #6E4B2A)' }}
        >
          Register Product
        </button>
      </form>
    </section>
  );
}
