import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const Header = () => {
  const {setShowCalendar} = useContext(AppContext);
  return (
    <div className="flex justify-between items-center px-6 py-4 bg-pink-300 shadow">
      <h1 className="text-2xl font-bold">🧠 To-Do Dashboard</h1>

      <button
        onClick={() => setShowCalendar(true)}
        className="bg-purple-100 text-purple-800 px-3 py-1 text-sm rounded-full hover:bg-purple-200 transition"
      >
        📅 Takvimi Göster
      </button>
    </div>
  );
};

export default Header;
