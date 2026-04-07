import { useEffect, useState, useRef } from 'react';

const inputClass = 'input-field';
const labelClass = 'customer-label mb-2 block text-[16px] font-bold';

const stripCountryCode = (value = '') => value.replace(/^\+?91[\s-]*/, '');

const getInitialForm = (profile) => ({
  fullName: profile?.fullName || '',
  email: profile?.email || '',
  phone: stripCountryCode(profile?.phone || ''),
  profilePhoto: profile?.profilePhoto || null,
});

export default function EditProfile({ profile, onSubmit, onCancel }) {
  const [form, setForm] = useState(() => getInitialForm(profile));
  const [photoPreview, setPhotoPreview] = useState(profile?.profilePhoto || null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    setForm(getInitialForm(profile));
    setPhotoPreview(profile?.profilePhoto || null);
  }, [profile]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handlePhoneChange = (event) => {
    const digitsOnly = event.target.value.replace(/\D/g, '').slice(0, 10);
    setForm((current) => ({ ...current, phone: digitsOnly }));
  };

  const handlePhotoChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
        setForm((current) => ({ ...current, profilePhoto: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemovePhoto = () => {
    setPhotoPreview(null);
    setForm((current) => ({ ...current, profilePhoto: null }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
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
          <div
            onClick={handlePhotoClick}
            className="relative cursor-pointer group"
          >
            {photoPreview ? (
              <img
                src={photoPreview}
                alt="Profile"
                className="h-16 w-16 rounded-full object-cover border-2 border-amber-200 group-hover:border-amber-400 transition-colors"
              />
            ) : (
              <div className="customer-avatar-btn flex h-16 w-16 shrink-0 items-center justify-center rounded-full text-xl font-semibold text-white border-2 border-amber-200 group-hover:border-amber-400 transition-colors">
                {profileInitial}
              </div>
            )}
            <div className="absolute inset-0 rounded-full bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="text-white text-xs font-semibold">Upload</span>
            </div>
          </div>
          <div className="space-y-1 flex-1">
            <h1 className="customer-heading text-xl font-bold">Edit Profile</h1>
            <p className="customer-subheading text-sm">Update your customer details and save them back to your profile.</p>
          </div>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handlePhotoChange}
          className="hidden"
        />

        {photoPreview && (
          <button
            type="button"
            onClick={handleRemovePhoto}
            className="mt-2 text-xs text-red-600 hover:text-red-700 font-medium"
          >
            ✕ Remove Photo
          </button>
        )}

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
