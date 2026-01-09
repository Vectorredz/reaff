import TaskCard from './Task.jsx'
import { useDroppable } from '@dnd-kit/core'
export function Column( {column,  tasks}) {
    const { setNodeRef } = useDroppable( {
        id: column.id,
    })
    return (
        <div className="flex w-80 flex-col rounded-lg bg-neutral-700 p-4">
            <h2 className='mb-4 font-semibold text-neutral-100'>{column.title}</h2>
            
            <div ref={setNodeRef} className='flex flex-1 flex-col gap-4'>
                {column.order.map((index) => {
                    return <TaskCard task={tasks[index]}></TaskCard>
                })}
            </div>
        </div>

    )
}