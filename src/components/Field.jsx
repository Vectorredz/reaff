export default function Field({ label, children, className = "" }) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <label className="text-sm text-gray-600">{label}</label>
      {children}
    </div>
  );
}
