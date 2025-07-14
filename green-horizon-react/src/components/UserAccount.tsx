import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { User, Settings, LogOut, Edit, Save, X } from 'lucide-react'

interface UserAccountProps {
  isOpen: boolean
  onClose: () => void
}

export const UserAccount: React.FC<UserAccountProps> = ({ isOpen, onClose }) => {
  const { user, signOut } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [editedName, setEditedName] = useState(user?.user_metadata?.full_name || '')

  const handleSignOut = async () => {
    await signOut()
    onClose()
  }

  const handleSave = () => {
    // Here you would typically update the user profile in Supabase
    // For now, we'll just close the editing mode
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditedName(user?.user_metadata?.full_name || '')
    setIsEditing(false)
  }

  if (!isOpen || !user) return null

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
              <div className="p-4 bg-green-500/20 rounded-full">
                <User className="h-12 w-12 text-green-400" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Account Settings</h2>
          </div>

          {/* User Info */}
          <div className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-white/70 text-sm font-medium mb-2">Full Name</label>
              {isEditing ? (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-green-400/50 focus:border-transparent transition-all"
                  />
                  <button
                    onClick={handleSave}
                    className="p-3 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors"
                  >
                    <Save className="h-5 w-5" />
                  </button>
                  <button
                    onClick={handleCancel}
                    className="p-3 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-between px-4 py-3 bg-white/10 border border-white/20 rounded-lg">
                  <span className="text-white">{user.user_metadata?.full_name || 'Not set'}</span>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="p-1 text-white/50 hover:text-white transition-colors"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-white/70 text-sm font-medium mb-2">Email</label>
              <div className="px-4 py-3 bg-white/10 border border-white/20 rounded-lg">
                <span className="text-white">{user.email}</span>
              </div>
            </div>

            {/* Member Since */}
            <div>
              <label className="block text-white/70 text-sm font-medium mb-2">Member Since</label>
              <div className="px-4 py-3 bg-white/10 border border-white/20 rounded-lg">
                <span className="text-white">
                  {new Date(user.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-8 space-y-3">
            <button className="w-full flex items-center justify-center gap-3 py-3 bg-white/10 border border-white/20 rounded-lg text-white hover:bg-white/20 transition-colors">
              <Settings className="h-5 w-5" />
              Account Settings
            </button>
            
            <button
              onClick={handleSignOut}
              className="w-full flex items-center justify-center gap-3 py-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-200 hover:bg-red-500/30 transition-colors"
            >
              <LogOut className="h-5 w-5" />
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}