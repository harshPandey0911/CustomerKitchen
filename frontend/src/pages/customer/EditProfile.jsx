import { useEffect, useState } from 'react';

const inputClass =
  'w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-slate-300 focus:ring-4 focus:ring-slate-100';

const getInitialForm = (profile) => ({
  fullName: profile?.fullName || '',
  email: profile?.email || '',
  phone: profile?.phone || '',
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

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(form);
  };

  const profileInitial = form.fullName.trim().charAt(0).toUpperCase() || 'C';

  return (
    <div className="mx-auto max-w-md">
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/60">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-black text-lg font-semibold text-white">
            {profileInitial}
          </div>
          <div className="space-y-1">
            <h1 className="text-xl font-semibold text-slate-950">Edit Profile</h1>
            <p className="text-sm text-slate-500">Update your customer details and save them back to your profile.</p>
          </div>
        </div>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <label className="block space-y-2">
            <span className="text-sm font-medium text-slate-700">Full Name</span>
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

          <label className="block space-y-2">
            <span className="text-sm font-medium text-slate-700">Email</span>
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

          <label className="block space-y-2">
            <span className="text-sm font-medium text-slate-700">Phone</span>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className={inputClass}
              placeholder="Optional phone number"
            />
          </label>

          <div className="mt-4 flex gap-3">
            <button
              type="submit"
              className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-slate-900"
            >
              Save
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="rounded-md bg-gray-200 px-4 py-2 text-sm font-medium text-black transition-colors duration-200 hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
