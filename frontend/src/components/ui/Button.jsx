import { Loader2 } from 'lucide-react';

export default function Button({ 
  children, 
  variant = 'primary', 
  size = 'md',
  isLoading = false,
  className = '', 
  disabled,
  ...props 
}) {
  
  // Variants (Colors)
  const variants = {
    primary: 'bg-primary-600 hover:bg-primary-700 text-white shadow-sm shadow-primary-500/20',
    secondary: 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 shadow-sm',
    danger: 'bg-red-600 hover:bg-red-700 text-white shadow-sm shadow-red-500/20',
    ghost: 'hover:bg-gray-100 text-gray-600',
  };

  // Sizes (Padding & Text size)
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  // Base classes jo hamesha rahenge
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  return (
    <button 
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`} 
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
      {children}
    </button>
  );
}