export default function DisplayError({id, name=null, state, State}) {
  return (
    name ? state[id][name].status === State.ERROR && (
      <span className="text-xs text-red-500">{state[id][name].error}</span>
    ) : state[id].status === State.ERROR && (
      <span className="text-xs text-red-500">{state[id].error}</span>
    )
  );
}
