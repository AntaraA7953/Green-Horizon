import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { AuthModal } from './AuthModal'
import { UserAccount } from './UserAccount'
import { Leaf, User, Menu, X } from 'lucide-react'

export const Navbar: React.FC = () => {
  const { user } = useAuth()
  const location = useLocation()
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [showUserAccount, setShowUserAccount] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const isHomePage = location.pathname === '/'

  const navItems = [
    { path: '/green-lane', label: 'Green Lane' },
    { path: '/local-harvest', label: 'Local Harvest' },
    { path: '/air-buddy', label: 'Air Buddy' },
    { path: '/wasteless', label: 'Wasteless' },
  ]

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-40 bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <Leaf className="h-6 w-6 text-green-400" />
              </div>
              <span className="text-xl font-bold text-white">Green Horizon</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {!isHomePage && (
                <div className="flex space-x-6">
                  {navItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`text-white/80 hover:text-white transition-colors ${
                        location.pathname === item.path ? 'text-white font-medium' : ''
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}

              {/* Auth Section */}
              {user ? (
                <button
                  onClick={() => setShowUserAccount(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                >
                  <User className="h-5 w-5 text-white" />
                  <span className="text-white">{user.user_metadata?.full_name || 'Account'}</span>
                </button>
              ) : (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all"
                >
                  Sign In
                </button>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-white/80 hover:text-white transition-colors"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-white/20">
              <div className="flex flex-col space-y-4">
                {!isHomePage && (
                  <>
                    {navItems.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`text-white/80 hover:text-white transition-colors px-4 py-2 ${
                          location.pathname === item.path ? 'text-white font-medium bg-white/10 rounded-lg' : ''
                        }`}
                      >
                        {item.label}
                      </Link>
                    ))}
                    <div className="border-t border-white/20 pt-4"></div>
                  </>
                )}

                {/* Mobile Auth Section */}
                {user ? (
                  <button
                    onClick={() => {
                      setShowUserAccount(true)
                      setIsMobileMenuOpen(false)
                    }}
                    className="flex items-center space-x-2 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors mx-4"
                  >
                    <User className="h-5 w-5 text-white" />
                    <span className="text-white">{user.user_metadata?.full_name || 'Account'}</span>
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setShowAuthModal(true)
                      setIsMobileMenuOpen(false)
                    }}
                    className="mx-4 px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all"
                  >
                    Sign In
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Modals */}
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
      <UserAccount isOpen={showUserAccount} onClose={() => setShowUserAccount(false)} />
    </>
  )
}