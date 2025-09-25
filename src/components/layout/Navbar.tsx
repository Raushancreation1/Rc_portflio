'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from '@/context/ThemeContext';
import { FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [colorIndex, setColorIndex] = useState(0);

  // Predefined gradient themes (keep class strings static for Tailwind)
  const gradients = [
    {
      name: 'Blue → Indigo',
      base: 'bg-gradient-to-r from-blue-600/90 to-indigo-700/90',
      scrolled: 'bg-gradient-to-r from-blue-600 to-indigo-700',
      hoverItem: 'hover:bg-blue-700/30',
    },
    {
      name: 'Purple → Pink',
      base: 'bg-gradient-to-r from-purple-600/90 to-pink-600/90',
      scrolled: 'bg-gradient-to-r from-purple-600 to-pink-600',
      hoverItem: 'hover:bg-purple-700/30',
    },
    {
      name: 'Emerald → Teal',
      base: 'bg-gradient-to-r from-emerald-600/90 to-teal-600/90',
      scrolled: 'bg-gradient-to-r from-emerald-600 to-teal-600',
      hoverItem: 'hover:bg-emerald-700/30',
    },
    {
      name: 'Orange → Rose',
      base: 'bg-gradient-to-r from-orange-600/90 to-rose-600/90',
      scrolled: 'bg-gradient-to-r from-orange-600 to-rose-600',
      hoverItem: 'hover:bg-orange-700/30',
    },
    {
      name: 'Slate → Violet',
      base: 'bg-gradient-to-r from-slate-700/90 to-violet-700/90',
      scrolled: 'bg-gradient-to-r from-slate-700 to-violet-700',
      hoverItem: 'hover:bg-slate-700/30',
    },
  ];

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
    // restore color choice
    try {
      const idx = localStorage.getItem('navColorIndex');
      if (idx) setColorIndex(Number(idx) % gradients.length);
    } catch {}
  }, []);

  // Handle scroll effect
  useEffect(() => {
    if (!mounted) return;
    
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled, mounted]);

  const cycleColor = () => {
    const next = (colorIndex + 1) % gradients.length;
    setColorIndex(next);
    try { localStorage.setItem('navColorIndex', String(next)); } catch {}
  };

  if (!mounted) {
    return (
      <nav className="fixed w-full z-50 bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="w-24 h-6 bg-white/30 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? `${gradients[colorIndex].scrolled} shadow-lg backdrop-blur-md`
          : `${gradients[colorIndex].base} backdrop-blur-md`
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="#" className="text-xl font-bold text-white hover:text-blue-100 transition-colors">
              Raushan Kumar
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-3 md:space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-white/90 hover:text-white ${gradients[colorIndex].hoverItem} px-3 py-2 rounded-md text-sm font-medium transition-colors`}
              >
                {item.name}
              </Link>
            ))}
            {/* Color cycle button */}
            <button
              onClick={cycleColor}
              className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white/50 transition-colors duration-200"
              aria-label={`Switch navbar color (${gradients[colorIndex].name})`}
              title={`Switch navbar color (${gradients[colorIndex].name})`}
            >
              <span className="block w-4 h-4 rounded-full bg-white/80" />
            </button>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white/50 transition-colors duration-200"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? (
                <FiSun size={20} className="text-yellow-400" />
              ) : (
                <FiMoon size={20} className="text-indigo-600" />
              )}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96' : 'max-h-0 overflow-hidden'
        }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`block px-3 py-2 rounded-md text-base font-medium text-white ${gradients[colorIndex].hoverItem}`}
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <button
            onClick={cycleColor}
            className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-white flex items-center hover:bg-white/10/30"
          >
            <span className="inline-block w-3 h-3 rounded-full bg-white mr-2" />
            Switch Navbar Color
          </button>
          <button
            onClick={toggleTheme}
            className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-white hover:bg-blue-700/30 flex items-center"
          >
            {theme === 'dark' ? (
              <>
                <FiSun className="mr-2" /> Light Mode
              </>
            ) : (
              <>
                <FiMoon className="mr-2" /> Dark Mode
              </>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
