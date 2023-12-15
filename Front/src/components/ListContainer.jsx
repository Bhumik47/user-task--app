import React, { useMemo, useState } from "react";
import Trash from "../icons/Trash";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Plusicon from "../icons/plusicon";
import Taskcard from "./Taskcard";

const ListContainer = ({
  list,
  deleteList,
  updateListName,
  createTask,
  tasks,
  deleteTask,
  updateTaskDescription,
}) => {
  const [editMode, setEditMode] = useState(false);
  const [listName, SetListName] = useState(list.name);

  const tasksids = useMemo(() => {
    return tasks.map((task) => task.id);
  }, [tasks]);

  const toggleEditMode = () => {
    setEditMode((prev) => !prev);
    SetListName(list.name);
  };

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: list.id,
    data: {
      type: "List",
      list,
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
    bg-columnBackgroundColor
    opacity-40
    border-2
    border-rose-500
    w-[350px]
    h-[500px]
    max-h-[500px]
    rounded-mg
    flex
    flex-col"
      ></div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="
    bg-columnBackgroundColor
    w-[350px]
    h-[500px]
    max-h-[500px]
    rounded-md
    flex
    flex-col"
    >
      <div
        onClick={() => setEditMode(true)}
        {...attributes}
        {...listeners}
        className="
      bg-mainBackgroundColor
      text-md
      text-black
      h-[60px]
      cursor-grab
      rounded-md
      rounded-b-none
      p-3
      font-bold
      border-columnBackgroundColor
      border-4
      flex
      item-center
      justify-between"
      >
        <div className="flex gap-2">
          <div
            className="flex
          justify-center
          item-center
          bg-columnBackgroundColor
          px-2
          py-1
          text-sm
          rounded-full
          "
          >
            0
          </div>
          {!editMode && listName}
          {editMode && (
            <input
              className="bg-mainBackgroundColor rounded outline-none w-60"
              value={listName}
              onChange={(e) => SetListName(e.target.value)}
              autoFocus
              onBlur={toggleEditMode}
              onKeyDown={(e) => {
                if (e.key !== "Enter") return;
                updateListName(list.id, listName);
                setEditMode(false);
              }}
            />
          )}
        </div>
        <button
          onClick={() => deleteList(list.id)}
          className="
              stroke-gray-500
              hover:stroke-black
              hover:bg-columnBackgroundColor
              rounded
              px-2
              py-1"
        >
          <Trash />
        </button>
      </div>

      {/* tasks */} 
      <div className="flex flex-grow flex-col bg-gray-800 gap-4 p-2 overflow-x-hidden overflow-y-auto">
        <SortableContext items={tasksids}>
          {tasks.map((task) => (
            <Taskcard
              key={task.id}
              task={task}
              deleteTask={deleteTask}
              updateTaskDescription={updateTaskDescription}
            />
          ))}
        </SortableContext>
      </div>
      <button
        className="flex gap-2 items-center border-columnBackgroundColor
      border-2 rounded-md p-4
      border-x-columnBackgroundColor
      hover:bg-mainBackgroundColor
      hover:text-rose-500
      active:bg-black"
        onClick={() => createTask(list.id)}
      >
        <Plusicon />
        Add Task
      </button>
    </div>
  );
};

export default ListContainer;
