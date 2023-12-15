import { useEffect, useMemo, useState } from "react";
import Plusicon from "../icons/plusicon";
import ListService from "../services/list.service";
import ListContainer from "./ListContainer";
import toast from "react-hot-toast";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import TaskService from "../services/task.service";
import Taskcard from "./Taskcard";

function KanbanBoard() {
  const [lists, setLists] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [activeList, setActiveList] = useState(null);
  const [activeTask, setActiveTask] = useState(null);
  const listsId = useMemo(() => lists.map((list) => list.id), [lists]);

  const createNewList = async () => {
    const name = `List ${lists.length + 1}`;
    const res = await ListService.createList(name);
    setLists([...lists, res.list]);
  };

  const deleteList = async (id) => {
    const res = await ListService.deletedList(id);
    const filterdList = lists.filter((L) => L.id !== id);
    setLists(filterdList);
    const newTasks = tasks.filter(t => t.list_id != id);
    setTasks(newTasks);
    toast.success(res.message);
  };

  const updateListName = async (id, name) => {
    const res = await ListService.updateListName(id, name);
    const newLists = lists.map((list) => {
      if (list.id !== id) return list;
      return { ...list, name };
    });
    setLists(newLists);
    toast.success(res.message);
  };

  useEffect(() => {
    ListService.getAllList().then((res) => {
      setLists(res.lists);
    });
  }, []);

  useEffect(() => {
    TaskService.getAllTask(listsId).then((res) => {
      setTasks(res.tasks);
    });
  }, [listsId]);

  const createTask = async (list_id) => {
    const description = `task ${tasks.length + 1}`;
    const res = await TaskService.addTask(list_id, description);
    setTasks([...tasks, res.task]);
    toast.success(res.message);
  };

  const deleteTask = async (id) => {
    const res = await TaskService.deletedTask(id);
    const newTask = tasks.filter((task) => task.id !== id);
    setTasks(newTask);
    toast.success(res.message);
  };

  const updateTaskDescription = async (id, description) => {
    const res = await TaskService.updateTaskDescription(id, description);
    const newTask = tasks.map((task) => {
      if (task.id !== id) return task;
      return { ...task, description };
    });
    setTasks(newTask);
    toast.success(res.message);
  };

  const onDragStart = (event) => {
    console.log(event);
    if (event.active.data.current?.type === "List") {
      setActiveList(event.active.data.current.list);
      return;
    }

    if (event.active.data.current?.type === "Task") {
      setActiveTask(event.active.data.current.task);
      return;
    }
  };

  const onDragEnd = (event) => {
    setActiveList(null);
    setActiveTask(null);
    const { active, over } = event;
    if (!over) return;
    const activeListId = active.id;
    const overListId = over.id;
    if (activeListId === overListId) return;
    setLists((lists) => {
      const activeListIndex = lists.findIndex(
        (list) => list.id === activeListId
      );

      const overListIndex = lists.findIndex((list) => list.id === overListId);

      return arrayMove(lists, activeListIndex, overListIndex);
    });
  };

  const onDragOver = (event) => {
    const { active, over } = event;
    if (!over) return;
    const activeId = active.id;
    const overId = over.id;
    if (activeId === overId) return;

        const isActiveATask = active.data.current?.type === "Task";
    const isOverATask = over.data.current?.type === "Task";
    
    if (!isActiveATask) return;

    // I am dropping a task over another task


    
    if (isActiveATask && isOverATask) {
      setTasks(tasks => {
        const activeIndex = tasks.findIndex(t => t.id === activeId);
        const overIndex = tasks.findIndex(t => t.id === overId);

        tasks[activeIndex].list_id = tasks[overIndex].list_id;
        return arrayMove(tasks, activeIndex, overIndex);
      })
    }

    const isOverAList = over.data.current?.type === "List";
    

    // i am droping a task over another list

    if (isActiveATask && isOverAList) {
       setTasks((tasks) => {
         const activeIndex = tasks.findIndex((t) => t.id === activeId);

         tasks[activeIndex].list_id = overId;
         return arrayMove(tasks, activeIndex, activeIndex);
       });
    }

  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3,
      },
    })
  );

  return (
    <div
      className="m-auto
    flex
    min-h-screen
    w-full
    item-center
    overflow-x-auto
    overflow-y-hidden
    px-[400]
    rounded-lg"
    >
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
      >
        <div className="m-auto flex gap-4">
          <div className="flex gap-4">
            <SortableContext items={listsId}>
              {lists.map((list) => (
                <ListContainer
                  key={list.id}
                  list={list}
                  deleteList={deleteList}
                  updateListName={updateListName}
                  createTask={createTask}
                  deleteTask={deleteTask}
                  updateTaskDescription={updateTaskDescription}
                  tasks={tasks.filter((task) => task.list_id === list.id)}
                />
              ))}
            </SortableContext>
          </div>
          <button
            onClick={() => createNewList()}
            className="h-[60px]
      w-[350px]
      min-w-[350px]
      cursor-pointer
      rounded-lg
      bg-mainBackgroundColor
      border-2
      border-columnBackgroundColor
      p-4
      gray-900
      hover:text-rose-600
      flex
      gap-2
      text-black"
          >
            <Plusicon />
            Create New List
          </button>
        </div>
        {createPortal(
          <DragOverlay>
            {activeList && (
              <ListContainer
                list={activeList}
                deleteList={deleteList}
                updateListName={updateListName}
                createTask={createTask}
                deleteTask={deleteTask}
                updateTaskDescription={updateTaskDescription}
                tasks={tasks.filter((task) => task.list_id === activeList.id)}
              />
            )}
            {activeTask && (
              <Taskcard
                task={activeTask}
                deleteTask={deleteTask}
                updateTaskDescription={updateTaskDescription}
              />
            )}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </div>
  );
}

export default KanbanBoard;
