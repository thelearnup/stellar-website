import React, { useState, memo } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';

const SettingsModal = memo(({ isOpen, onClose }) => {
  const { user } = useAuth();
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [photoURL, setPhotoURL] = useState(user?.photoURL || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Update profile logic will be implemented here
      await user.updateProfile({
        displayName,
        photoURL
      });
      setSuccess('Profile updated successfully!');
    } catch (err) {
      setError('Failed to update profile. Please try again.');
      console.error('Error updating profile:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/60 backdrop-blur-md"
    >
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="relative w-full max-w-md overflow-hidden"
      >
        {error && (
          <div className="absolute top-4 left-4 right-4 z-50 bg-red-500/10 border border-red-500 rounded-lg p-4">
            <p className="text-red-500 text-sm">{error}</p>
          </div>
        )}

        {success && (
          <div className="absolute top-4 left-4 right-4 z-50 bg-green-500/10 border border-green-500 rounded-lg p-4">
            <p className="text-green-500 text-sm">{success}</p>
          </div>
        )}

        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 text-gray-400 hover:text-white transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="relative p-8 bg-[#1B1B3A] rounded-xl border border-gray-800">
          <div className="absolute inset-0 bg-gradient-to-br from-[#1B1B3A] to-[#0B1221]"></div>
          <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
          
          <div className="relative">
            <h2 className="text-2xl font-bold mb-6 text-white">Profile Settings</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Display Name</label>
                <input 
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-[#2A2A3E]/50 backdrop-blur-xl border border-gray-700 text-white focus:border-[#7a3ee3] focus:ring-2 focus:ring-[#7a3ee3] focus:ring-opacity-20 transition-all"
                  placeholder="Enter your display name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Profile Picture URL</label>
                <input 
                  type="url"
                  value={photoURL}
                  onChange={(e) => setPhotoURL(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-[#2A2A3E]/50 backdrop-blur-xl border border-gray-700 text-white focus:border-[#7a3ee3] focus:ring-2 focus:ring-[#7a3ee3] focus:ring-opacity-20 transition-all"
                  placeholder="Enter profile picture URL"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full relative group"
              >
                <div className="absolute -inset-[1px] bg-gradient-to-r from-[#7a3ee3] to-[#6432c2] rounded-lg blur opacity-70 group-hover:opacity-100 transition duration-200"></div>
                <div className="relative px-8 py-4 bg-[#1F2937] rounded-lg text-white group-hover:bg-[#1F2937]/90 transition duration-200 flex items-center justify-center">
                  {loading ? (
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    <span>Save Changes</span>
                  )}
                </div>
              </button>
            </form>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
});

export default SettingsModal; 