export default function Field({ label, children, flex = "col", className = "" }) {
  return (
    <div className={`flex flex-${flex} gap-1 ${className}`}>
      <label className="field-text">{label}</label>
      {children}
    </div>
  );
}
