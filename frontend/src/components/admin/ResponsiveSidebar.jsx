import React, { useState } from 'react';
import { APP_DOMAIN } from '../../constants/branding';

const ResponsiveSidebar = ({ menuItems, activeItem, setActiveItem, onLogout, title = "Menu", topOffset = "5rem", heightCalc = "calc(100vh - 5rem)" }) => {
  return (
    <div className="hidden md:flex bg-indigo-50 flex-col fixed w-64 left-0 z-40" style={{ top: topOffset, height: heightCalc }}>
      {/* Header Section */}
      <div className="bg-gradient-to-r from-gray-100 to-gray-50 px-4 py-3 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-orange-500/20 flex items-center justify-center text-xs">
            ⚡
          </div>
          <h2 className="text-gray-900 font-bold text-base">{title}</h2>
        </div>
      </div>

      {/* Menu Items with Categories */}
      <nav className="flex-1 px-2 py-3 space-y-2 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        {menuItems.map((section, idx) => (
          <div key={idx}>
            <p className="text-xs font-bold text-orange-600 px-3 py-2 uppercase tracking-wider">{section.category}</p>
            <div className="space-y-1">
              {section.items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveItem(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded transition-all duration-200 text-left text-xs flex-shrink-0 ${
                    activeItem === item.id
                      ? 'bg-orange-500/20 text-orange-700'
                      : 'text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <span className="text-lg flex-shrink-0">{item.icon}</span>
                  <span className="font-medium truncate">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer - User Profile and Logout */}
      <div className="px-2 py-3 border-t border-gray-300 space-y-3 flex-shrink-0">
        {/* User Profile */}
        <div className="flex flex-col items-center text-center px-2 py-2">
          <div className="w-12 h-12 mb-2 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-sm font-bold text-white">
            C
          </div>
          <h3 className="font-semibold text-gray-900 text-xs">Customer</h3>
          <p className="text-gray-500 text-xs">{`customer@${APP_DOMAIN}`}</p>
        </div>

        {/* Logout Button */}
        <button onClick={onLogout} className="w-full flex items-center gap-3 px-3 py-2 rounded text-red-400 hover:bg-red-500/10 transition-all duration-200 text-left font-medium text-xs">
          <span className="text-lg flex-shrink-0">🚪</span>
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default ResponsiveSidebar;
