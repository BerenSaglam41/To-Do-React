import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const Header = () => {
  const {setShowCalendar,darkMode,setDarkMode} = useContext(AppContext);
  return (
    <div className={`flex justify-between items-center px-6 py-4 shadow ${darkMode ? "bg-gray-400" : "bg-pink-300  "}`}>
      <h1 className="text-2xl font-bold">🧠 To-Do Dashboard</h1>
      <div className='flex'>
        <button
          onClick={() => setDarkMode(prev => !prev)}
          className={ darkMode ?
            "bg-yellow-300 text-purple-800 px-3 py-1 text-sm rounded-full hover:bg-yellow-200 transition mr-2"
            :
            "bg-gray-400 text-purple-800 px-3 py-1 text-sm rounded-full hover:bg-gray-200 transition mr-2"
          }
        >
          {darkMode ? "☀️" : "🌑"}
          </button>
        |
        <button
          onClick={() => setShowCalendar(true)}
          className="ml-2 bg-purple-100 text-purple-800 px-3 py-1 text-sm rounded-full hover:bg-purple-200 transition"
        >
          📅 Takvimi Göster
      </button>
      </div>
    </div>
  );
};

export default Header;
