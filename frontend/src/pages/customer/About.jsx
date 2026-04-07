import { FiTrendingUp, FiShield, FiUsers, FiAward } from 'react-icons/fi';
import { APP_NAME } from '../../constants/branding';

export default function About() {
  const features = [
    {
      icon: FiTrendingUp,
      title: 'Smart Platform',
      description: 'Discover and manage kitchen appliances with ease',
    },
    {
      icon: FiShield,
      title: 'Warranty Protection',
      description: 'Complete warranty tracking and support',
    },
    {
      icon: FiUsers,
      title: 'Community',
      description: 'Join thousands of satisfied customers',
    },
    {
      icon: FiAward,
      title: 'Quality',
      description: 'Premium appliances and service',
    },
  ];

  return (
    <div className="space-y-5">
      {/* Hero Section */}
      <div className="customer-surface rounded-3xl p-6 bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200">
        <div className="space-y-3">
          <h1 className="text-2xl font-bold text-amber-950">{`About ${APP_NAME}`}</h1>
          <p className="text-sm text-amber-900 leading-relaxed">
            {`${APP_NAME} is a comprehensive platform dedicated to simplifying your kitchen appliance experience. We help you explore, purchase, and manage kitchen appliances with confidence and ease.`}
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="customer-surface rounded-2xl p-4 border border-amber-100">
        <h2 className="text-sm font-bold text-amber-950 mb-2">Our Mission</h2>
        <p className="text-xs text-gray-700 leading-relaxed">
          To provide customers with a reliable platform for managing their kitchen appliances, offering comprehensive warranty tracking, timely service support, and peace of mind.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-2 gap-3">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <div
              key={feature.title}
              className="customer-surface rounded-xl p-3 border border-amber-100 hover:border-amber-300 transition-all duration-300"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-700/15 mb-2">
                <Icon className="h-4 w-4 text-amber-800" />
              </div>
              <h3 className="text-xs font-bold text-gray-900">{feature.title}</h3>
              <p className="text-xs text-gray-600 mt-1">{feature.description}</p>
            </div>
          );
        })}
      </div>

      {/* Version & Info */}
      <div className="customer-surface rounded-2xl p-4 border border-amber-100">
        <div className="space-y-3">
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Version</p>
            <p className="text-lg font-bold text-amber-950 mt-1">1.0.0</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</p>
            <p className="text-sm text-amber-900 mt-1">Developed for learning & project purpose</p>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="customer-surface rounded-2xl p-4 bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 text-center">
        <p className="text-xs text-gray-700 leading-relaxed">
          Thank you for choosing <span className="font-bold text-amber-950">{APP_NAME}</span>. We're committed to providing you with the best kitchen appliance management experience.
        </p>
      </div>
    </div>
  );
}
