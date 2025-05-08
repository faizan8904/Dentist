// components/NavbarHome.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { FaBars, FaTimes, FaSun, FaMoon } from 'react-icons/fa';
import { menuItems } from '@/lib/menuItems';

export default function NavbarHome() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // Toggle sidebar
  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  // Toggle theme
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  // Initialize theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  return (
    <>
      {/* Top Navbar */}
      <nav className="navbar bg-base-100/80 backdrop-blur-sm shadow-sm fixed top-0 z-50 w-full px-4 sm:px-6">
        <div className="flex-1">
          <Link href="/" className="btn btn-ghost text-xl font-bold">
            <span className="text-primary">Dentist</span>
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`btn btn-ghost btn-sm rounded-btn ${
                pathname === item.href ? 'btn-active' : ''
              }`}
            >
              {item.label}
            </Link>
          ))}
          
          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme}
            className="btn btn-ghost btn-circle ml-2"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <FaMoon size={18} /> : <FaSun size={18} />}
          </button>
        </div>
        
        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          <button 
            onClick={toggleTheme}
            className="btn btn-ghost btn-circle"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <FaMoon size={18} /> : <FaSun size={18} />}
          </button>
          
          <button 
            onClick={toggleSidebar} 
            className="btn btn-ghost btn-circle"
            aria-label="Open menu"
          >
            <FaBars size={20} />
          </button>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div className={`fixed inset-0 z-40 transition-all duration-300 ease-in-out ${isOpen ? 'visible' : 'invisible'}`}>
        {/* Overlay */}
        <div 
          className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={closeSidebar}
        />
        
        {/* Sidebar Content */}
        <div 
          className={`absolute top-0 right-0 h-full w-80 bg-base-100 shadow-xl transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
        >
          <div className="flex flex-col h-full p-4">
            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b border-base-200">
              <Link 
                href="/" 
                className="text-2xl font-bold text-primary"
                onClick={closeSidebar}
              >
                Dentist
              </Link>
              <button 
                onClick={closeSidebar} 
                className="btn btn-ghost btn-circle"
                aria-label="Close menu"
              >
                <FaTimes size={20} />
              </button>
            </div>
            
            {/* Menu Items */}
            <div className="flex-1 flex flex-col gap-2 p-4 overflow-y-auto">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeSidebar}
                  className={`btn btn-ghost justify-start text-lg px-4 py-3 rounded-btn ${
                    pathname === item.href ? 'btn-active' : ''
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
            
            {/* Footer */}
            <div className="p-4 border-t border-base-200">
              <div className="flex justify-center">
                <button 
                  onClick={toggleTheme}
                  className="btn btn-ghost btn-circle"
                  aria-label="Toggle theme"
                >
                  {theme === 'light' ? <FaMoon size={20} /> : <FaSun size={20} />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}