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
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header with Greeting */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Good morning, {user?.name?.split(' ')[0] || 'User'}! 
          </h1>
          <p className="text-sm text-slate-500 mt-1 font-medium">Here's a summary of your financial activity.</p>
        </div>
        <span className="text-xs bg-primary-50 text-primary-700 border border-primary-100 px-4 py-2 rounded-full font-semibold shadow-sm">
          Mock Data Mode
        </span>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Spent Card */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-all duration-300">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary-50 rounded-bl-full -mr-6 -mt-6 transition-transform group-hover:scale-110"></div>
          <div className="relative">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 bg-primary-100 rounded-xl text-primary-600"><TrendingUp size={20} /></div>
              <p className="text-sm font-semibold text-slate-500">Total Spent</p>
            </div>
            <p className="text-3xl font-bold text-slate-800">{formatCurrency(totalSpent)}</p>
            <div className="flex items-center gap-1 mt-3 text-xs font-bold text-red-500 bg-red-50 w-fit px-2 py-1 rounded-md">
              <ArrowUpRight size={14} /> 12% more than last month
            </div>
          </div>
        </div>
        
        {/* Transactions Card */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-all duration-300">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-full -mr-6 -mt-6 transition-transform group-hover:scale-110"></div>
          <div className="relative">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 bg-emerald-100 rounded-xl text-emerald-600"><Receipt size={20} /></div>
              <p className="text-sm font-semibold text-slate-500">Transactions</p>
            </div>
            <p className="text-3xl font-bold text-slate-800">{mockExpenses.length}</p>
            <div className="flex items-center gap-1 mt-3 text-xs font-bold text-emerald-500 bg-emerald-50 w-fit px-2 py-1 rounded-md">
              <ArrowDownRight size={14} /> 4 fewer than last week
            </div>
          </div>
        </div>

        {/* Categories Card */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-all duration-300">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-50 rounded-bl-full -mr-6 -mt-6 transition-transform group-hover:scale-110"></div>
          <div className="relative">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 bg-amber-100 rounded-xl text-amber-600"><Layers size={20} /></div>
              <p className="text-sm font-semibold text-slate-500">Categories Used</p>
            </div>
            <p className="text-3xl font-bold text-slate-800">{chartData.length}</p>
            <div className="flex items-center gap-1 mt-3 text-xs font-bold text-slate-400 bg-slate-50 w-fit px-2 py-1 rounded-md">
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
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col">
              <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
                <Wallet size={18} className="text-primary-500" /> Spending Split
              </h3>
              <div className="flex-1 flex items-center justify-center">
                <ResponsiveContainer width="100%" height={280}>
                  <PieChart>
                    <Pie data={chartData} dataKey="value" nameKey="name" innerRadius={70} outerRadius={100} paddingAngle={6} stroke="none">
                      {chartData.map((entry, index) => (
                        <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(v) => formatCurrency(v)} 
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px -5px rgb(0 0 0 / 0.1)' }} 
                    />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Bar Chart */}
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col">
              <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
                <Layers size={18} className="text-primary-500" /> Category Breakdown
              </h3>
              <div className="flex-1 flex items-center justify-center">
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={chartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                    <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#64748b', fontWeight: 600 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                    <Tooltip formatter={(v) => formatCurrency(v)} cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '12px', border: 'none' }} />
                    <Bar dataKey="value" fill="#6366f1" radius={[6, 6, 0, 0]} barSize={32} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Transactions Section (1/3 width) */}
        <div className="lg:col-span-1 bg-white rounded-2xl border border-slate-100 shadow-sm flex flex-col h-[400px]">
          <div className="p-6 border-b border-slate-100">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <Clock size={18} className="text-primary-500" /> Recent Transactions
            </h3>
          </div>
          <div className="flex-1 overflow-y-auto p-2">
            {recentExpenses.map((exp) => (
              <div key={exp._id} className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-xl transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 font-bold text-xs">
                    {exp.title.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800 truncate max-w-[120px]">{exp.title}</p>
                    <p className="text-xs text-slate-500 font-medium">{new Date(exp.date).toLocaleDateString()}</p>
                  </div>
                </div>
                <p className="text-sm font-bold text-slate-800">-{formatCurrency(exp.amount)}</p>
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-slate-100 text-center bg-slate-50/50 rounded-b-2xl">
            <a href="/expenses" className="text-sm font-bold text-primary-600 hover:text-primary-700 transition">
              View All
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}