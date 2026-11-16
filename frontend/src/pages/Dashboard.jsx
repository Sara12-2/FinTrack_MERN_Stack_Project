import { useMemo } from 'react';
import { 
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend, 
  BarChart, Bar, XAxis, YAxis, CartesianGrid 
} from 'recharts';
import { Receipt, TrendingUp, Layers, ArrowUpRight, ArrowDownRight, Wallet, Clock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { mockExpenses, COLORS } from '../data/mockData';
import { formatCurrency } from '../utils/formatCurrency';

export default function Dashboard() {
  const { user } = useAuth();

  // Calculations
  const totalSpent = useMemo(() => mockExpenses.reduce((sum, exp) => sum + exp.amount, 0), []);
  
  const chartData = useMemo(() => {
    const categories = {};
    mockExpenses.forEach(exp => {
      categories[exp.category] = (categories[exp.category] || 0) + exp.amount;
    });
    return Object.entries(categories).map(([name, value]) => ({ name, value }));
  }, []);

  // Recent 4 transactions nikalne ke liye
  const recentExpenses = mockExpenses.slice(0, 4);

  return (
    <div className="space-y-6">
      {/* Header with Greeting */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Good morning, {user?.name?.split(' ')[0] || 'User'}! 👋
          </h1>
          <p className="text-sm text-gray-500 mt-1">Here's what's happening with your money today.</p>
        </div>
        <span className="text-xs bg-primary-50 text-primary-700 border border-primary-100 px-3 py-1.5 rounded-full font-semibold shadow-sm">
          Mock Data Mode
        </span>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Total Spent Card */}
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="absolute top-0 right-0 w-24 h-24 bg-primary-50 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
          <div className="relative">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 bg-primary-100 rounded-lg text-primary-600"><TrendingUp size={18} /></div>
              <p className="text-sm font-medium text-gray-600">Total Spent</p>
            </div>
            <p className="text-3xl font-bold text-gray-800">{formatCurrency(totalSpent)}</p>
            <div className="flex items-center gap-1 mt-2 text-xs font-medium text-red-500">
              <ArrowUpRight size={14} /> 12% more than last month
            </div>
          </div>
        </div>
        
        {/* Transactions Card */}
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="absolute top-0 right-0 w-24 h-24 bg-green-50 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
          <div className="relative">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 bg-green-100 rounded-lg text-green-600"><Receipt size={18} /></div>
              <p className="text-sm font-medium text-gray-600">Transactions</p>
            </div>
            <p className="text-3xl font-bold text-gray-800">{mockExpenses.length}</p>
            <div className="flex items-center gap-1 mt-2 text-xs font-medium text-green-500">
              <ArrowDownRight size={14} /> 4 fewer than last week
            </div>
          </div>
        </div>

        {/* Categories Card */}
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-50 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
          <div className="relative">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 bg-amber-100 rounded-lg text-amber-600"><Layers size={18} /></div>
              <p className="text-sm font-medium text-gray-600">Categories Used</p>
            </div>
            <p className="text-3xl font-bold text-gray-800">{chartData.length}</p>
            <div className="flex items-center gap-1 mt-2 text-xs font-medium text-gray-400">
              Across all expenses
            </div>
          </div>
        </div>
      </div>

      {/* Charts & Recent Transactions Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Charts Section (2/3 width) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Pie Chart */}
            <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
              <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Wallet size={18} className="text-primary-500" /> Spending Split
              </h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={chartData} dataKey="value" nameKey="name" innerRadius={60} outerRadius={80} paddingAngle={5}>
                    {chartData.map((entry, index) => (
                      <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(v) => formatCurrency(v)} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Bar Chart */}
            <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
              <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Layers size={18} className="text-primary-500" /> Category Breakdown
              </h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                  <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#6b7280' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: '#6b7280' }} axisLine={false} tickLine={false} width={40} />
                  <Tooltip formatter={(v) => formatCurrency(v)} cursor={{ fill: '#f3f4f6' }} contentStyle={{ borderRadius: '8px', border: 'none' }} />
                  <Bar dataKey="value" fill="#3b82f6" radius={[6, 6, 0, 0]} barSize={30} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Recent Transactions Section (1/3 width) */}
        <div className="lg:col-span-1 bg-white rounded-xl border border-gray-100 shadow-sm flex flex-col">
          <div className="p-5 border-b border-gray-50">
            <h3 className="font-semibold text-gray-800 flex items-center gap-2">
              <Clock size={18} className="text-primary-500" /> Recent Transactions
            </h3>
          </div>
          <div className="flex-1 p-2">
            {recentExpenses.map((exp) => (
              <div key={exp._id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-bold text-xs">
                    {exp.title.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800 truncate max-w-[120px]">{exp.title}</p>
                    <p className="text-xs text-gray-500">{new Date(exp.date).toLocaleDateString()}</p>
                  </div>
                </div>
                <p className="text-sm font-bold text-gray-800">-{formatCurrency(exp.amount)}</p>
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-gray-50 text-center">
            <a href="/expenses" className="text-sm font-medium text-primary-600 hover:text-primary-700">
              View all transactions →
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}