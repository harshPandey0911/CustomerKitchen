import React from 'react';
import { APP_NAME } from '../../constants/branding';

const AdminSidebar = ({ activeSection, setActiveSection }) => {
  const menuItems = [
    { id: 'dashboard', icon: '🏠', label: 'Dashboard', color: 'text-orange-400' },
    { id: 'subadmins', icon: '👨‍💼', label: 'Sub-Admins', color: 'text-blue-400' },
    { id: 'business-rules', icon: '⚙️', label: 'Business Rules', color: 'text-green-400' },
    { id: 'financial-reports', icon: '💳', label: 'Financial Reports', color: 'text-yellow-400' },
    { id: 'operational-reports', icon: '📦', label: 'Appliance Stock', color: 'text-red-400' },
    { id: 'performance-reports', icon: '📊', label: 'Performance', color: 'text-purple-400' },
    { id: 'rewards', icon: '🎁', label: 'Loyalty Program', color: 'text-pink-400' },
    { id: 'permissions', icon: '🔐', label: 'Permissions', color: 'text-indigo-400' },
    { id: 'system-control', icon: '🖥️', label: 'System Control', color: 'text-cyan-400' },
  ];

  return (
    <div className="w-64 border-r border-orange-200 p-4 h-full bg-gradient-to-b from-indigo-50 to-white overflow-y-auto">
      <div className="sticky top-0 bg-gradient-to-b from-indigo-50 to-white pb-4 mb-4 border-b border-orange-200">
        <h3 className="text-xs font-bold text-orange-400 uppercase tracking-widest truncate">🍳 {APP_NAME}</h3>
      </div>
      <div className="space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveSection(item.id)}
            className={`w-full flex items-center gap-2 px-3 py-2 md:py-3 md:px-4 rounded-lg transition-all text-xs md:text-sm ${
              activeSection === item.id
                ? 'bg-gradient-to-r from-orange-600/40 to-red-600/40 border-l-2 border-orange-400'
                : 'hover:bg-gray-700/50'
            }`}
          >
            <span className="text-lg">{item.icon}</span>
            <span className={`${item.color} font-medium truncate hidden sm:block`}>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default AdminSidebar;
