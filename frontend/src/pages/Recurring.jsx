import { useState } from 'react';
import { Repeat, Play, Pause, Calendar, AlertCircle, Plus, CreditCard } from 'lucide-react';
import { formatCurrency } from '../utils/formatCurrency';
import Button from '../components/ui/Button';

const initialRecurring = [
  { id: 1, title: 'Netflix Subscription', amount: 1500, frequency: 'Monthly', nextDate: '2026-12-01', status: 'Active' },
  { id: 2, title: 'House Rent', amount: 25000, frequency: 'Monthly', nextDate: '2026-12-05', status: 'Active' },
  { id: 3, title: 'Gym Membership', amount: 5000, frequency: 'Monthly', nextDate: '2026-12-10', status: 'Paused' },
];

export default function Recurring() {
  const [recurrings, setRecurrings] = useState(initialRecurring);

  const toggleStatus = (id) => {
    setRecurrings(recurrings.map(item => 
      item.id === id 
        ? { ...item, status: item.status === 'Active' ? 'Paused' : 'Active' } 
        : item
    ));
  };

  const totalMonthlyCost = recurrings
    .filter(item => item.status === 'Active')
    .reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <Repeat className="text-primary-600" /> Recurring Transactions
          </h1>
          <p className="text-sm text-slate-500 mt-1 font-medium">Manage your subscriptions and fixed monthly bills.</p>
        </div>
        <Button>
          <span className="flex items-center gap-2"><Plus size={18} /> Add Recurring</span>
        </Button>
      </div>

      {/* Summary Card */}
      <div className="bg-gradient-to-br from-primary-900 to-slate-900 rounded-2xl p-6 md:p-8 text-white shadow-xl flex justify-between items-center relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-5 transition-transform group-hover:scale-110">
          <CreditCard size={160} />
        </div>
        <div className="relative z-10">
          <p className="text-primary-200 text-sm font-bold uppercase tracking-wider mb-2">Total Active Monthly Cost</p>
          <h2 className="text-4xl font-bold">{formatCurrency(totalMonthlyCost)}</h2>
        </div>
        <div className="relative z-10 p-4 bg-white/10 rounded-2xl backdrop-blur-md hidden sm:block">
          <Calendar size={32} className="text-white" />
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recurrings.map((item) => (
          <div 
            key={item.id} 
            className={`bg-white rounded-2xl border transition-all duration-300 p-5 shadow-sm hover:shadow-md flex flex-col ${
              item.status === 'Paused' ? 'opacity-70 border-slate-200 bg-slate-50' : 'border-slate-100'
            }`}
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-xl ${item.status === 'Active' ? 'bg-primary-50 text-primary-600' : 'bg-slate-200 text-slate-500'}`}>
                  <Repeat size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800">{item.title}</h3>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-0.5">{item.frequency}</p>
                </div>
              </div>
              
              <button 
                onClick={() => toggleStatus(item.id)}
                className={`p-2 rounded-xl transition-all ${
                  item.status === 'Active' 
                    ? 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100' 
                    : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                }`}
                title={item.status === 'Active' ? 'Pause' : 'Activate'}
              >
                {item.status === 'Active' ? <Pause size={16} /> : <Play size={16} />}
              </button>
            </div>
            
            <div className="mt-auto pt-4 border-t border-slate-100 flex justify-between items-end">
              <div>
                <p className="text-xs text-slate-500 font-bold mb-1 flex items-center gap-1">
                  <Calendar size={14} /> Next Payment
                </p>
                <p className="font-semibold text-sm text-slate-700">
                  {new Date(item.nextDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                </p>
              </div>
              <p className={`text-xl font-bold ${item.status === 'Active' ? 'text-slate-800' : 'text-slate-400 line-through'}`}>
                {formatCurrency(item.amount)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Info Alert */}
      <div className="bg-primary-50 border border-primary-100 rounded-2xl p-5 flex gap-4 text-primary-800 text-sm font-medium mt-8 items-start">
        <AlertCircle size={22} className="shrink-0 text-primary-600" />
        <p className="leading-relaxed">Recurring transactions will be automatically added to your Expenses on their due date once the backend is connected.</p>
      </div>

    </div>
  );
}