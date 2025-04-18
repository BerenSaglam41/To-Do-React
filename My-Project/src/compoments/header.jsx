import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const Header = () => {
  const {resetTasks} = useContext(AppContext);
  return (
    <div>
      <header className="bg-red-300 p-4 text-center shadow-md">
        <button onClick={()=>resetTasks()}>Reset Tasks</button>
        <h1 className="text-3xl font-bold">🧠 To-Do Dashboard</h1>
      </header>
    </div>
  );
};

export default Header;
