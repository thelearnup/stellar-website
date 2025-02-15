import React, { useState, memo } from 'react';
import { motion } from 'framer-motion';
import { signIn, signUp, signInWithGoogle, signInWithGithub } from '../services/auth';

const AuthModal = memo(({ isOpen, onClose, initialView = 'signin' }) => {
  const [view, setView] = useState(initialView);
  const [error, setError] = useState('');

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
        {error && (
          <div className="absolute top-4 left-4 right-4 z-50 bg-red-500/10 border border-red-500 rounded-lg p-4">
            <p className="text-red-500 text-sm">{error}</p>
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

        <div className="absolute inset-0 bg-gradient-to-br from-[#1B1B3A] to-[#0B1221]"></div>
        <div className="absolute inset-0 circular-grid animate-water-flow opacity-30"></div>
        <div className="absolute -inset-1 bg-gradient-to-r from-[#7a3ee3] via-[#6432c2] to-[#7a3ee3] animate-border opacity-50"></div>
        
        <div className="relative bg-[#1B1B3A]/90 backdrop-blur-xl p-8 rounded-2xl m-[1px]">
          {view === 'signin' ? (
            <SignInView setView={setView} setError={setError} onClose={onClose} />
          ) : (
            <SignUpView setView={setView} setError={setError} onClose={onClose} />
          )}
        </div>
      </motion.div>
    </motion.div>
  );
});

const SignInView = memo(({ setView, setError, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { user, error } = await signIn(email, password);
      if (error) {
        setError(error);
        return;
      }
      if (user) {
        onClose();
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider) => {
    setLoading(true);
    setError('');

    try {
      let result;
      switch (provider) {
        case 'google':
          result = await signInWithGoogle();
          break;
        case 'github':
          result = await signInWithGithub();
          break;
        default:
          throw new Error('Invalid provider');
      }

      if (result.error) {
        setError(result.error);
        return;
      }
      if (result.user) {
        onClose();
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
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
        {/* Social Login Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => handleSocialLogin('google')}
            disabled={loading}
            className="flex items-center justify-center px-4 py-3 space-x-2 bg-[#2A2A3E]/50 hover:bg-[#2A2A3E] backdrop-blur-xl border border-gray-700 rounded-lg transition-all"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
          </button>

          <button
            onClick={() => handleSocialLogin('github')}
            disabled={loading}
            className="flex items-center justify-center px-4 py-3 space-x-2 bg-[#2A2A3E]/50 hover:bg-[#2A2A3E] backdrop-blur-xl border border-gray-700 rounded-lg transition-all"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z"/>
            </svg>
          </button>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-700"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-[#1B1B3A] text-gray-400">Or continue with</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
            <input 
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg bg-[#2A2A3E]/50 backdrop-blur-xl border border-gray-700 text-white focus:border-[#7a3ee3] focus:ring-2 focus:ring-[#7a3ee3] focus:ring-opacity-20 transition-all placeholder-gray-500"
              placeholder="Enter your email"
            />
          </div>
          <div className="relative">
            <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
            <input 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg bg-[#2A2A3E]/50 backdrop-blur-xl border border-gray-700 text-white focus:border-[#7a3ee3] focus:ring-2 focus:ring-[#7a3ee3] focus:ring-opacity-20 transition-all placeholder-gray-500"
              placeholder="Enter your password"
            />
          </div>
          <div className="flex justify-end">
            <button 
              type="button"
              className="text-sm text-[#7a3ee3] hover:text-[#6432c2] transition-colors"
            >
              Forgot password?
            </button>
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
                <>
                  <span>Sign In</span>
                  <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </>
              )}
            </div>
          </button>
        </form>
      </div>

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
  );
});

const SignUpView = memo(({ setView, setError, onClose }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { firstName, lastName, email, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const { user, error } = await signUp(email, password);
      if (error) {
        setError(error);
        return;
      }
      if (user) {
        // Here you could add additional user data to a database
        onClose();
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
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

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="relative">
            <label className="block text-sm font-medium text-gray-300 mb-2">First Name</label>
            <input 
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-[#2A2A3E]/50 backdrop-blur-xl border border-gray-700 text-white focus:border-[#7a3ee3] focus:ring-2 focus:ring-[#7a3ee3] focus:ring-opacity-20 transition-all placeholder-gray-500"
              placeholder="First name"
            />
          </div>
          <div className="relative">
            <label className="block text-sm font-medium text-gray-300 mb-2">Last Name</label>
            <input 
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-[#2A2A3E]/50 backdrop-blur-xl border border-gray-700 text-white focus:border-[#7a3ee3] focus:ring-2 focus:ring-[#7a3ee3] focus:ring-opacity-20 transition-all placeholder-gray-500"
              placeholder="Last name"
            />
          </div>
        </div>
        <div className="relative">
          <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
          <input 
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg bg-[#2A2A3E]/50 backdrop-blur-xl border border-gray-700 text-white focus:border-[#7a3ee3] focus:ring-2 focus:ring-[#7a3ee3] focus:ring-opacity-20 transition-all placeholder-gray-500"
            placeholder="Enter your email"
          />
        </div>
        <div className="relative">
          <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
          <input 
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg bg-[#2A2A3E]/50 backdrop-blur-xl border border-gray-700 text-white focus:border-[#7a3ee3] focus:ring-2 focus:ring-[#7a3ee3] focus:ring-opacity-20 transition-all placeholder-gray-500"
            placeholder="Create a password"
          />
        </div>
        <div className="relative">
          <label className="block text-sm font-medium text-gray-300 mb-2">Confirm Password</label>
          <input 
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg bg-[#2A2A3E]/50 backdrop-blur-xl border border-gray-700 text-white focus:border-[#7a3ee3] focus:ring-2 focus:ring-[#7a3ee3] focus:ring-opacity-20 transition-all placeholder-gray-500"
            placeholder="Confirm your password"
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
              <>
                <span>Create Account</span>
                <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </>
            )}
          </div>
        </button>
      </form>

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
  );
});

export default AuthModal; 