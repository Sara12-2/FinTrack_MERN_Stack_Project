import { useAuth } from '../../context/AuthContext';

export default function Navbar() {
  const { user } = useAuth();
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
      <h2 className="text-lg font-semibold text-gray-700">Welcome back, {user?.name?.split(' ')[0]} 👋</h2>
      <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center font-semibold text-primary-700">
        {user?.name?.[0]?.toUpperCase()}
      </div>
    </header>
  );
}