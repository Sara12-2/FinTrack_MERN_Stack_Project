import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Receipt, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const links = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/expenses', icon: Receipt, label: 'Expenses' },
];

export default function Sidebar() {
  const { logout } = useAuth();
  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col min-h-screen">
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-primary-600">💰 FinTrack</h1>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {links.map(({ to, icon: Icon, label }) => (
          <NavLink key={to} to={to} end={to === '/'} className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2.5 rounded-lg transition ${isActive ? 'bg-primary-50 text-primary-700 font-medium' : 'text-gray-600 hover:bg-gray-50'}`
          }>
            <Icon size={18} /> {label}
          </NavLink>
        ))}
      </nav>
      <button onClick={logout} className="m-4 flex items-center gap-3 px-4 py-2.5 text-red-600 hover:bg-red-50 rounded-lg transition">
        <LogOut size={18} /> Logout
      </button>
    </aside>
  );
}