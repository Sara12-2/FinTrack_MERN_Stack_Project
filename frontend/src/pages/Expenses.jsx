import { useState, useMemo } from 'react';
import { Plus, Trash2, Search, Filter, Receipt } from 'lucide-react';
import { mockExpenses as initialExpenses } from '../data/mockData';
import { formatCurrency } from '../utils/formatCurrency';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Modal from '../components/ui/Modal';

const CATEGORIES = ['All', 'Food', 'Transport', 'Shopping', 'Bills', 'Entertainment', 'Health', 'Other'];

export default function Expenses() {
  const [expenses, setExpenses] = useState(initialExpenses);
  const [modalOpen, setModalOpen] = useState(false);
  
  // Search & Filter State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Form ki state
  const [form, setForm] = useState({ 
    title: '', 
    amount: '', 
    category: 'Food', 
    date: new Date().toISOString().split('T')[0], 
    notes: '' 
  });

  // Naya Expense add karne ka function
  const handleSubmit = (e) => {
    e.preventDefault();
    const newExpense = { 
      _id: Date.now().toString(), 
      ...form, 
      amount: Number(form.amount) 
    };
    setExpenses([newExpense, ...expenses]);
    setModalOpen(false);
    setForm({ title: '', amount: '', category: 'Food', date: new Date().toISOString().split('T')[0], notes: '' });
  };

  // Expense delete karne ka function
  const handleDelete = (id) => {
    if(window.confirm('Are you sure you want to delete this expense?')) {
      setExpenses(expenses.filter(exp => exp._id !== id));
    }
  };

  // Filter Logic
  const filteredExpenses = useMemo(() => {
    return expenses.filter(exp => {
      const matchesSearch = exp.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || exp.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [expenses, searchTerm, selectedCategory]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Header & Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Expenses</h1>
          <p className="text-sm text-slate-500 mt-1 font-medium">Manage and track all your daily transactions.</p>
        </div>
        <Button onClick={() => setModalOpen(true)}>
          <span className="flex items-center gap-2"><Plus size={18} /> Add New Expense</span>
        </Button>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4 bg-white p-2 rounded-2xl border border-slate-100 shadow-sm">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search expenses by title..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-transparent border-none outline-none text-sm text-slate-700 font-medium placeholder-slate-400"
          />
        </div>
        <div className="h-px md:h-auto md:w-px bg-slate-100"></div>
        <div className="flex items-center gap-2 px-3 py-2 md:py-0">
          <Filter size={18} className="text-slate-400" />
          <select 
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-transparent border-none outline-none text-sm text-slate-700 font-semibold cursor-pointer"
          >
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50 border-b border-slate-100 text-sm text-slate-500">
            <tr>
              <th className="p-4 font-semibold">Title</th>
              <th className="p-4 font-semibold">Category</th>
              <th className="p-4 font-semibold">Date</th>
              <th className="p-4 font-semibold text-right">Amount</th>
              <th className="p-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredExpenses.map((exp) => (
              <tr key={exp._id} className="hover:bg-slate-50/80 transition-colors group">
                <td className="p-4 font-bold text-slate-800">{exp.title}</td>
                <td className="p-4">
                  <span className="px-3 py-1 bg-primary-50 text-primary-700 text-xs font-bold rounded-lg border border-primary-100">
                    {exp.category}
                  </span>
                </td>
                <td className="p-4 text-sm text-slate-500 font-medium">{new Date(exp.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                <td className="p-4 text-right font-bold text-slate-800">{formatCurrency(exp.amount)}</td>
                <td className="p-4 text-right">
                  <button 
                    onClick={() => handleDelete(exp._id)} 
                    className="text-slate-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                    title="Delete"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredExpenses.length === 0 && (
          <div className="p-12 text-center text-slate-500 flex flex-col items-center">
            <Receipt size={48} className="text-slate-300 mb-3" />
            <p className="text-lg font-bold text-slate-700">No expenses found</p>
            <p className="text-sm font-medium">Try adjusting your search or filters.</p>
          </div>
        )}
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-3">
        {filteredExpenses.map((exp) => (
          <div key={exp._id} className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex justify-between items-center">
            <div>
              <p className="font-bold text-slate-800">{exp.title}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[10px] font-bold px-2 py-0.5 bg-primary-50 text-primary-700 rounded-md">{exp.category}</span>
                <span className="text-xs text-slate-500 font-medium">{new Date(exp.date).toLocaleDateString()}</span>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-slate-800 mb-1">{formatCurrency(exp.amount)}</p>
              <button onClick={() => handleDelete(exp._id)} className="text-red-500 text-xs font-bold hover:underline">
                Delete
              </button>
            </div>
          </div>
        ))}
        {filteredExpenses.length === 0 && (
          <p className="text-center text-slate-500 font-medium py-10">No expenses found.</p>
        )}
      </div>

      {/* Add Expense Modal */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Add New Expense">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input 
            label="Expense Title" 
            value={form.title} 
            onChange={(e) => setForm({ ...form, title: e.target.value })} 
            placeholder="e.g., Grocery Shopping"
            required 
          />
          <div className="grid grid-cols-2 gap-4">
            <Input 
              label="Amount (Rs)" 
              type="number" 
              value={form.amount} 
              onChange={(e) => setForm({ ...form, amount: e.target.value })} 
              placeholder="0.00"
              required 
            />
            <div>
              <label className="block text-sm font-semibold mb-1.5 text-slate-700">Category</label>
              <select 
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-sm font-medium" 
                value={form.category} 
                onChange={(e) => setForm({ ...form, category: e.target.value })}
              >
                {CATEGORIES.filter(c => c !== 'All').map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <Input 
            label="Date" 
            type="date" 
            value={form.date} 
            onChange={(e) => setForm({ ...form, date: e.target.value })} 
          />
          <div className="flex gap-3 justify-end mt-8">
            <Button type="button" variant="secondary" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button type="submit">Save Expense</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}