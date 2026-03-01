import { useSortable } from "@dnd-kit/react/sortable";

export default function Sortable({ id, index, comm }) {
  const { ref } = useSortable({
    id,
    index,
    transition: {
      duration: 250,
      easing: "cubic-bezier(0.25, 1, 0.5, 1)",
      idle: false,
    },
  });
  return (
    <div className="">
      <li ref={ref} className="flex items-center list-none sortable">
        <span
          className="flex flex-col items-center justify-center
                       w-5 h-5 text-sm font-semibold
                       rounded-full bg-blue-500 text-white"
        >
          {index + 1}
        </span>
        {comm}
      </li>
    </div>
  );
}

// export default function App() {
//   const items = [1, 2, 3, 4];

//   return (
//     <ul className="list">
//       {items.map((id, index) =>
//         <Sortable key={id} id={id} index={index} />
//       )}
//     </ul>
//   );
// }
