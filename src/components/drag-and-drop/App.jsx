import { useState } from 'react'
import { Column } from './Column'
import { DndContext } from '@dnd-kit/core'
import {
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import SortableItem from './SortableItem';

const ITEMS = [
    {id: 0, rank: undefined, status: 'UNRANKED', committee: 'education', title: 'Education'},
    {id: 1, rank: undefined, status: 'UNRANKED', committee: 'finance', title: 'Finance'},
    {id: 2, rank: undefined, status: 'UNRANKED', committee: 'logistics', title: 'Logistics'},
    {id: 3, rank: undefined, status: 'UNRANKED', committee: 'marketing', title: 'Marketing'},
    {id: 4, rank: undefined, status: 'UNRANKED', committee: 'membership', title: 'Membership'},
    {id: 5, rank: undefined, status: 'UNRANKED', committee: 'pubrel', title: 'Public Relations'},
    {id: 6, rank: undefined, status: 'UNRANKED', committee: 'publicity', title: 'Publicity'},
    {id: 7, rank: undefined, status: 'UNRANKED', committee: 'records', title: 'Records'},
    {id: 8, rank: undefined, status: 'UNRANKED', committee: 'operations', title: 'Operations'},
]

// brute force

const COLUMNS = [
    {id: 'UNRANKED', title: 'Items to rank', order: [0,1,2,3,4,5,6,7,8]},
    {id: 'RANKED', title: 'Most preferred committee', order: []}
]

export default function App() {
  const [items, setItems] = useState(['1', '2', '3']);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <DndContext 
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext 
        items={items}
        strategy={verticalListSortingStrategy}
      >
        {items.map(id => <SortableItem key={id} id={id} />)}
      </SortableContext>
    </DndContext>
  );
  
  function handleDragEnd(event) {
    const {active, over} = event;
    
    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);
        
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }
}