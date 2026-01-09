import { useDraggable, useDroppable } from "@dnd-kit/core"

export default function TaskCard({ task }) {
  const {
    attributes,
    listeners,
    setNodeRef: setDragRef,
    transform,
  } = useDraggable({
    id: task.id,
  })

  const {
    setNodeRef: setDropRef,
  } = useDroppable({
    id: task.id,
  })

  const style = transform
    ? { transform: `translate(${transform.x}px, ${transform.y}px)` }
    : undefined

  return (
    <div
      ref={(node) => {
        setDragRef(node)
        setDropRef(node)
      }}
      {...listeners}
      {...attributes}
      className="cursor-grab rounded-lg bg-neutral-400 p-4 shadow-sm hover:shadow-md"
      style={style}
    >
      <h3 className="text-neutral-100">{task.title}</h3>
    </div>
  )
}
