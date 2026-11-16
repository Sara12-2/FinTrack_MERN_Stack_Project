import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Menu, Search, Bell, ChevronDown, User, Settings, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Navbar({ toggleSidebar }) {
  const { user, logout } = useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4 md:px-6 sticky top-0 z-30">
      
      {/* Left Side: Mobile Menu & Search */}
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleSidebar}
          className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
        >
          <Menu size={24} />
        </button>

        {/* Search Bar (Desktop Only) */}
        <div className="hidden md:flex items-center bg-gray-50 rounded-lg px-3 py-2 border border-gray-200 focus-within:border-primary-500 focus-within:ring-1 focus-within:ring-primary-500 transition-all">
          <Search size={18} className="text-gray-400" />
          <input 
            type="text" 
            placeholder="Search expenses..." 
            className="bg-transparent border-none outline-none ml-2 text-sm w-64 text-gray-700 placeholder-gray-400"
          />
        </div>
      </div>

      {/* Right Side: Notifications & Profile */}
      <div className="flex items-center gap-3 md:gap-4">
        
        {/* Notification Bell */}
        <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full transition">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        {/* Divider */}
        <div className="h-6 w-px bg-gray-200 hidden md:block"></div>

        {/* User Profile Dropdown */}
        <div className="relative">
          <button 
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-gray-50 transition border border-transparent hover:border-gray-200"
          >
            <div className="w-8 h-8 md:w-9 md:h-9 bg-primary-100 rounded-full flex items-center justify-center font-bold text-primary-700 shrink-0">
              {user?.name?.[0]?.toUpperCase() || 'U'}
            </div>
            <div className="hidden md:block text-left">
              <p className="text-sm font-semibold text-gray-700 leading-tight">{user?.name || 'User'}</p>
              <p className="text-xs text-gray-500">{user?.email || 'user@fintrack.com'}</p>
            </div>
            <ChevronDown size={16} className="text-gray-400 hidden md:block" />
          </button>

          {/* Dropdown Menu */}
          {isProfileOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setIsProfileOpen(false)}></div>
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
                <Link to="/profile" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                  <User size={16} /> My Profile
                </Link>
                <Link to="/settings" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                  <Settings size={16} /> Settings
                </Link>
                <div className="h-px bg-gray-100 my-1"></div>
                <button 
                  onClick={logout}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  <LogOut size={16} /> Logout
                </button>
              </div>
            </>
          )}
        </div>

      </div>
    </header>
  );
}