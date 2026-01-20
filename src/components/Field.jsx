export default function Field({ label, children, flex = "col", className = "" }) {
  return (
    <div className={`flex flex-${flex} gap-1 ${className}`}>
      <label className="text-sm text-gray-600">{label}</label>
      {children}
    </div>
  );
}
