import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useAuth } from '../contexts/AuthContext'
import { Eye, EyeOff, Mail, Lock, User, X, Leaf } from 'lucide-react'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
}

const signInSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

const signUpSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
})

type SignInForm = z.infer<typeof signInSchema>
type SignUpForm = z.infer<typeof signUpSchema>

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [isSignUp, setIsSignUp] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { signIn, signUp } = useAuth()

  const signInForm = useForm<SignInForm>({
    resolver: zodResolver(signInSchema),
  })

  const signUpForm = useForm<SignUpForm>({
    resolver: zodResolver(signUpSchema),
  })

  const handleSignIn = async (data: SignInForm) => {
    setLoading(true)
    setError(null)
    
    const { error } = await signIn(data.email, data.password)
    
    if (error) {
      setError(error.message)
    } else {
      onClose()
      signInForm.reset()
    }
    setLoading(false)
  }

  const handleSignUp = async (data: SignUpForm) => {
    setLoading(true)
    setError(null)
    
    const { error } = await signUp(data.email, data.password, data.fullName)
    
    if (error) {
      setError(error.message)
    } else {
      setError('Check your email for verification link!')
      signUpForm.reset()
    }
    setLoading(false)
  }

  const toggleMode = () => {
    setIsSignUp(!isSignUp)
    setError(null)
    signInForm.reset()
    signUpForm.reset()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-md">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 via-emerald-500/20 to-teal-600/20 rounded-2xl blur-xl animate-pulse" />
        
        {/* Glass container */}
        <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-2xl">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-white/70 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-green-500/20 rounded-full">
                <Leaf className="h-8 w-8 text-green-400" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">
              {isSignUp ? 'Join Green Horizon' : 'Welcome Back'}
            </h2>
            <p className="text-white/70">
              {isSignUp 
                ? 'Create your account to start your eco journey' 
                : 'Sign in to continue your sustainable journey'
              }
            </p>
          </div>

          {/* Error message */}
          {error && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-200 text-sm">
              {error}
            </div>
          )}

          {/* Forms */}
          {isSignUp ? (
            <form onSubmit={signUpForm.handleSubmit(handleSignUp)} className="space-y-4">
              {/* Full Name */}
              <div>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/50" />
                  <input
                    {...signUpForm.register('fullName')}
                    type="text"
                    placeholder="Full Name"
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-green-400/50 focus:border-transparent transition-all"
                  />
                </div>
                {signUpForm.formState.errors.fullName && (
                  <p className="mt-1 text-red-300 text-sm">{signUpForm.formState.errors.fullName.message}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/50" />
                  <input
                    {...signUpForm.register('email')}
                    type="email"
                    placeholder="Email"
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-green-400/50 focus:border-transparent transition-all"
                  />
                </div>
                {signUpForm.formState.errors.email && (
                  <p className="mt-1 text-red-300 text-sm">{signUpForm.formState.errors.email.message}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/50" />
                  <input
                    {...signUpForm.register('password')}
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    className="w-full pl-10 pr-12 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-green-400/50 focus:border-transparent transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white/70 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {signUpForm.formState.errors.password && (
                  <p className="mt-1 text-red-300 text-sm">{signUpForm.formState.errors.password.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-400/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Creating Account...' : 'Sign Up'}
              </button>
            </form>
          ) : (
            <form onSubmit={signInForm.handleSubmit(handleSignIn)} className="space-y-4">
              {/* Email */}
              <div>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/50" />
                  <input
                    {...signInForm.register('email')}
                    type="email"
                    placeholder="Email"
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-green-400/50 focus:border-transparent transition-all"
                  />
                </div>
                {signInForm.formState.errors.email && (
                  <p className="mt-1 text-red-300 text-sm">{signInForm.formState.errors.email.message}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/50" />
                  <input
                    {...signInForm.register('password')}
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    className="w-full pl-10 pr-12 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-green-400/50 focus:border-transparent transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white/70 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {signInForm.formState.errors.password && (
                  <p className="mt-1 text-red-300 text-sm">{signInForm.formState.errors.password.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-400/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Signing In...' : 'Sign In'}
              </button>
            </form>
          )}

          {/* Toggle mode */}
          <div className="mt-6 text-center">
            <button
              onClick={toggleMode}
              className="text-white/70 hover:text-white transition-colors"
            >
              {isSignUp 
                ? "Already have an account? Sign in" 
                : "Don't have an account? Sign up"
              }
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}