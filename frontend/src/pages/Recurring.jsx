import { useState } from 'react';
import { Repeat, Play, Pause, Calendar, AlertCircle } from 'lucide-react';
import { formatCurrency } from '../utils/formatCurrency';

const initialRecurring = [
  { id: 1, title: 'Netflix Subscription', amount: 1500, frequency: 'Monthly', nextDate: '2026-12-01', status: 'Active' },
  { id: 2, title: 'House Rent', amount: 25000, frequency: 'Monthly', nextDate: '2026-12-05', status: 'Active' },
  { id: 3, title: 'Gym Membership', amount: 5000, frequency: 'Monthly', nextDate: '2026-12-10', status: 'Paused' },
];

export default function Recurring() {
  const [recurrings, setRecurrings] = useState(initialRecurring);

  // Active aur Paused toggle karne ka function
  const toggleStatus = (id) => {
    setRecurrings(recurrings.map(item => 
      item.id === id 
        ? { ...item, status: item.status === 'Active' ? 'Paused' : 'Active' } 
        : item
    ));
  };

  // Total Monthly Cost Calculate karein (sirf Active items ka)
  const totalMonthlyCost = recurrings
    .filter(item => item.status === 'Active')
    .reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Repeat className="text-primary-600" /> Recurring Transactions
          </h1>
          <p className="text-sm text-gray-500 mt-1">Manage your subscriptions and fixed monthly bills.</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Repeat size={16} /> Add Recurring
        </button>
      </div>

      {/* Summary Card */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-xl p-6 text-white shadow-lg flex justify-between items-center">
        <div>
          <p className="text-primary-100 text-sm font-medium mb-1">Total Active Monthly Cost</p>
          <h2 className="text-3xl font-bold">{formatCurrency(totalMonthlyCost)}</h2>
        </div>
        <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
          <Calendar size={28} />
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {recurrings.map((item) => (
          <div 
            key={item.id} 
            className={`bg-white rounded-xl border transition-all duration-300 p-5 shadow-sm hover:shadow-md flex flex-col ${
              item.status === 'Paused' ? 'opacity-70 border-gray-200 bg-gray-50/50' : 'border-primary-100'
            }`}
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-lg ${item.status === 'Active' ? 'bg-primary-50 text-primary-600' : 'bg-gray-200 text-gray-500'}`}>
                  <Repeat size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">{item.title}</h3>
                  <p className="text-xs text-gray-500 font-medium">{item.frequency}</p>
                </div>
              </div>
              
              <button 
                onClick={() => toggleStatus(item.id)}
                className={`p-1.5 rounded-full transition-colors ${
                  item.status === 'Active' 
                    ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                }`}
                title={item.status === 'Active' ? 'Pause' : 'Activate'}
              >
                {item.status === 'Active' ? <Pause size={14} /> : <Play size={14} />}
              </button>
            </div>
            
            <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-end">
              <div>
                <p className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                  <Calendar size={12} /> Next Payment
                </p>
                <p className="font-semibold text-sm text-gray-700">
                  {new Date(item.nextDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                </p>
              </div>
              <p className={`text-xl font-bold ${item.status === 'Active' ? 'text-gray-800' : 'text-gray-400 line-through'}`}>
                {formatCurrency(item.amount)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Info Alert */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3 text-blue-800 text-sm mt-8">
        <AlertCircle size={20} className="shrink-0" />
        <p>Recurring transactions will be automatically added to your Expenses on their due date once the backend is connected.</p>
      </div>

    </div>
  );
}