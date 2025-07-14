import React from 'react'

const Wasteless: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-emerald-500 to-teal-600 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 text-center">
          <div className="text-8xl mb-6">♻️</div>
          <h1 className="text-4xl font-bold text-white mb-4">Wasteless</h1>
          <p className="text-xl text-white/90 mb-8">
            AI-powered waste classification and recycling guidance
          </p>
          <div className="bg-white/20 rounded-lg p-6 mb-6">
            <p className="text-white/80 mb-4">
              This page will contain the Wasteless application with AI image classification,
              waste sorting guidance, and educational resources.
            </p>
            <a 
              href="https://trash-vision-classify-it.vercel.app/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 bg-white/20 hover:bg-white/30 text-white font-semibold rounded-lg transition-all"
            >
              Visit Current Wasteless App →
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Wasteless