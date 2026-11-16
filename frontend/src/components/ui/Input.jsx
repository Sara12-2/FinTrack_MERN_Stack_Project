import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export default function Input({ 
  label, 
  error, 
  icon: Icon, 
  type = 'text',
  className = '', 
  ...props 
}) {
  const [showPassword, setShowPassword] = useState(false);

  // Password field ke liye type toggle
  const inputType = type === 'password' && showPassword ? 'text' : type;

  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-medium mb-1.5 text-gray-700">
          {label}
        </label>
      )}
      
      <div className="relative">
        {/* Left Icon (Agar diya gaya ho) */}
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon size={18} className="text-gray-400" />
          </div>
        )}

        <input 
          type={inputType}
          className={`w-full px-4 py-2.5 bg-white border rounded-lg transition-all outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 
            ${Icon ? 'pl-10' : ''} 
            ${type === 'password' ? 'pr-10' : ''} 
            ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'border-gray-300'} 
            ${className}`} 
          {...props} 
        />

        {/* Password Visibility Toggle */}
        {type === 'password' && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
          <span className="w-1 h-1 bg-red-500 rounded-full"></span>
          {error}
        </p>
      )}
    </div>
  );
}