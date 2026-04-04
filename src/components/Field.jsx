export default function Field({ keys, label, children, flex = "col", className = "" }) {
  return (
    <div key={keys} className={`flex flex-${flex} gap-1 ${className}`}>
      <label className="field-text">{label}</label>
      {children}
    </div>
  );
}
