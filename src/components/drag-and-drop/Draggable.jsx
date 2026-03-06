import { useDraggable } from "@dnd-kit/react";
import { RestrictToElement } from "@dnd-kit/dom/modifiers";

export default function Draggable({ id, comm }) {
  const { handleRef, ref } = useDraggable({
    id: id,
    // modifiers: [RestrictToElement.configure({ element: document.body })],
  });

  return (
    <button type="button" className='draggable' ref={ref}>
      {comm}
    </button>
  );
}
