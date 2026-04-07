import { FiPhone, FiMail, FiClock, FiHeadphones } from 'react-icons/fi';
import { SUPPORT_EMAIL } from '../../constants/branding';

export default function Support() {
  const supportPhone = '+91 9876543210';
  const supportEmail = SUPPORT_EMAIL;
  const workingHours = '9 AM - 6 PM, Mon - Sat';

  const contactMethods = [
    {
      icon: FiPhone,
      label: 'Phone Support',
      value: supportPhone,
      description: 'Talk to our support team',
      action: () => window.location.href = `tel:${supportPhone}`,
      actionText: 'Call Now',
    },
    {
      icon: FiMail,
      label: 'Email Support',
      value: supportEmail,
      description: 'We typically respond within 2 hours',
      action: () => window.location.href = `mailto:${supportEmail}`,
      actionText: 'Send Email',
    },
    {
      icon: FiClock,
      label: 'Working Hours',
      value: workingHours,
      description: 'Available during business hours',
      action: null,
      actionText: null,
    },
  ];

  return (
    <div className="space-y-4">
      {/* Header Section */}
      <div className="customer-surface rounded-2xl p-4 bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-700/15 flex-shrink-0">
            <FiHeadphones className="h-5 w-5 text-amber-800" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900">Kitchen Appliance Support</h1>
            <p className="mt-1 text-xs text-gray-700">
              We're here to help! Contact us via phone or email anytime.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Methods */}
      <section className="grid gap-3 sm:grid-cols-1">
        {contactMethods.map((method) => {
          const Icon = method.icon;
          return (
            <div
              key={method.label}
              className="customer-surface rounded-xl p-4 border border-gray-100 hover:border-amber-300 hover:shadow-sm transition-all duration-300"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-700/15 flex-shrink-0">
                  <Icon className="h-5 w-5 text-amber-800" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-sm text-gray-900">{method.label}</h3>
                  <p className="mt-1 text-base font-semibold text-amber-900 break-all">{method.value}</p>
                  <p className="mt-0.5 text-xs text-gray-600">{method.description}</p>
                </div>
              </div>
              {method.action && (
                <button
                  onClick={method.action}
                  className="mt-3 w-full bg-yellow-900 hover:bg-yellow-950 text-white font-semibold py-2 px-3 rounded-lg transition-colors duration-300 text-sm"
                >
                  {method.actionText}
                </button>
              )}
            </div>
          );
        })}
      </section>

      {/* Quick Tips Section */}
      <div className="customer-surface rounded-xl p-4 border border-gray-100">
        <h2 className="text-sm font-bold text-gray-900 mb-2">Quick Tips</h2>
        <ul className="space-y-2 text-xs text-gray-700">
          <li className="flex items-start gap-2">
            <span className="text-amber-800 font-bold flex-shrink-0">✓</span>
            <span>Have your product details handy when contacting support</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-amber-800 font-bold flex-shrink-0">✓</span>
            <span>Photos help us resolve issues faster</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-amber-800 font-bold flex-shrink-0">✓</span>
            <span>For urgent matters, call during business hours</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-amber-800 font-bold flex-shrink-0">✓</span>
            <span>Email responses within 2 hours on weekdays</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
