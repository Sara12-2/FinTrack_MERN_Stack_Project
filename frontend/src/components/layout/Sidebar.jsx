import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Receipt, Wallet, Repeat, Sparkles, LogOut, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const links = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/expenses', icon: Receipt, label: 'Expenses' },
  { to: '/budgets', icon: Wallet, label: 'Budgets' },
  { to: '/recurring', icon: Repeat, label: 'Recurring' },
  { to: '/insights', icon: Sparkles, label: 'AI Insights' },
];

export default function Sidebar({ closeSidebar }) {
  const { logout } = useAuth();
  
  return (
    <aside className="w-64 bg-gray-900 text-white flex flex-col h-full shadow-2xl">
      {/* Logo & Mobile Close Button */}
      <div className="p-6 border-b border-gray-800 flex justify-between items-center">
        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-primary-500">
          💰 FinTrack
        </h1>
        <button onClick={closeSidebar} className="md:hidden text-gray-400 hover:text-white">
          <X size={24} />
        </button>
      </div>
      
      {/* Navigation Links */}
      <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
        <p className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 mt-2">Menu</p>
        {links.map(({ to, icon: Icon, label }) => (
          <NavLink 
            key={to} 
            to={to} 
            end={to === '/'} 
            onClick={closeSidebar}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive 
                  ? 'bg-primary-600 text-white shadow-md shadow-primary-600/20' 
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`
            }
          >
            {/* Corrected Icon usage */}
            <Icon size={20} />
            <span className="font-medium">{label}</span>
          </NavLink>
        ))}
      </nav>
      
      {/* Logout Button */}
      <div className="p-4 border-t border-gray-800">
        <button 
          onClick={logout} 
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white rounded-xl transition-all duration-200 font-medium"
        >
          <LogOut size={20} /> Logout
        </button>
      </div>
    </aside>
  );
}