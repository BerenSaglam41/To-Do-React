import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import SortMenu from './SortMenu';
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const Missinons = () => {
  const {
    tasks,
    setEditingTask,
    setTasks,
    resetTasks,
    setShowSortMenu,
    showSortMenu,
    setSuccessMessage,
    darkMode
  } = useContext(AppContext);

  const [hideCompleted, setHideCompleted] = useState(false);
  const visibleTasks = hideCompleted ? tasks.filter(task => !task.completed) : tasks;

  const handleEdit = (task) => {
    setEditingTask({ ...task });
  };

  const handleDelete = (task) => {
    setTasks((prev) => prev.filter((t) => t.id !== task.id));
    setSuccessMessage("Görev Başarıyla Silindi!");
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const getTaskStatus = (dateStr) => {
    const today = new Date();
    const taskDate = new Date(dateStr);
    const diffTime = taskDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays < 0) return "Tarih geçti";
    if (diffDays <= 2) return "Tarihi yaklaşıyor";
    return null;
  };

  const handleComplete = (task) => {
    setTasks((prevTasks) =>
      prevTasks.map((t) =>
        t.id === task.id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const toggleSortMenu = () => {
    setShowSortMenu((prev) => !prev);
  };

  const handleSort = (criterion) => {
    const sorted = [...tasks];

    switch (criterion) {
      case "title":
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "date":
        sorted.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      case "completed":
        sorted.sort((a, b) => Number(a.completed) - Number(b.completed));
        break;
      default:
        break;
    }

    setTasks(sorted);
    setShowSortMenu(false);
  };

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const updatedTasks = Array.from(tasks);
    const [movedItem] = updatedTasks.splice(result.source.index, 1);
    updatedTasks.splice(result.destination.index, 0, movedItem);
    setTasks(updatedTasks);
  };

  return (
    <div>
      <section className="space-y-4">
        <div className='flex justify-between'>
          <h2 className="text-xl font-semibold">📝 Görevler</h2>
          <button
            onClick={() => setHideCompleted(prev => !prev)}
            className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium transition duration-150
              ${hideCompleted
                ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                : "bg-gray-100 text-gray-800 hover:bg-gray-200"}`}
          >
            {hideCompleted ? "✅ Tamamlanmayanları Göster" : "🙈 Tamamlananları Gizle"}
          </button>
          <div className='inline-block'>
            <button className='px-4 py-2 rounded-full bg-green-200 hover:bg-green-400 active:bg-white text-white transition duration-100' onClick={() => toggleSortMenu()}>Sort</button>
            |
            <div className='absolute'>
              {showSortMenu && (
                <SortMenu onSort={handleSort} />
              )}
            </div>
            <button className='px-4 py-2 rounded-full bg-blue-200 hover:bg-blue-400 active:bg-white text-white transition duration-100' onClick={() => resetTasks()}>Reset Tasks</button>
          </div>
        </div>

        {tasks.length === 0 && (
          <p className="text-gray-500">Henüz görev yok.</p>
        )}
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="tasks">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {visibleTasks.map((task, index) => (
                  <Draggable key={task.id.toString()} draggableId={task.id.toString()} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`p-4 rounded shadow break-words whitespace-normal mb-2 ${darkMode ? "bg-gray-400" : ""}`}
                      >
                        <div className='flex justify-between'>
                          <div className="flex justify-between items-center">
                            <h3 className="font-bold text-lg text-gray-800">{task.title}</h3>
                            <span
                              className={`text-sm font-medium px-3 py-1 rounded-full ml-2 
                              ${task.completed ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}
                            >
                              {task.completed ? "Tamamlandı!" : "Tamamlanmadı!"}
                            </span>
                          </div>
                          <p
                            className={
                              getTaskStatus(task.date) === "Tarih geçti"
                                ? "text-white font-semibold font-bold bg-red-950 px-2 py-2 rounded-full text-xs "
                                : getTaskStatus(task.date) === "Tarihi yaklaşıyor"
                                  ? "text-white py-2 font-semibold bg-red-500 rounded-full text-xs px-2"
                                  : ""
                            }
                          >
                            {getTaskStatus(task.date)}
                          </p>
                        </div>
                        <p className="text-gray-600 break-words whitespace-normal">{task.description}</p>
                        <div className="text-sm text-gray-500 mt-1">
                          📅 {task.date} ⏰ {task.time}
                        </div>
                        <div className='flex justify-between mt-3'>
                          <button onClick={() => handleComplete(task)} className={task.completed ?
                            "bg-red-500 text-xs rounded-full text-white hover:bg-red-600 active:bg-white transition duration-100" :
                            "bg-green-500 text-xs rounded-full text-white px-1 active:bg-white transition duration-100"}>
                            {task.completed ? "Yapılmadı Olarak İşaretle" : "Yapıldı Olarak İşaretle"}
                          </button>
                          <div>
                            <button
                              onClick={() => handleEdit(task)}
                              className={
                                getTaskStatus(task.date) === "Tarih geçti" ?
                                  "text-black-500 hover:underline mt-2 pointer-events-none mx-2" :
                                  "text-blue-500 hover:underline mt-2 mx-2"
                              }
                            >
                              Düzenle
                            </button>
                            |
                            <button
                              onClick={() => handleDelete(task)}
                              className="text-red-500 hover:underline mt-2 ml-2"
                            >
                              Sil
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </section>
    </div>
  );
};

export default Missinons;
