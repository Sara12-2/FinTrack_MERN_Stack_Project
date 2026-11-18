import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { Mail, Lock, User, ArrowRight, CheckCircle2 } from 'lucide-react';

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
      toast.success('Account created successfully!');
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white">
      
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          
          {/* Logo & Heading */}
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-50 text-primary-600 mb-6 shadow-sm">
              <span className="text-3xl">💰</span>
            </div>
            <h2 className="text-3xl font-bold text-slate-800 tracking-tight">Create an account</h2>
            <p className="text-slate-500 mt-2 text-sm font-medium">Start your journey to better finances today.</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input 
              label="Full Name" 
              icon={User}
              placeholder="John Doe" 
              value={form.name} 
              onChange={(e) => setForm({ ...form, name: e.target.value })} 
              required 
            />
            <Input 
              label="Email address" 
              type="email" 
              icon={Mail}
              placeholder="you@example.com" 
              value={form.email} 
              onChange={(e) => setForm({ ...form, email: e.target.value })} 
              required 
            />
            <Input 
              label="Password" 
              type="password" 
              icon={Lock}
              placeholder="••••••••" 
              value={form.password} 
              onChange={(e) => setForm({ ...form, password: e.target.value })} 
              required 
              minLength={6} 
            />

            <Button 
              type="submit" 
              className="w-full mt-2" 
              size="lg"
              isLoading={loading}
            >
              Create Account <ArrowRight size={18} className="ml-2" />
            </Button>
          </form>

          {/* Footer Link */}
          <p className="text-center text-sm text-slate-500 font-medium">
            Already have an account?{' '}
            <Link to="/login" className="text-primary-600 font-bold hover:text-primary-700 transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side - Visual/Benefits (Hidden on mobile) */}
      <div className="hidden lg:flex flex-1 bg-slate-50 relative overflow-hidden items-center justify-center p-12">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900 to-slate-900"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        
        <div className="relative z-10 max-w-lg">
          <h2 className="text-3xl font-bold text-white mb-8 leading-tight">
            Why choose <span className="text-primary-400">FinTrack?</span>
          </h2>
          
          <ul className="space-y-6">
            {[
              "Track all your expenses in one place",
              "Set monthly budgets and stick to them",
              "Get AI-powered spending insights",
              "Manage recurring subscriptions easily"
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className="mt-1 bg-primary-500/20 p-1 rounded-full">
                  <CheckCircle2 size={18} className="text-primary-400" />
                </div>
                <span className="text-slate-200 text-lg">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

    </div>
  );
}