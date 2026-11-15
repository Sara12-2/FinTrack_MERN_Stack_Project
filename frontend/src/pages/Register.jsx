import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register(form.name, form.email, form.password);
      toast.success('Account created!');
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-blue-100 p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-primary-600 mb-6">Create Account</h1>
        <form onSubmit={handleSubmit}>
          <Input label="Name" placeholder="John Doe" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          <Input label="Email" type="email" placeholder="you@example.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          <Input label="Password" type="password" placeholder="••••••••" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required minLength={6} />
          <Button type="submit" className="w-full" disabled={loading}>{loading ? 'Creating...' : 'Register'}</Button>
        </form>
        <p className="text-center text-sm text-gray-500 mt-4">Already have an account? <Link to="/login" className="text-primary-600 font-medium hover:underline">Login</Link></p>
      </div>
    </div>
  );
}