import {useDroppable} from '@dnd-kit/react';

export default function Droppable({id, children}) {
  const {ref} = useDroppable({
    id,
  });

  return (
    <div ref={ref} className='droppable'>
        
      <div className='flex flex-col gap-2'>{children}</div>
    </div>
  );
}