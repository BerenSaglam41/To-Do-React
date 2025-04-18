import React, { useContext } from 'react';
import TaskCalendarView from './TaskCalendarView';
import { IoClose } from 'react-icons/io5';
import { AppContext } from '../context/AppContext';

const TaskCalendarModal = () => {
  const { showCalendar, setShowCalendar, tasks } = useContext(AppContext);

  // ❗ Modal sadece görünüyorsa return et, yoksa null döndür
  if (!showCalendar) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex justify-center items-start p-6 overflow-y-auto">
      <div className="bg-white w-full max-w-4xl rounded-lg shadow-lg relative p-6 mt-6">
        {/* ✅ Kapat butonu */}
        <button
          onClick={() => setShowCalendar(false)}
          className="absolute top-3 right-4 text-gray-600 hover:text-red-500 text-2xl"
        >
          <IoClose />
        </button>

        <h2 className="text-2xl font-bold mb-4 text-center">📅 Görev Takvimi</h2>

        <TaskCalendarView tasks={tasks} />
      </div>
    </div>
  );
};

export default TaskCalendarModal;
