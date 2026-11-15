export default function Input({ label, error, ...props }) {
  return (
    <div className="mb-4">
      {label && <label className="block text-sm font-medium mb-1 text-gray-700">{label}</label>}
      <input className={`input-field ${error ? 'border-red-500' : ''}`} {...props} />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}