import React, { useState, memo } from 'react';
import { motion } from 'framer-motion';

const AuthModal = memo(({ isOpen, onClose, initialView = 'signin' }) => {
  const [view, setView] = useState(initialView);

  if (!isOpen) return null;

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
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 text-gray-400 hover:text-white transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1B1B3A] to-[#0B1221]"></div>
        <div className="absolute inset-0 circular-grid animate-water-flow opacity-30"></div>
        <div className="absolute -inset-1 bg-gradient-to-r from-[#7a3ee3] via-[#6432c2] to-[#7a3ee3] animate-border opacity-50"></div>
        
        {/* Content */}
        <div className="relative bg-[#1B1B3A]/90 backdrop-blur-xl p-8 rounded-2xl m-[1px]">
          {view === 'signin' ? (
            <SignInView setView={setView} />
          ) : (
            <SignUpView setView={setView} />
          )}
        </div>
      </motion.div>
    </motion.div>
  );
});

const SignInView = memo(({ setView }) => (
  <motion.div 
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: 20 }}
    className="space-y-6"
  >
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">Welcome Back</h2>
      <p className="text-gray-400">Sign in to your account</p>
    </div>

    <div className="space-y-4">
      <div className="relative">
        <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
        <input 
          type="email"
          className="w-full px-4 py-3 rounded-lg bg-[#2A2A3E]/50 backdrop-blur-xl border border-gray-700 text-white focus:border-[#7a3ee3] focus:ring-2 focus:ring-[#7a3ee3] focus:ring-opacity-20 transition-all placeholder-gray-500"
          placeholder="Enter your email"
        />
      </div>
      <div className="relative">
        <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
        <input 
          type="password"
          className="w-full px-4 py-3 rounded-lg bg-[#2A2A3E]/50 backdrop-blur-xl border border-gray-700 text-white focus:border-[#7a3ee3] focus:ring-2 focus:ring-[#7a3ee3] focus:ring-opacity-20 transition-all placeholder-gray-500"
          placeholder="Enter your password"
        />
      </div>
      <div className="flex justify-end">
        <button className="text-sm text-[#7a3ee3] hover:text-[#6432c2] transition-colors">
          Forgot password?
        </button>
      </div>
    </div>

    <button className="w-full relative group">
      <div className="absolute -inset-[1px] bg-gradient-to-r from-[#7a3ee3] to-[#6432c2] rounded-lg blur opacity-70 group-hover:opacity-100 transition duration-200"></div>
      <div className="relative px-8 py-4 bg-[#1F2937] rounded-lg text-white group-hover:bg-[#1F2937]/90 transition duration-200 flex items-center justify-center">
        <span>Sign In</span>
        <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      </div>
    </button>

    <div className="text-center">
      <button 
        onClick={() => setView('signup')}
        className="text-[#7a3ee3] hover:text-[#6432c2] transition-colors inline-flex items-center group"
      >
        <span>Don't have an account?</span>
        <span className="ml-1 text-white group-hover:underline">Sign up</span>
        <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  </motion.div>
));

const SignUpView = memo(({ setView }) => (
  <motion.div 
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    className="space-y-6"
  >
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">Create Account</h2>
      <p className="text-gray-400">Join our secure platform</p>
    </div>

    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="relative">
          <label className="block text-sm font-medium text-gray-300 mb-2">First Name</label>
          <input 
            type="text"
            className="w-full px-4 py-3 rounded-lg bg-[#2A2A3E]/50 backdrop-blur-xl border border-gray-700 text-white focus:border-[#7a3ee3] focus:ring-2 focus:ring-[#7a3ee3] focus:ring-opacity-20 transition-all placeholder-gray-500"
            placeholder="First name"
          />
        </div>
        <div className="relative">
          <label className="block text-sm font-medium text-gray-300 mb-2">Last Name</label>
          <input 
            type="text"
            className="w-full px-4 py-3 rounded-lg bg-[#2A2A3E]/50 backdrop-blur-xl border border-gray-700 text-white focus:border-[#7a3ee3] focus:ring-2 focus:ring-[#7a3ee3] focus:ring-opacity-20 transition-all placeholder-gray-500"
            placeholder="Last name"
          />
        </div>
      </div>
      <div className="relative">
        <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
        <input 
          type="email"
          className="w-full px-4 py-3 rounded-lg bg-[#2A2A3E]/50 backdrop-blur-xl border border-gray-700 text-white focus:border-[#7a3ee3] focus:ring-2 focus:ring-[#7a3ee3] focus:ring-opacity-20 transition-all placeholder-gray-500"
          placeholder="Enter your email"
        />
      </div>
      <div className="relative">
        <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
        <input 
          type="password"
          className="w-full px-4 py-3 rounded-lg bg-[#2A2A3E]/50 backdrop-blur-xl border border-gray-700 text-white focus:border-[#7a3ee3] focus:ring-2 focus:ring-[#7a3ee3] focus:ring-opacity-20 transition-all placeholder-gray-500"
          placeholder="Create a password"
        />
      </div>
      <div className="relative">
        <label className="block text-sm font-medium text-gray-300 mb-2">Confirm Password</label>
        <input 
          type="password"
          className="w-full px-4 py-3 rounded-lg bg-[#2A2A3E]/50 backdrop-blur-xl border border-gray-700 text-white focus:border-[#7a3ee3] focus:ring-2 focus:ring-[#7a3ee3] focus:ring-opacity-20 transition-all placeholder-gray-500"
          placeholder="Confirm your password"
        />
      </div>
    </div>

    <button className="w-full relative group">
      <div className="absolute -inset-[1px] bg-gradient-to-r from-[#7a3ee3] to-[#6432c2] rounded-lg blur opacity-70 group-hover:opacity-100 transition duration-200"></div>
      <div className="relative px-8 py-4 bg-[#1F2937] rounded-lg text-white group-hover:bg-[#1F2937]/90 transition duration-200 flex items-center justify-center">
        <span>Create Account</span>
        <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      </div>
    </button>

    <div className="text-center">
      <button 
        onClick={() => setView('signin')}
        className="text-[#7a3ee3] hover:text-[#6432c2] transition-colors inline-flex items-center group"
      >
        <svg className="w-4 h-4 mr-1 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        <span>Already have an account?</span>
        <span className="ml-1 text-white group-hover:underline">Sign in</span>
      </button>
    </div>
  </motion.div>
));

export default AuthModal; 