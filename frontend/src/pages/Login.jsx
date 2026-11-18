import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { Mail, Lock, ArrowRight } from 'lucide-react';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(form.email, form.password);
      toast.success('Welcome back to FinTrack!');
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed. Please try again.');
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
            <h2 className="text-3xl font-bold text-slate-800 tracking-tight">Welcome back</h2>
            <p className="text-slate-500 mt-2 text-sm font-medium">Please enter your details to sign in.</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <Input 
              label="Email address" 
              type="email" 
              icon={Mail}
              placeholder="you@example.com" 
              value={form.email} 
              onChange={(e) => setForm({ ...form, email: e.target.value })} 
              required 
            />
            
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-sm font-semibold text-slate-700">Password</label>
                <a href="#" className="text-xs font-semibold text-primary-600 hover:text-primary-700">Forgot password?</a>
              </div>
              <Input 
                type="password" 
                icon={Lock}
                placeholder="••••••••" 
                value={form.password} 
                onChange={(e) => setForm({ ...form, password: e.target.value })} 
                required 
              />
            </div>

            <Button 
              type="submit" 
              className="w-full" 
              size="lg"
              isLoading={loading}
            >
              Sign In <ArrowRight size={18} className="ml-2" />
            </Button>
          </form>

          {/* Footer Link */}
          <p className="text-center text-sm text-slate-500 font-medium">
            Don't have an account?{' '}
            <Link to="/register" className="text-primary-600 font-bold hover:text-primary-700 transition-colors">
              Create an account
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side - Visual/Testimonial (Hidden on mobile) */}
      <div className="hidden lg:flex flex-1 bg-slate-50 relative overflow-hidden items-center justify-center p-12">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900 to-slate-900"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        
        <div className="relative z-10 max-w-lg text-center">
          <h2 className="text-4xl font-bold text-white mb-6 leading-tight">
            Take control of your <br />
            <span className="text-primary-400">financial future.</span>
          </h2>
          <p className="text-slate-300 text-lg mb-8">
            Track expenses, manage budgets, and get AI-powered insights to save more money every month.
          </p>
          <div className="flex justify-center gap-4">
            <div className="flex -space-x-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full bg-slate-700 border-2 border-slate-900 flex items-center justify-center text-xs text-white">
                  U{i}
                </div>
              ))}
            </div>
            <p className="text-sm text-slate-400 flex items-center">Join 10,000+ users</p>
          </div>
        </div>
      </div>

    </div>
  );
}