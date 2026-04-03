import { SUPPORT_EMAIL } from '../../constants/branding';

export default function Support() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-semibold text-gray-900">Support</h1>
        <p className="mt-2 text-gray-500">
          Need help? Contact us at{' '}
          <a className="font-medium text-gray-700 hover:text-black" href={`mailto:${SUPPORT_EMAIL}`}>
            {SUPPORT_EMAIL}
          </a>
        </p>
      </div>

      <div className="rounded-xl bg-white p-4 shadow-sm">
        <p><b>Phone:</b> +91 9876543210</p>
        <p><b>Email:</b> {SUPPORT_EMAIL}</p>
        <p><b>Working Hours:</b> 9 AM - 6 PM</p>
      </div>
    </div>
  );
}
