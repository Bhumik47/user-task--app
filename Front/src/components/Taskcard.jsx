import { useState } from "react";
import Trash from "../icons/Trash";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";


const Taskcard = ({ task, deleteTask, updateTaskDescription }) => {
  const [mouseIsOver, setMouseIsOver] = useState(false);

  const [editMode, setEditMode] = useState(false);
    const [taskName, setTaskName] = useState(task.description);
    
    const {
      setNodeRef,
      attributes,
      listeners,
      transform,
      transition,
      isDragging,
    } = useSortable({
      id: task.id,
      data: {
        type: "Task",
        task,
      },
      disabled: editMode,
    });

    const style = {
      transition,
      transform: CSS.Translate.toString(transform),
    };

    if (isDragging) {
        return (
          <div
            ref={setNodeRef}
            style={style}
            className="
            bg-mainBackgroundColor opacity-30
    p-2.5 h-[100px] min-h-[100px] item-center flex text-left rounded-xl border-2 border-rose-500 cursor-grab relative"
          ></div>
        );
    }

  const toggleEditMode = () => {
    setEditMode((prev) => !prev);
    setMouseIsOver(false);
    setTaskName(task.description);
  };

  if (editMode) {
    return (
        <div ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
        className="bg-mainBackgroundColor
    p-2.5 h-[100px] min-h-[100px] item-center flex text-left rounded-xl hover:ring-2 hover:ring-inset
    hover:ring-rose-500 cursor-grab relative"
      >
        <textarea
          className="h-[90%] w-full resize-none border-none rounded bg-transparent text-black
            focus:outline-none"
          value={taskName}
          autoFocus
          placeholder="Task description here"
          onBlur={toggleEditMode}
          onChange={(e) => setTaskName(e.target.value)}
          onKeyDown={(e) => {
              if (e.key === "Enter" && e.shiftKey) {
                  updateTaskDescription(task.id, taskName);
                  setEditMode(false);
              }
}}
        ></textarea>
      </div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={toggleEditMode}
      onMouseEnter={() => setMouseIsOver(true)}
      onMouseLeave={() => setMouseIsOver(false)}
      className="bg-mainBackgroundColor
    p-2.5 h-[100px] min-h-[100px] item-center flex text-left rounded-xl hover:ring-2 hover:ring-inset
    hover:ring-rose-500 cursor-grab relative task"
    >
      <p className="my-auto h-[90%] text-black w-full overflow-y-auto overflow-x-hidden whitespace-pre-wrap">
        {" "}
        {taskName}
      </p>
      {mouseIsOver && (
        <button
          onClick={() => deleteTask(task.id)}
          className="stroke-white absolute right-2 top-1/2 -translate-y-1/2 bg-columnBackgroundColor p-2 rounded
          opacity-60 hover:opacity-100"
        >
          <Trash />
        </button>
      )}
    </div>
  );
};

export default Taskcard;
