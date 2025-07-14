import React from 'react'

const LocalHarvest: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-emerald-500 to-teal-600 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 text-center">
          <div className="text-8xl mb-6">🌽</div>
          <h1 className="text-4xl font-bold text-white mb-4">Local Harvest</h1>
          <p className="text-xl text-white/90 mb-8">
            Discover local farms, organic vendors, and seasonal markets
          </p>
          <div className="bg-white/20 rounded-lg p-6">
            <p className="text-white/80">
              This page will contain the Local Harvest application with interactive maps,
              local food discovery, and sustainable consumption features.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LocalHarvest