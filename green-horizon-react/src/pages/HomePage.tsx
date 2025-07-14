import React from 'react'
import { Link } from 'react-router-dom'

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-emerald-500 to-teal-600 relative overflow-hidden">
      {/* Background video placeholder */}
      <div className="absolute inset-0 opacity-30">
        <div className="w-full h-full bg-gradient-to-br from-green-400/20 via-emerald-500/20 to-teal-600/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            🌿 Welcome to <span className="text-green-200">Green Horizon</span>
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Explore sustainable initiatives and eco-friendly solutions for a better tomorrow
          </p>
        </div>

        {/* Navigation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {/* Green Lane */}
          <Link
            to="/green-lane"
            className="group relative bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 text-center hover:bg-white/20 transition-all duration-300 hover:scale-105"
          >
            <div className="text-6xl mb-4">🚴</div>
            <h3 className="text-2xl font-bold text-white mb-2">Green Lane</h3>
            <p className="text-white/80 mb-4">Eco-friendly route planning</p>
            <div className="text-green-200 font-medium">Explore →</div>
            
            {/* Decorative leaf */}
            <svg className="absolute bottom-4 right-4 w-8 h-8 text-white/20 group-hover:text-white/40 transition-colors" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
              <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
            </svg>
          </Link>

          {/* Local Harvest */}
          <Link
            to="/local-harvest"
            className="group relative bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 text-center hover:bg-white/20 transition-all duration-300 hover:scale-105"
          >
            <div className="text-6xl mb-4">🌽</div>
            <h3 className="text-2xl font-bold text-white mb-2">Local Harvest</h3>
            <p className="text-white/80 mb-4">Discover local food sources</p>
            <div className="text-green-200 font-medium">Explore →</div>
            
            <svg className="absolute bottom-4 right-4 w-8 h-8 text-white/20 group-hover:text-white/40 transition-colors" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
              <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
            </svg>
          </Link>

          {/* Air Buddy */}
          <Link
            to="/air-buddy"
            className="group relative bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 text-center hover:bg-white/20 transition-all duration-300 hover:scale-105"
          >
            <div className="text-6xl mb-4">🌬️</div>
            <h3 className="text-2xl font-bold text-white mb-2">Air Buddy</h3>
            <p className="text-white/80 mb-4">Real-time air quality monitoring</p>
            <div className="text-green-200 font-medium">Explore →</div>
            
            <svg className="absolute bottom-4 right-4 w-8 h-8 text-white/20 group-hover:text-white/40 transition-colors" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
              <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
            </svg>
          </Link>

          {/* Wasteless */}
          <Link
            to="/wasteless"
            className="group relative bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 text-center hover:bg-white/20 transition-all duration-300 hover:scale-105"
          >
            <div className="text-6xl mb-4">♻️</div>
            <h3 className="text-2xl font-bold text-white mb-2">Wasteless</h3>
            <p className="text-white/80 mb-4">AI-powered waste classification</p>
            <div className="text-green-200 font-medium">Explore →</div>
            
            <svg className="absolute bottom-4 right-4 w-8 h-8 text-white/20 group-hover:text-white/40 transition-colors" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
              <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
            </svg>
          </Link>
        </div>

        {/* Footer */}
        <div className="text-center mt-16">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 max-w-4xl mx-auto">
            <p className="text-white/90 mb-4">
              &copy; {new Date().getFullYear()} Green Horizon - Sustainable Solutions for a Better World
            </p>
            <div className="flex justify-center space-x-6">
              <a href="#" className="text-white/70 hover:text-white transition-colors">About</a>
              <a href="#" className="text-white/70 hover:text-white transition-colors">Contact</a>
              <a href="#" className="text-white/70 hover:text-white transition-colors">Privacy</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage