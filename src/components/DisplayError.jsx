// DisplayError.jsx
export default function DisplayError({ id, state, State }) {
  const field = state?.[id];
  if (field?.status === State.VALID || field?.status === State.EMPTY ||  field?.status === State.SUCCESS) {
    return null;
  }
  return (
    <p className="text-red-500 text-xs mt-1">
      {field?.error ?? field?.["choices"]?.error}
    </p>
  );
}
