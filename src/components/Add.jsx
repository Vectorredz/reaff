export default function Add({ handler, placeholder, ref, list, handleChange=null }) {
  return (
    <div className="flex items-center gap-2">
      <input
        name="addText"
        type="text"
        className="text-field flex-1"
        ref={ref}
        placeholder={placeholder}
        onChange={handleChange}
      />

      <button
        onClick={(e) => handler(e, list, ref)}
        className="btn-outline px-4 text-sm"
      >
        Add
      </button>
    </div>
  );
}
