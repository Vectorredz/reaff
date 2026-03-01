import { DragDropProvider } from "@dnd-kit/react";
import Draggable from "./Draggable";
import Droppable from "./Droppable";
import Sortable from "./Sortable";
import { useState, useEffect } from "react";
import DisplayError from "../DisplayError";
export default function DragNDrop({
  form,
  state,
  validationUtils,
  committee,
  localStorage,
}) {
  const [available, setAvailable] = useState(
    committee.filter(
      (item) =>
        !localStorage?.organization?.preferences?.committeeRank[0]?.includes(
          item,
        ),
    ),
  );
  const [selected, setSelected] = useState(
    localStorage.organization.preferences.committeeRank[0] ?? [],
  );

  const [dragging, setDragging] = useState(null); // ← track current

  useEffect(() => {
    form.updateField({
      path: `organization.preferences.committeeRank`,
      value: selected,
      type: "array",
    });
    form.dispatch({
      type: "CHANGE",
      path: `organization.preferences.committeeRank`,
      result: validationUtils.handleState(
        "committeeRank",
        selected,
        `organization`,
      ),
    });
  }, [selected]);

  useEffect(() => {
    console.log(form.values.organization.preferences);
  }, [form.values]);

  return (
    <DragDropProvider
      onDragEnd={(e) => {
        if (e.canceled) return;
        const { target, source } = e.operation;
        setSelected((prev) =>
          !prev.includes(dragging) && target?.id === "droppable"
            ? [...prev, dragging]
            : [...prev],
        );
        console.log(source?.id, target?.id, dragging);
        setAvailable((prev) => prev.filter((item) => item !== dragging));
      }}
      onDragOver={(e) => {
        const { target, source } = e.operation;
        if (committee.includes(source?.id) && committee.includes(target?.id))
          if (
            source?.id != target?.id &&
            selected.length > 0 &&
            selected.indexOf(source?.id) >= 0 &&
            selected.indexOf(target?.id) >= 0
          ) {
            const src = selected.indexOf(source?.id);
            const dst = selected.indexOf(target?.id);
            const copySelect = [...selected];
            copySelect.splice(dst, 1, source?.id);
            copySelect.splice(src, 1, target?.id);
            setSelected(copySelect);
          } else if (source?.id != target?.id && selected.length > 0) {
            const src = selected?.indexOf(source?.id);
            const dst = selected?.indexOf(target?.id);
            console.log(src, dst);
            const copySelect = [...selected];
            // if (src === -1) {
            //   copySelect.splice(dst, 1, source?.id);
            //   copySelect.splice(dst + 1, 0, target?.id);
            setSelected(copySelect);
            // }
          }
        setSelected((prev) =>
          !prev.includes(dragging) && target?.id === "droppable"
            ? [...prev, dragging]
            : [...prev],
        );
        setAvailable((prev) => prev.filter((item) => item !== dragging));
      }}
      onDragStart={(e) => {
        setDragging(e.operation.source?.id);
      }}
    >
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-1 flex flex-col gap-1">
          {available.map((item) => {
            return <Draggable key={item} id={item} comm={item} />;
          })}
        </div>
        <Droppable id="droppable">
          {selected.map((item, index) => (
            <Sortable key={item} id={item} comm={item} index={index} />
          ))}
        </Droppable>
        <div>
          {(
            <button onClick={(e) => {
                e.preventDefault()
                window.location.reload()
                }} className="btn-primary">
              Save rankings
            </button>
          )}
        </div>
        <DisplayError
          id={"committeeRank"}
          state={state}
          State={validationUtils.State}
        ></DisplayError>
      </div>
    </DragDropProvider>
  );
}
