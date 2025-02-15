import React, { useState, useEffect, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckIcon, LockClosedIcon, ChartBarIcon, ShieldCheckIcon, Bars3Icon, XMarkIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { useAuth } from './contexts/AuthContext';
import { logOut } from './services/auth';

// Lazy load the AuthModal component
const AuthModal = lazy(() => import('./components/AuthModal'));

// Lazy load the SettingsModal component
const SettingsModal = lazy(() => import('./components/SettingsModal'));

// Optimize company logos array
const companyLogos = [
  { name: 'Quora', src: '/logos/quora.svg' },
  { name: 'Airbnb', src: '/logos/airbnb.svg' },
  { name: 'Amazon', src: '/logos/amazon.svg' },
  { name: 'Facebook', src: '/logos/facebook.svg' },
  { name: 'Google', src: '/logos/google.svg' },
  { name: 'Meta', src: '/logos/meta.svg' },
  { name: 'Upwork', src: '/logos/upwork.svg' },
  { name: 'Microsoft', src: '/logos/microsoft.svg' },
  { name: 'Tinder', src: '/logos/tinder.svg' }
];

function App() {
  const { user } = useAuth();
  const [isYearly, setIsYearly] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [authView, setAuthView] = useState('signin');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isScrolling, setIsScrolling] = useState(false);

  // Optimize mouse movement tracking
  useEffect(() => {
    let timeoutId;
    const handleMouseMove = (e) => {
      if (!isScrolling) {
        window.requestAnimationFrame(() => {
          setMousePosition({
            x: e.clientX,
            y: e.clientY
          });
        });
      }
    };

    // Optimize scroll events with shorter timeout
    const handleScroll = () => {
      if (!isScrolling) {
        setIsScrolling(true);
        window.removeEventListener('mousemove', handleMouseMove);
      }
      
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsScrolling(false);
        window.addEventListener('mousemove', handleMouseMove);
      }, 50); // Reduced from 150ms to 50ms for faster response
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  }, [isScrolling]);

  // Optimize animation variants
  const cursorVariants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      transition: {
        type: "spring",
        mass: 0.2,
        stiffness: 800,
        damping: 20
      }
    }
  };

  const handleLogout = async () => {
    try {
      await logOut();
      setShowProfileMenu(false);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleSettingsClick = () => {
    setShowSettingsModal(true);
    setShowProfileMenu(false); // Close the profile menu when opening settings
  };

  return (
    <div className="min-h-screen bg-[#0A0F1C] text-white relative overflow-hidden">
      <motion.div
        className="fixed top-0 left-0 w-6 h-6 rounded-full pointer-events-none z-50"
        variants={cursorVariants}
        animate="default"
        style={{
          background: "radial-gradient(circle, rgba(122,62,227,0.15) 0%, rgba(122,62,227,0) 70%)"
        }}
      />
      
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0F1C] via-[#111827] to-[#0A0F1C]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,62,176,0.07),transparent_70%)]"></div>
        <div className="absolute inset-0 opacity-20 mix-blend-overlay bg-[linear-gradient(60deg,#6D28D9_0%,transparent_50%)]"></div>
        
        {/* Animated Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#4F46E5] rounded-full mix-blend-multiply filter blur-[128px] opacity-30 animate-float-slow"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-[#8B5CF6] rounded-full mix-blend-multiply filter blur-[128px] opacity-30 animate-float-delay"></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-[#6D28D9] rounded-full mix-blend-multiply filter blur-[128px] opacity-30 animate-float"></div>
        
        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-20 animate-grid-flow"></div>
        
        {/* Animated Particles */}
        <div className="absolute inset-0">
          {Array.from({ length: 20 }).map((_, index) => (
            <div
              key={index}
              className="absolute w-2 h-2 bg-[#8B5CF6] rounded-full opacity-30"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `float-particle ${10 + Math.random() * 20}s linear infinite`,
                animationDelay: `${Math.random() * 5}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-[#0A0F1C]/80 border-b border-gray-800/30">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center py-4 md:py-6">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#7a3ee3] to-[#6432c2] p-[1px]">
                <div className="w-full h-full rounded-full bg-[#1B1B3A] flex items-center justify-center">
                  <span className="text-xl font-semibold text-white">S</span>
                </div>
              </div>
              <span className="text-xl font-semibold text-white">StellarAPI</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-gray-300 hover:text-white transition-colors uppercase">Home</a>
              <a href="#about" className="text-gray-300 hover:text-white transition-colors uppercase">About</a>
              <a href="#integrations" className="text-gray-300 hover:text-white transition-colors uppercase">Integrations</a>
              <a href="#pricing" className="text-gray-300 hover:text-white transition-colors uppercase">Pricing</a>
              <a href="#developers" className="text-gray-300 hover:text-white transition-colors uppercase">Developers</a>
              <a href="#company" className="text-gray-300 hover:text-white transition-colors uppercase">Company</a>
              
              {user ? (
                <div className="relative">
                  <button 
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className="relative group flex items-center space-x-2"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#7a3ee3] to-[#6432c2] p-[1px] group-hover:p-[2px] transition-all">
                      <div className="w-full h-full rounded-full bg-[#1B1B3A] flex items-center justify-center">
                        {user.photoURL ? (
                          <img src={user.photoURL} alt="Profile" className="w-full h-full rounded-full" />
                        ) : (
                          <UserCircleIcon className="w-5 h-5 text-white" />
                        )}
                      </div>
                    </div>
                  </button>

                  {showProfileMenu && (
                    <div className="absolute right-0 mt-2 w-48 rounded-lg bg-[#1B1B3A] border border-gray-800 shadow-lg py-1">
                      <div className="px-4 py-2 border-b border-gray-800">
                        <p className="text-sm text-white font-medium truncate">{user.email}</p>
                      </div>
                      <button
                        onClick={handleSettingsClick}
                        className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-[#2A2A3E] transition-colors flex items-center"
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Settings
                      </button>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-[#2A2A3E] transition-colors flex items-center"
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Sign out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button 
                  onClick={() => {
                    setAuthView('signin');
                    setShowAuthModal(true);
                  }}
                  className="relative group"
                >
                  <div className="absolute -inset-[1px] bg-gradient-to-r from-[#7a3ee3] to-[#6432c2] rounded-lg blur opacity-70 group-hover:opacity-100 transition duration-300"></div>
                  <div className="relative px-4 py-2 bg-[#1F2937] rounded-lg text-white group-hover:bg-[#1F2937]/90 transition duration-300">
                    Sign in
                  </div>
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-300 hover:text-white transition-colors"
              >
                {isMobileMenuOpen ? (
                  <XMarkIcon className="h-6 w-6" />
                ) : (
                  <Bars3Icon className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden py-4 border-t border-gray-800/30"
            >
              <div className="flex flex-col space-y-4 px-4">
                <a href="#" className="text-gray-300 hover:text-white transition-colors uppercase">Home</a>
                <a href="#about" className="text-gray-300 hover:text-white transition-colors uppercase">About</a>
                <a href="#integrations" className="text-gray-300 hover:text-white transition-colors uppercase">Integrations</a>
                <a href="#pricing" className="text-gray-300 hover:text-white transition-colors uppercase">Pricing</a>
                <a href="#developers" className="text-gray-300 hover:text-white transition-colors uppercase">Developers</a>
                <a href="#company" className="text-gray-300 hover:text-white transition-colors uppercase">Company</a>
                
                {user ? (
                  <div className="border-t border-gray-800 pt-4">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#7a3ee3] to-[#6432c2] p-[1px]">
                        <div className="w-full h-full rounded-full bg-[#1B1B3A] flex items-center justify-center">
                          {user.photoURL ? (
                            <img src={user.photoURL} alt="Profile" className="w-full h-full rounded-full" />
                          ) : (
                            <UserCircleIcon className="w-5 h-5 text-white" />
                          )}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-white font-medium truncate">{user.email}</p>
                      </div>
                    </div>
                    <button
                      onClick={handleSettingsClick}
                      className="w-full text-left text-gray-300 hover:text-white transition-colors flex items-center py-2"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Settings
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left text-gray-300 hover:text-white transition-colors flex items-center py-2"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Sign out
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={() => {
                      setAuthView('signin');
                      setShowAuthModal(true);
                      setIsMobileMenuOpen(false);
                    }}
                    className="relative group w-full"
                  >
                    <div className="absolute -inset-[1px] bg-gradient-to-r from-[#7a3ee3] to-[#6432c2] rounded-lg blur opacity-70 group-hover:opacity-100 transition duration-300"></div>
                    <div className="relative px-4 py-2 bg-[#1F2937] rounded-lg text-white group-hover:bg-[#1F2937]/90 transition duration-300 text-center">
                      Sign in
                    </div>
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative pt-24">
        {/* Hero Section */}
        <section className="relative min-h-[calc(100vh-6rem)] flex items-center justify-center px-4 sm:px-6">
          <div className="absolute inset-0">
            <div className="absolute -top-40 left-0 w-96 h-96 rounded-full bg-[#4F46E5] opacity-[0.15] blur-[80px]"></div>
            <div className="absolute -top-40 right-0 w-96 h-96 rounded-full bg-[#8B5CF6] opacity-[0.15] blur-[80px]"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.15),transparent_50%)]"></div>
          </div>
          
          <div className="relative z-10 max-w-5xl mx-auto text-center">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[#7a3ee3] font-medium tracking-wide uppercase mb-8 block"
            >
              Next Generation Security
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl sm:text-6xl md:text-8xl font-bold mb-8 text-white leading-tight tracking-tight hero-text-shadow"
            >
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="block"
              >
                Secure Your Digital
              </motion.span>
              <motion.div 
                className="bg-clip-text text-transparent bg-gradient-to-r from-[#7a3ee3] to-[#6432c2] inline-block relative typing-text"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
              >
                Future Today
                <span className="typing-cursor absolute right-0 top-0 h-full"></span>
              </motion.div>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-base text-gray-400 mb-12 sm:mb-20 max-w-3xl mx-auto leading-relaxed px-4 sm:px-0"
            >
              Experience enterprise-grade security that scales with your business. Our cutting-edge API framework 
              ensures your data stays protected while maintaining seamless integration capabilities.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center justify-center space-x-3 mt-8 sm:mt-12 px-2 sm:px-0"
            >
              <button 
                onClick={() => {
                  setAuthView('signup');
                  setShowAuthModal(true);
                }}
                className="relative group w-[45%] sm:w-auto"
              >
                <div className="absolute -inset-[1px] bg-gradient-to-r from-[#7a3ee3] to-[#6432c2] rounded-lg blur opacity-70 group-hover:opacity-100 transition duration-300"></div>
                <div className="relative px-3 sm:px-8 py-2 sm:py-4 bg-[#1F2937] rounded-lg text-white group-hover:bg-[#1F2937]/90 transition duration-300 flex items-center justify-center text-sm sm:text-base">
                  <span>Start Building Now</span>
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </button>
              <button className="relative group w-[45%] sm:w-auto">
                <div className="absolute -inset-[1px] bg-gradient-to-r from-[#4F46E5] to-[#3730A3] rounded-lg blur opacity-70 group-hover:opacity-100 transition duration-300"></div>
                <div className="relative px-3 sm:px-8 py-2 sm:py-4 bg-[#1B1B3A] rounded-lg text-white group-hover:bg-[#1B1B3A]/90 transition duration-300 flex items-center justify-center text-sm sm:text-base">
                  <span>View Documentation</span>
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="relative py-20 sm:py-40 text-center">
          <div className="container mx-auto px-4 sm:px-6 relative">
            <h2 className="text-4xl sm:text-5xl font-bold mb-8 text-white">About Us</h2>
            <p className="text-base sm:text-lg text-gray-400 mb-12 max-w-3xl mx-auto">
              We are pioneering the future of API security. Our platform combines advanced encryption, 
              real-time threat detection, and seamless integration capabilities to protect your digital assets.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              <div className="p-8 bg-[#1B1B3A]/90 rounded-xl backdrop-blur-xl border border-[#7a3ee3]/50 hover:bg-[#1B1B3A]/80 transition-all duration-300 relative overflow-hidden group transform hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(122,62,227,0.3)] shadow-[0_0_20px_rgba(122,62,227,0.2)]">
                <div className="absolute inset-0 bg-gradient-to-br from-[#7a3ee3]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(122,62,227,0.15),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <ShieldCheckIcon className="w-16 h-16 text-[#7a3ee3] mb-6 mx-auto relative z-10 transform group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-2xl font-semibold mb-4 relative z-10 text-white group-hover:text-[#7a3ee3] transition-colors duration-300">Advanced Security</h3>
                <p className="text-gray-400 relative z-10 group-hover:text-gray-300 transition-colors duration-300">Enterprise-grade protection with state-of-the-art encryption and security protocols.</p>
              </div>
              <div className="p-8 bg-[#1B1B3A]/90 rounded-xl backdrop-blur-xl border border-[#7a3ee3]/50 hover:bg-[#1B1B3A]/80 transition-all duration-300 relative overflow-hidden group transform hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(122,62,227,0.3)] shadow-[0_0_20px_rgba(122,62,227,0.2)]">
                <div className="absolute inset-0 bg-gradient-to-br from-[#7a3ee3]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(122,62,227,0.15),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <ChartBarIcon className="w-16 h-16 text-[#7a3ee3] mb-6 mx-auto relative z-10 transform group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-2xl font-semibold mb-4 relative z-10 text-white group-hover:text-[#7a3ee3] transition-colors duration-300">Real-time Analytics</h3>
                <p className="text-gray-400 relative z-10 group-hover:text-gray-300 transition-colors duration-300">Comprehensive monitoring and analytics to track API performance and security metrics.</p>
              </div>
              <div className="p-8 bg-[#1B1B3A]/90 rounded-xl backdrop-blur-xl border border-[#7a3ee3]/50 hover:bg-[#1B1B3A]/80 transition-all duration-300 relative overflow-hidden group transform hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(122,62,227,0.3)] shadow-[0_0_20px_rgba(122,62,227,0.2)]">
                <div className="absolute inset-0 bg-gradient-to-br from-[#7a3ee3]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(122,62,227,0.15),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <LockClosedIcon className="w-16 h-16 text-[#7a3ee3] mb-6 mx-auto relative z-10 transform group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-2xl font-semibold mb-4 relative z-10 text-white group-hover:text-[#7a3ee3] transition-colors duration-300">Access Control</h3>
                <p className="text-gray-400 relative z-10 group-hover:text-gray-300 transition-colors duration-300">Granular access control and authentication mechanisms for enhanced security.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Integrations Section */}
        <section id="integrations" className="relative py-20 sm:py-40 overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6 relative">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold mb-8 text-white">Trusted by Industry Leaders</h2>
              <p className="text-base sm:text-lg text-gray-400 mb-12 max-w-3xl mx-auto">
                Seamlessly integrate with your existing tools and platforms. Our API security solution 
                works with leading technology providers and services.
              </p>
            </div>
            <div className="relative overflow-hidden">
              <motion.div 
                className="flex gap-8 mb-8"
                animate={{
                  x: [0, -1100]
                }}
                transition={{
                  duration: 25,
                  repeat: Infinity,
                  ease: "linear",
                  repeatType: "loop"
                }}
              >
                {[...companyLogos, ...companyLogos, ...companyLogos].map((logo, index) => (
                  <motion.div
                    key={`${logo.name}-${index}`}
                    whileHover={{ scale: 1.05 }}
                    className="flex-shrink-0 w-[200px] p-8 bg-[#1B1B3A]/90 rounded-xl backdrop-blur-xl border border-[#7a3ee3]/50 hover:bg-[#1B1B3A]/80 transition-all duration-300 relative overflow-hidden group transform hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(122,62,227,0.3)] shadow-[0_0_20px_rgba(122,62,227,0.2)]"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#7a3ee3]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(122,62,227,0.15),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <img 
                      src={logo.src} 
                      alt={logo.name} 
                      className={`${
                        logo.name === 'Facebook' || logo.name === 'Tinder' 
                          ? 'h-16 w-[140px]' 
                          : 'h-12 w-[120px]'
                      } object-contain mx-auto relative z-10 transform group-hover:scale-110 transition-transform duration-300`}
                    />
                  </motion.div>
                ))}
              </motion.div>

              {/* Second row moving in opposite direction */}
              <motion.div 
                className="flex gap-8"
                animate={{
                  x: [-1100, 0]
                }}
                transition={{
                  duration: 25,
                  repeat: Infinity,
                  ease: "linear",
                  repeatType: "loop"
                }}
              >
                {[...companyLogos, ...companyLogos, ...companyLogos].map((logo, index) => (
                  <motion.div
                    key={`second-row-${logo.name}-${index}`}
                    whileHover={{ scale: 1.05 }}
                    className="flex-shrink-0 w-[200px] p-8 bg-[#1B1B3A]/90 rounded-xl backdrop-blur-xl border border-[#7a3ee3]/50 hover:bg-[#1B1B3A]/80 transition-all duration-300 relative overflow-hidden group transform hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(122,62,227,0.3)] shadow-[0_0_20px_rgba(122,62,227,0.2)]"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#7a3ee3]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(122,62,227,0.15),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <img 
                      src={logo.src} 
                      alt={logo.name} 
                      className={`${
                        logo.name === 'Facebook' || logo.name === 'Tinder' 
                          ? 'h-16 w-[140px]' 
                          : 'h-12 w-[120px]'
                      } object-contain mx-auto relative z-10 transform group-hover:scale-110 transition-transform duration-300`}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="relative py-20 sm:py-40">
          <div className="container mx-auto px-4 sm:px-6 relative">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold mb-8 text-white">Simple, Transparent Pricing</h2>
              <p className="text-base sm:text-lg text-gray-400 mb-12 max-w-3xl mx-auto">
                Choose the plan that best fits your needs. All plans include our core security features.
              </p>
              <div className="flex items-center justify-center space-x-4 mb-12">
                <span className="text-gray-400">Monthly</span>
                <button 
                  onClick={() => setIsYearly(!isYearly)}
                  className="relative w-14 h-8 bg-[#1B1B3A] rounded-full p-1 transition-colors"
                >
                  <div className={`absolute w-6 h-6 bg-[#7a3ee3] rounded-full transition-transform ${isYearly ? 'translate-x-6' : 'translate-x-0'}`} />
                </button>
                <span className="text-gray-400">Yearly <span className="text-[#7a3ee3]">(Save 20%)</span></span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Starter Plan */}
              <div className="p-8 bg-[#1B1B3A]/90 rounded-xl backdrop-blur-xl border border-[#7a3ee3]/50 hover:bg-[#1B1B3A]/80 transition-all duration-300 relative overflow-hidden group transform hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(122,62,227,0.3)] shadow-[0_0_20px_rgba(122,62,227,0.2)]">
                <div className="absolute inset-0 bg-gradient-to-br from-[#7a3ee3]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(122,62,227,0.15),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <h3 className="text-2xl font-bold mb-4 relative z-10 text-white group-hover:text-[#7a3ee3] transition-colors duration-300">Starter</h3>
                <div className="mb-6 relative z-10">
                  <span className="text-4xl font-bold text-white group-hover:text-[#7a3ee3] transition-colors duration-300">${isYearly ? '39' : '49'}</span>
                  <span className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">/month</span>
                </div>
                <ul className="space-y-4 mb-8 relative z-10">
                  <li className="flex items-center text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                    <CheckIcon className="w-5 h-5 text-[#7a3ee3] mr-2" />
                    <span>Up to 10,000 API calls/month</span>
                  </li>
                  <li className="flex items-center text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                    <CheckIcon className="w-5 h-5 text-[#7a3ee3] mr-2" />
                    <span>Basic security features</span>
                  </li>
                  <li className="flex items-center text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                    <CheckIcon className="w-5 h-5 text-[#7a3ee3] mr-2" />
                    <span>Email support</span>
                  </li>
                </ul>
                <button className="w-full relative group">
                  <div className="absolute -inset-[1px] bg-gradient-to-r from-[#7a3ee3] to-[#6432c2] rounded-lg blur opacity-70 group-hover:opacity-100 transition duration-300"></div>
                  <div className="relative px-8 py-4 bg-[#1F2937] rounded-lg text-white group-hover:bg-[#1F2937]/90 transition duration-300">
                    Get Started
                  </div>
                </button>
              </div>

              {/* Professional Plan */}
              <div className="p-8 bg-[#1B1B3A]/90 rounded-xl backdrop-blur-xl border border-[#7a3ee3]/50 hover:bg-[#1B1B3A]/80 transition-all duration-300 relative overflow-hidden group transform hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(122,62,227,0.3)] shadow-[0_0_20px_rgba(122,62,227,0.2)]">
                <div className="absolute inset-0 bg-gradient-to-br from-[#7a3ee3]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(122,62,227,0.15),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="px-4 py-2 bg-[#7a3ee3] rounded-full text-sm font-medium">Most Popular</span>
                </div>
                <h3 className="text-2xl font-bold mb-4 relative z-10 text-white group-hover:text-[#7a3ee3] transition-colors duration-300">Professional</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold">${isYearly ? '79' : '99'}</span>
                  <span className="text-gray-400">/month</span>
                </div>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center text-gray-400">
                    <CheckIcon className="w-5 h-5 text-[#7a3ee3] mr-2" />
                    <span>Up to 50,000 API calls/month</span>
                  </li>
                  <li className="flex items-center text-gray-400">
                    <CheckIcon className="w-5 h-5 text-[#7a3ee3] mr-2" />
                    <span>Advanced security features</span>
                  </li>
                  <li className="flex items-center text-gray-400">
                    <CheckIcon className="w-5 h-5 text-[#7a3ee3] mr-2" />
                    <span>Priority email & chat support</span>
                  </li>
                  <li className="flex items-center text-gray-400">
                    <CheckIcon className="w-5 h-5 text-[#7a3ee3] mr-2" />
                    <span>Advanced analytics</span>
                  </li>
                </ul>
                <button className="w-full relative group">
                  <div className="absolute -inset-[1px] bg-gradient-to-r from-[#7a3ee3] to-[#6432c2] rounded-lg blur opacity-70 group-hover:opacity-100 transition duration-300"></div>
                  <div className="relative px-8 py-4 bg-[#1F2937] rounded-lg text-white group-hover:bg-[#1F2937]/90 transition duration-300">
                    Get Started
                  </div>
                </button>
              </div>

              {/* Enterprise Plan */}
              <div className="p-8 bg-[#1B1B3A]/90 rounded-xl backdrop-blur-xl border border-[#7a3ee3]/50 hover:bg-[#1B1B3A]/80 transition-all duration-300 relative overflow-hidden group transform hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(122,62,227,0.3)] shadow-[0_0_20px_rgba(122,62,227,0.2)]">
                <div className="absolute inset-0 bg-gradient-to-br from-[#7a3ee3]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(122,62,227,0.15),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <h3 className="text-2xl font-bold mb-4 relative z-10 text-white group-hover:text-[#7a3ee3] transition-colors duration-300">Enterprise</h3>
                <div className="mb-6 relative z-10">
                  <span className="text-4xl font-bold text-white group-hover:text-[#7a3ee3] transition-colors duration-300">Custom</span>
                  <span className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">/month</span>
                </div>
                <ul className="space-y-4 mb-8 relative z-10">
                  <li className="flex items-center text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                    <CheckIcon className="w-5 h-5 text-[#7a3ee3] mr-2" />
                    <span>Unlimited API calls</span>
                  </li>
                  <li className="flex items-center text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                    <CheckIcon className="w-5 h-5 text-[#7a3ee3] mr-2" />
                    <span>Custom security features</span>
                  </li>
                  <li className="flex items-center text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                    <CheckIcon className="w-5 h-5 text-[#7a3ee3] mr-2" />
                    <span>24/7 phone & chat support</span>
                  </li>
                  <li className="flex items-center text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                    <CheckIcon className="w-5 h-5 text-[#7a3ee3] mr-2" />
                    <span>Custom integration support</span>
                  </li>
                </ul>
                <button className="w-full relative group">
                  <div className="absolute -inset-[1px] bg-gradient-to-r from-[#7a3ee3] to-[#6432c2] rounded-lg blur opacity-70 group-hover:opacity-100 transition duration-300"></div>
                  <div className="relative px-8 py-4 bg-[#1F2937] rounded-lg text-white group-hover:bg-[#1F2937]/90 transition duration-300 flex items-center justify-center">
                    <span>Contact Sales</span>
                    <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Developers Section */}
        <section id="developers" className="relative py-20 sm:py-40">
          <div className="container mx-auto px-4 sm:px-6 relative">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold mb-8 text-white">Built for Developers</h2>
              <p className="text-base sm:text-lg text-gray-400 mb-12 max-w-3xl mx-auto">
                Powerful tools and resources to help you integrate and secure your APIs with ease.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8 bg-[#1B1B3A]/90 rounded-xl backdrop-blur-xl border border-[#7a3ee3]/50 hover:bg-[#1B1B3A]/80 transition-all duration-300 relative overflow-hidden group transform hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(122,62,227,0.3)] shadow-[0_0_20px_rgba(122,62,227,0.2)]">
                <div className="absolute inset-0 bg-gradient-to-br from-[#7a3ee3]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(122,62,227,0.15),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <h3 className="text-xl font-semibold mb-4 relative z-10 text-white group-hover:text-[#7a3ee3] transition-colors duration-300">Comprehensive Documentation</h3>
                <p className="text-gray-400 mb-6 relative z-10 group-hover:text-gray-300 transition-colors duration-300">Detailed guides, API references, and examples to get you started quickly.</p>
                <pre className="bg-[#0A0F1C] p-4 rounded-lg text-sm text-gray-300 overflow-x-auto relative z-10 group-hover:bg-[#0A0F1C]/80 transition-colors duration-300">
                  <code>{`// Initialize the security client
const security = new SecurityAPI({
  apiKey: 'your-api-key',
  environment: 'production'
});

// Secure your endpoint
security.protect('/api/data', {
  authentication: true,
  rateLimit: true
});`}</code>
                </pre>
              </div>
              <div className="p-8 bg-[#1B1B3A]/90 rounded-xl backdrop-blur-xl border border-[#7a3ee3]/50 hover:bg-[#1B1B3A]/80 transition-all duration-300 relative overflow-hidden group transform hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(122,62,227,0.3)] shadow-[0_0_20px_rgba(122,62,227,0.2)]">
                <div className="absolute inset-0 bg-gradient-to-br from-[#7a3ee3]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(122,62,227,0.15),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <h3 className="text-xl font-semibold mb-4 relative z-10 text-white group-hover:text-[#7a3ee3] transition-colors duration-300">SDK Support</h3>
                <p className="text-gray-400 mb-6 relative z-10 group-hover:text-gray-300 transition-colors duration-300">Native SDKs for popular programming languages and frameworks.</p>
                <div className="grid grid-cols-3 gap-4 relative z-10">
                  <div className="p-4 bg-[#0A0F1C] rounded-lg text-center group-hover:bg-[#0A0F1C]/80 transition-colors duration-300">
                    <span className="text-[#7a3ee3] group-hover:text-[#7a3ee3] transition-colors duration-300">Node.js</span>
                  </div>
                  <div className="p-4 bg-[#0A0F1C] rounded-lg text-center group-hover:bg-[#0A0F1C]/80 transition-colors duration-300">
                    <span className="text-[#7a3ee3] group-hover:text-[#7a3ee3] transition-colors duration-300">Python</span>
                  </div>
                  <div className="p-4 bg-[#0A0F1C] rounded-lg text-center group-hover:bg-[#0A0F1C]/80 transition-colors duration-300">
                    <span className="text-[#7a3ee3] group-hover:text-[#7a3ee3] transition-colors duration-300">Java</span>
                  </div>
                  <div className="p-4 bg-[#0A0F1C] rounded-lg text-center group-hover:bg-[#0A0F1C]/80 transition-colors duration-300">
                    <span className="text-[#7a3ee3] group-hover:text-[#7a3ee3] transition-colors duration-300">Go</span>
                  </div>
                  <div className="p-4 bg-[#0A0F1C] rounded-lg text-center group-hover:bg-[#0A0F1C]/80 transition-colors duration-300">
                    <span className="text-[#7a3ee3] group-hover:text-[#7a3ee3] transition-colors duration-300">Ruby</span>
                  </div>
                  <div className="p-4 bg-[#0A0F1C] rounded-lg text-center group-hover:bg-[#0A0F1C]/80 transition-colors duration-300">
                    <span className="text-[#7a3ee3] group-hover:text-[#7a3ee3] transition-colors duration-300">PHP</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Company Section */}
        <section id="company" className="relative py-20 sm:py-40">
          <div className="container mx-auto px-4 sm:px-6 relative">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold mb-8 text-white">Our Company</h2>
              <p className="text-base sm:text-lg text-gray-400 mb-12 max-w-3xl mx-auto">
                We're on a mission to make API security accessible and manageable for businesses of all sizes.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-8 bg-[#1B1B3A]/90 rounded-xl backdrop-blur-xl border border-[#7a3ee3]/50 hover:bg-[#1B1B3A]/80 transition-all duration-300 relative overflow-hidden group transform hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(122,62,227,0.3)] shadow-[0_0_20px_rgba(122,62,227,0.2)]">
                <div className="absolute inset-0 bg-gradient-to-br from-[#7a3ee3]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(122,62,227,0.15),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <h3 className="text-xl font-semibold mb-4 relative z-10 text-white group-hover:text-[#7a3ee3] transition-colors duration-300">Our Mission</h3>
                <p className="text-gray-400 relative z-10 group-hover:text-gray-300 transition-colors duration-300">To provide enterprise-grade API security solutions that evolve with emerging threats.</p>
              </div>
              <div className="p-8 bg-[#1B1B3A]/90 rounded-xl backdrop-blur-xl border border-[#7a3ee3]/50 hover:bg-[#1B1B3A]/80 transition-all duration-300 relative overflow-hidden group transform hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(122,62,227,0.3)] shadow-[0_0_20px_rgba(122,62,227,0.2)]">
                <div className="absolute inset-0 bg-gradient-to-br from-[#7a3ee3]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(122,62,227,0.15),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <h3 className="text-xl font-semibold mb-4 relative z-10 text-white group-hover:text-[#7a3ee3] transition-colors duration-300">Our Team</h3>
                <p className="text-gray-400 relative z-10 group-hover:text-gray-300 transition-colors duration-300">Expert security engineers and developers dedicated to protecting your digital assets.</p>
              </div>
              <div className="p-8 bg-[#1B1B3A]/90 rounded-xl backdrop-blur-xl border border-[#7a3ee3]/50 hover:bg-[#1B1B3A]/80 transition-all duration-300 relative overflow-hidden group transform hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(122,62,227,0.3)] shadow-[0_0_20px_rgba(122,62,227,0.2)]">
                <div className="absolute inset-0 bg-gradient-to-br from-[#7a3ee3]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(122,62,227,0.15),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <h3 className="text-xl font-semibold mb-4 relative z-10 text-white group-hover:text-[#7a3ee3] transition-colors duration-300">Our Values</h3>
                <p className="text-gray-400 relative z-10 group-hover:text-gray-300 transition-colors duration-300">Innovation, transparency, and customer success drive everything we do.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative bg-[#0A0F1C] border-t border-gray-800/30">
        <div className="container mx-auto px-4 sm:px-6 py-12">
          {/* Footer Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 mb-12">
            {/* Company Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#7a3ee3] to-[#6432c2] p-[1px]">
                  <div className="w-full h-full rounded-full bg-[#1B1B3A] flex items-center justify-center">
                    <span className="text-xl font-semibold text-white">S</span>
                  </div>
                </div>
                <span className="text-xl font-semibold text-white">StellarAPI</span>
              </div>
              <p className="text-gray-400 text-sm">
                Empowering businesses with enterprise-grade API security solutions.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-[#7a3ee3] transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-[#7a3ee3] transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-[#7a3ee3] transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.11.793-.26.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.756-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.237 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-[#7a3ee3] transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Product Links */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Product</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-[#7a3ee3] transition-colors">Features</a></li>
                <li><a href="#" className="text-gray-400 hover:text-[#7a3ee3] transition-colors">Security</a></li>
                <li><a href="#" className="text-gray-400 hover:text-[#7a3ee3] transition-colors">Team</a></li>
                <li><a href="#" className="text-gray-400 hover:text-[#7a3ee3] transition-colors">Enterprise</a></li>
                <li><a href="#" className="text-gray-400 hover:text-[#7a3ee3] transition-colors">Customer Stories</a></li>
                <li><a href="#" className="text-gray-400 hover:text-[#7a3ee3] transition-colors">Pricing</a></li>
                <li><a href="#" className="text-gray-400 hover:text-[#7a3ee3] transition-colors">Resources</a></li>
              </ul>
            </div>

            {/* Platform Links */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Platform</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-[#7a3ee3] transition-colors">Developer API</a></li>
                <li><a href="#" className="text-gray-400 hover:text-[#7a3ee3] transition-colors">Partners</a></li>
                <li><a href="#" className="text-gray-400 hover:text-[#7a3ee3] transition-colors">Atom</a></li>
                <li><a href="#" className="text-gray-400 hover:text-[#7a3ee3] transition-colors">Electron</a></li>
                <li><a href="#" className="text-gray-400 hover:text-[#7a3ee3] transition-colors">SecurityAPI Desktop</a></li>
              </ul>
            </div>

            {/* Support Links */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Support</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-[#7a3ee3] transition-colors">Help</a></li>
                <li><a href="#" className="text-gray-400 hover:text-[#7a3ee3] transition-colors">Community Forum</a></li>
                <li><a href="#" className="text-gray-400 hover:text-[#7a3ee3] transition-colors">Learning Lab</a></li>
                <li><a href="#" className="text-gray-400 hover:text-[#7a3ee3] transition-colors">Contact Sales</a></li>
                <li><a href="#" className="text-gray-400 hover:text-[#7a3ee3] transition-colors">Status</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-gray-800/30">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-gray-400 text-sm text-center md:text-left">
                © 2024 StellarAPI. All rights reserved.
              </div>
              <div className="flex flex-wrap justify-center md:justify-end gap-4 md:gap-6">
                <a href="#" className="text-gray-400 hover:text-[#7a3ee3] transition-colors text-sm">Terms</a>
                <a href="#" className="text-gray-400 hover:text-[#7a3ee3] transition-colors text-sm">Privacy</a>
                <a href="#" className="text-gray-400 hover:text-[#7a3ee3] transition-colors text-sm">Security</a>
                <a href="#" className="text-gray-400 hover:text-[#7a3ee3] transition-colors text-sm">Status</a>
                <a href="#" className="text-gray-400 hover:text-[#7a3ee3] transition-colors text-sm">Contact</a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Lazy load AuthModal and SettingsModal */}
      <Suspense fallback={null}>
        {showSettingsModal && (
          <SettingsModal 
            isOpen={showSettingsModal} 
            onClose={() => setShowSettingsModal(false)}
          />
        )}
        {showAuthModal && (
          <AuthModal 
            isOpen={showAuthModal} 
            onClose={() => setShowAuthModal(false)} 
            initialView={authView}
          />
        )}
      </Suspense>
    </div>
  );
}

export default App; 