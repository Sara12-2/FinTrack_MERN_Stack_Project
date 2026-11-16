import { mockBudgets } from '../data/mockData';
import { formatCurrency } from '../utils/formatCurrency';
import { AlertCircle, TrendingUp, Wallet, ShoppingBag, Car, Zap, Film } from 'lucide-react';

// Category ke hisaab se icons
const categoryIcons = {
  Food: ShoppingBag,
  Transport: Car,
  Bills: Zap,
  Entertainment: Film,
  Shopping: Wallet,
};

export default function Budgets() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Budgets</h1>
          <p className="text-sm text-gray-500 mt-1">Track your monthly spending limits</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Wallet size={18} /> Set New Budget
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {mockBudgets.map((budget) => {
          const percentage = Math.min((budget.spent / budget.limit) * 100, 100);
          const isOver = budget.spent > budget.limit;
          const Icon = categoryIcons[budget.category] || Wallet;
          
          return (
            <div key={budget.category} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
              
              {/* Card Header */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-lg ${isOver ? 'bg-red-50 text-red-600' : 'bg-primary-50 text-primary-600'}`}>
                    <Icon size={22} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{budget.category}</h3>
                    <p className="text-xs text-gray-500">Monthly Limit</p>
                  </div>
                </div>
                <span className={`text-xs font-bold px-2 py-1 rounded-full ${isOver ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                  {percentage.toFixed(0)}%
                </span>
              </div>

              {/* Amounts */}
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-500">Spent: <strong className="text-gray-800">{formatCurrency(budget.spent)}</strong></span>
                  <span className="text-gray-500">Limit: <strong className="text-gray-800">{formatCurrency(budget.limit)}</strong></span>
                </div>
                
                {/* Progress Bar */}
                <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ease-out ${isOver ? 'bg-gradient-to-r from-red-500 to-red-600' : 'bg-gradient-to-r from-primary-400 to-primary-600'}`} 
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>

              {/* Footer Warning */}
              {isOver ? (
                <div className="flex items-center gap-2 text-xs text-red-600 bg-red-50 p-2 rounded-lg mt-3">
                  <AlertCircle size={14} />
                  <span>Over budget by <strong>{formatCurrency(budget.spent - budget.limit)}</strong></span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-xs text-green-600 bg-green-50 p-2 rounded-lg mt-3">
                  <TrendingUp size={14} />
                  <span>{formatCurrency(budget.limit - budget.spent)} left to spend</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}