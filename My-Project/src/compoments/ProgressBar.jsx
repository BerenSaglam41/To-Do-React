import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const ProgressBar = () => {
    const {tasks} = useContext(AppContext);
  if (!tasks || tasks.length === 0) return null;

  const total = tasks.length;
  const completed = tasks.filter((task) => task.completed).length;
  const percent = Math.round((completed / total) * 100);

  return (
    <div className="w-full max-w-md mx-auto my-4 bg-white px-2 py-3 rounded">
      <div className="flex justify-between mb-1 text-sm font-medium text-gray-700">
        <span>Görev Tamamlanma ({completed}/{tasks.length})</span>
        <span>{percent}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-4">
        <div
          className="bg-green-500 h-4 rounded-full transition-all duration-300 ease-in-out"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
