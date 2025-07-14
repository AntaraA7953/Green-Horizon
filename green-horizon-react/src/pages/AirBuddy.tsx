import React from 'react'

const AirBuddy: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-emerald-500 to-teal-600 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 text-center">
          <div className="text-8xl mb-6">🌬️</div>
          <h1 className="text-4xl font-bold text-white mb-4">Air Buddy</h1>
          <p className="text-xl text-white/90 mb-8">
            Real-time air quality monitoring and health recommendations
          </p>
          <div className="bg-white/20 rounded-lg p-6">
            <p className="text-white/80">
              This page will contain the Air Buddy application with real-time AQI data,
              weather information, and personalized health tips.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AirBuddy