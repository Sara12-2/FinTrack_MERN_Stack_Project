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
    <div className="space-y-6">
      
      {/* Header & Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Expenses</h1>
          <p className="text-sm text-gray-500 mt-1">Manage and track all your daily transactions.</p>
        </div>
        <Button onClick={() => setModalOpen(true)} size="lg">
          <span className="flex items-center gap-2"><Plus size={18} /> Add New Expense</span>
        </Button>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4 bg-white p-2 rounded-xl border border-gray-100 shadow-sm">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search by title..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-transparent border-none outline-none text-sm text-gray-700"
          />
        </div>
        <div className="h-px md:h-auto md:w-px bg-gray-200"></div>
        <div className="flex items-center gap-2 px-3 py-2 md:py-0">
          <Filter size={18} className="text-gray-400" />
          <select 
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-transparent border-none outline-none text-sm text-gray-700 font-medium cursor-pointer"
          >
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 border-b border-gray-100 text-sm text-gray-600">
            <tr>
              <th className="p-4 font-semibold">Title</th>
              <th className="p-4 font-semibold">Category</th>
              <th className="p-4 font-semibold">Date</th>
              <th className="p-4 font-semibold text-right">Amount</th>
              <th className="p-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredExpenses.map((exp) => (
              <tr key={exp._id} className="hover:bg-gray-50/80 transition-colors group">
                <td className="p-4 font-medium text-gray-800">{exp.title}</td>
                <td className="p-4">
                  <span className="px-2.5 py-1 bg-primary-50 text-primary-700 text-xs font-semibold rounded-md border border-primary-100">
                    {exp.category}
                  </span>
                </td>
                <td className="p-4 text-sm text-gray-500">{new Date(exp.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                <td className="p-4 text-right font-bold text-gray-800">{formatCurrency(exp.amount)}</td>
                <td className="p-4 text-right">
                  <button 
                    onClick={() => handleDelete(exp._id)} 
                    className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-lg transition-all opacity-0 group-hover:opacity-100"
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
          <div className="p-12 text-center text-gray-500 flex flex-col items-center">
            <Receipt size={48} className="text-gray-300 mb-3" />
            <p className="text-lg font-medium text-gray-700">No expenses found</p>
            <p className="text-sm">Try adjusting your search or filters.</p>
          </div>
        )}
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-3">
        {filteredExpenses.map((exp) => (
          <div key={exp._id} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex justify-between items-center">
            <div>
              <p className="font-semibold text-gray-800">{exp.title}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[10px] px-2 py-0.5 bg-primary-50 text-primary-700 rounded-full">{exp.category}</span>
                <span className="text-xs text-gray-500">{new Date(exp.date).toLocaleDateString()}</span>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-gray-800 mb-1">{formatCurrency(exp.amount)}</p>
              <button onClick={() => handleDelete(exp._id)} className="text-red-500 text-xs hover:underline">
                Delete
              </button>
            </div>
          </div>
        ))}
        {filteredExpenses.length === 0 && (
          <p className="text-center text-gray-500 py-10">No expenses found.</p>
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
              <label className="block text-sm font-medium mb-1.5 text-gray-700">Category</label>
              <select 
                className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all" 
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