import { useEffect, useState } from 'react';

const inputClass = 'input-field';
const labelClass = 'customer-label mb-2 block text-[16px] font-bold';

const stripCountryCode = (value = '') => value.replace(/^\+?91[\s-]*/, '');

const getInitialForm = (profile) => ({
  fullName: profile?.fullName || '',
  email: profile?.email || '',
  phone: stripCountryCode(profile?.phone || ''),
});

export default function EditProfile({ profile, onSubmit, onCancel }) {
  const [form, setForm] = useState(() => getInitialForm(profile));

  useEffect(() => {
    setForm(getInitialForm(profile));
  }, [profile]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handlePhoneChange = (event) => {
    const digitsOnly = event.target.value.replace(/\D/g, '').slice(0, 10);
    setForm((current) => ({ ...current, phone: digitsOnly }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({
      ...form,
      phone: form.phone.trim() ? `+91 ${form.phone.trim()}` : '',
    });
  };

  const profileInitial = form.fullName.trim().charAt(0).toUpperCase() || 'C';

  return (
    <div className="mx-auto max-w-md">
      <div className="customer-surface rounded-xl p-6">
        <div className="flex items-center gap-4">
          <div className="customer-avatar-btn flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-base font-semibold text-white">
            {profileInitial}
          </div>
          <div className="space-y-1">
            <h1 className="customer-heading text-xl font-bold">Edit Profile</h1>
            <p className="customer-subheading text-sm">Update your customer details and save them back to your profile.</p>
          </div>
        </div>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <label className="block">
            <span className={labelClass}>Full Name</span>
            <input
              type="text"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              className={inputClass}
              placeholder="Enter your full name"
              required
            />
          </label>

          <label className="block">
            <span className={labelClass}>Email</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className={inputClass}
              placeholder="Enter your email"
              required
            />
          </label>

          <label className="block">
            <span className={labelClass}>Phone</span>
            <div className="input-group">
              <span>+91</span>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handlePhoneChange}
                className="input-field no-border"
                placeholder="Optional phone number"
                inputMode="numeric"
              />
            </div>
          </label>

          <div className="mt-4 flex gap-3">
            <button
              type="submit"
              className="customer-primary-btn rounded-md px-4 py-2 text-sm"
            >
              Save
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="customer-secondary-btn rounded-md px-4 py-2 text-sm"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
