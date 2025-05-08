'use client'

import { ReactNode, useState } from 'react';
import { adminMenuItems } from '@/lib/adminMenu';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaSun, FaMoon, FaBars, FaTimes } from 'react-icons/fa';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <div className="flex h-screen bg-base-100">
      {/* Desktop Sidebar - Collapsible */}
      <div className={`hidden md:flex flex-col ${isSidebarCollapsed ? 'w-20' : 'w-64'} bg-base-200 border-r border-base-300 transition-all duration-300`}>
        <div className="flex-1 overflow-y-auto">
          {/* Logo/Brand */}
          <div className="p-4 border-b border-base-300 flex justify-between items-center">
            {!isSidebarCollapsed && (
              <Link href="/dashboard" className="text-xl font-bold text-primary">
                Dentist
              </Link>
            )}
            <button 
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              className="btn btn-ghost btn-sm"
            >
              {isSidebarCollapsed ? <FaBars /> : <FaTimes />}
            </button>
          </div>

          {/* Menu Items */}
          <nav className="p-2 space-y-1">
            {adminMenuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center p-3 rounded-lg transition-colors ${
                  pathname === item.href
                    ? 'bg-primary text-primary-content'
                    : 'hover:bg-base-300'
                }`}
                title={isSidebarCollapsed ? item.label : undefined}
              >
                <span className="mr-3">{item.icon}</span>
                {!isSidebarCollapsed && <span>{item.label}</span>}
              </Link>
            ))}
          </nav>
        </div>

        {/* Theme Toggle */}
        <div className="p-4 border-t border-base-300">
          <button 
            onClick={toggleTheme}
            className="btn btn-ghost w-full"
            title={isSidebarCollapsed ? "Toggle theme" : undefined}
          >
            {theme === 'light' ? <FaMoon /> : <FaSun />}
            {!isSidebarCollapsed && (
              <>
                <span className="ml-2">Toggle Theme</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Sidebar - Full screen overlay */}
      {mobileSidebarOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-black bg-opacity-50" onClick={() => setMobileSidebarOpen(false)} />
      )}

      {/* Mobile Sidebar - Content */}
      <div className={`md:hidden fixed top-0 left-0 h-full w-16 bg-base-200 border-r border-base-300 z-50 transition-transform ${mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="p-3 border-b border-base-300 flex justify-center">
            <button 
              onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              className="btn btn-ghost btn-sm p-2"
            >
              {mobileSidebarOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
          
          <nav className="flex-1 flex flex-col items-center py-2 space-y-4">
            {adminMenuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`p-3 rounded-lg transition-colors flex justify-center ${
                  pathname === item.href
                    ? 'bg-primary text-primary-content'
                    : 'hover:bg-base-300'
                }`}
                title={item.label}
              >
                {item.icon}
              </Link>
            ))}
          </nav>

          <div className="p-3 border-t border-base-300 flex justify-center">
            <button 
              onClick={toggleTheme}
              className="btn btn-ghost p-2"
              title="Toggle theme"
            >
              {theme === 'light' ? <FaMoon /> : <FaSun />}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Header (hidden on desktop) */}
        <header className="md:hidden bg-base-200 p-4 border-b border-base-300">
          <div className="flex justify-between items-center">
            <button 
              onClick={() => setMobileSidebarOpen(true)}
              className="btn btn-ghost btn-square"
            >
              <FaBars />
            </button>
            <Link href="/dashboard" className="text-lg font-bold">
              Dashboard
            </Link>
            <div className="w-8"></div> {/* Spacer for alignment */}
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-4 bg-base-100">
          {children}
        </main>
      </div>
    </div>
  );
}