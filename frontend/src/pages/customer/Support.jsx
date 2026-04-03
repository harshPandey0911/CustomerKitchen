import { SUPPORT_EMAIL } from '../../constants/branding';

export default function Support() {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="customer-heading text-xl font-semibold">Support</h1>
        <p className="customer-subheading mt-2">
          Need help? Contact us at{' '}
          <a className="customer-link-btn font-medium" href={`mailto:${SUPPORT_EMAIL}`}>
            {SUPPORT_EMAIL}
          </a>
        </p>
      </div>

      <div className="customer-surface rounded-2xl p-5 text-gray-600">
        <p><b className="customer-heading">Phone:</b> +91 9876543210</p>
        <p><b className="customer-heading">Email:</b> {SUPPORT_EMAIL}</p>
        <p><b className="customer-heading">Working Hours:</b> 9 AM - 6 PM</p>
      </div>
    </div>
  );
}
