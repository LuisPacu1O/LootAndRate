import React from 'react';

export default function StatsCard({ title, value, icon: Icon }) {
  return (
    <div className="flex items-center space-x-4 bg-gray-900 text-white p-4 rounded-xl shadow">
      {Icon && <Icon className="w-6 h-6 text-blue-400" />}
      <div>
        <p className="text-sm text-gray-400">{title}</p>
        <p className="text-xl font-bold text-blue-300">{value}</p>
      </div>
    </div>
  );
}
