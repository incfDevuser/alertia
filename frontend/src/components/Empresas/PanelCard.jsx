import React from 'react'

const PanelCard = ({ title, value, trend, icon, trendType }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-all duration-300">
      <div className="flex justify-between items-start">
        <div className={`p-3 rounded-xl ${
          trendType === 'up' ? 'bg-gradient-to-br from-blue-50 to-cyan-50 text-blue-500' :
          trendType === 'down' ? 'bg-gradient-to-br from-red-50 to-pink-50 text-red-500' :
          'bg-gradient-to-br from-gray-50 to-slate-50 text-gray-500'
        }`}>
          {icon}
        </div>
        <span className={`text-sm font-medium px-3 py-1 rounded-full ${
          trendType === 'up' ? 'bg-green-50 text-green-600' :
          trendType === 'down' ? 'bg-red-50 text-red-600' :
          'bg-gray-50 text-gray-600'
        }`}>
          {trend}
        </span>
      </div>
      <h3 className="text-2xl font-bold text-gray-800 mt-4">{value}</h3>
      <p className="text-gray-500 font-medium mt-1">{title}</p>
    </div>
  )
}

export default PanelCard
