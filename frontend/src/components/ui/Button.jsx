export default function Button({ children, variant = 'primary', className = '', ...props }) {
  const styles = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    danger: 'bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition',
  };
  return (
    <button className={`${styles[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}