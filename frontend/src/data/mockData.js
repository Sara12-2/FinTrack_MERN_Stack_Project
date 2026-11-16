export const mockUser = {
  _id: 'user123',
  name: 'Al Rehman',
  email: 'alrehman@example.com'
};

export const mockExpenses = [
  { _id: '1', title: 'Grocery Shopping', amount: 4500, category: 'Food', date: '2026-11-10', notes: 'Weekly groceries' },
  { _id: '2', title: 'Uber Ride', amount: 850, category: 'Transport', date: '2026-11-11', notes: 'Office to home' },
  { _id: '3', title: 'Electricity Bill', amount: 12000, category: 'Bills', date: '2026-11-05', notes: 'November bill' },
  { _id: '4', title: 'Netflix Subscription', amount: 1500, category: 'Entertainment', date: '2026-11-01', notes: 'Monthly plan' },
  { _id: '5', title: 'Dinner with friends', amount: 3200, category: 'Food', date: '2026-11-12', notes: 'BBQ Night' },
  { _id: '6', title: 'New T-Shirt', amount: 2500, category: 'Shopping', date: '2026-11-08', notes: 'Zara sale' },
];

export const mockBudgets = [
  { category: 'Food', limit: 15000, spent: 7700 },
  { category: 'Transport', limit: 5000, spent: 850 },
  { category: 'Bills', limit: 10000, spent: 12000 },
  { category: 'Entertainment', limit: 3000, spent: 1500 },
  { category: 'Shopping', limit: 5000, spent: 2500 },
];

export const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];