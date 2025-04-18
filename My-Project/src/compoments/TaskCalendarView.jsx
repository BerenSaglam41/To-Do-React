import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const TaskCalendarView = () => {
    const {tasks} = useContext(AppContext);
    if (!tasks || tasks.length === 0) {
    return <p className="text-center text-gray-500 mt-6">Henüz görev yok.</p>;
  }

  // 1. Görevleri tarihe göre sırala
  const sortedTasks = [...tasks].sort((a, b) => new Date(a.date) - new Date(b.date));
  const getDayName = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', { weekday: 'long' }); // Türkçe gün adı
  };
  
  // 2. Grupla
  const groupedTasks = sortedTasks.reduce((acc, task) => {
    if (!acc[task.date]) acc[task.date] = [];
    acc[task.date].push(task);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      {Object.entries(groupedTasks).map(([date, tasksOnDate]) => (
        <div key={date} className="border-b pb-4">
            <h3 className="text-base font-bold text-blue-600 mb-2 border-l-4 border-blue-400 pl-2">
            📅 {date} ({getDayName(date)}) ({tasksOnDate.length} görev)
            </h3>
          <div className="space-y-2">
            {tasksOnDate.map((task) => (
              <div
                key={task.id}
                className="bg-white shadow-sm p-3 rounded-md border border-gray-100"
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium text-sm text-gray-800">{task.title}</span>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      task.completed
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-600'
                    }`}
                  >
                    {task.completed ? 'Tamamlandı' : 'Yapılacak'}
                  </span>
                </div>
                {task.description && (
                  <p className="text-xs text-gray-500">{task.description}</p>
                )}
                <p className="text-xs text-gray-400 mt-1">⏰ {task.time}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskCalendarView;
