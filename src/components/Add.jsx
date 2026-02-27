export default function Add({
  handler,
  placeholder,
  ref,
  list,
  handleChange = null,
}) {
  return (
    <div className="flex items-center gap-2">
      <input
        name="addText"
        type="text"
        className="text-field flex-1"
        ref={ref}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault(); // stop form submit
            handler(e, list, ref);
          }
        }}
        placeholder={placeholder}
        onChange={handleChange}
      />

      <button
        type="button"
        onClick={(e) => handler(e, list, ref)}
        className="btn-outline px-4 text-sm"
      >
        Add
      </button>
    </div>
  );
}
