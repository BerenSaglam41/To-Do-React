import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext';
const Missinons = () => {
    const {tasks,setEditingTask,setTasks,resetTasks} = useContext(AppContext);

    const handleEdit = (task) => {
        setEditingTask({ ...task }); // kopya ver ki inputlar controlled olsun
    };
    const handleDelete = (task) => {
    setTasks((prev) => prev.filter((t) => t.id !== task.id));
    }
    const getTaskStatus = (dateStr) => {
      const today = new Date();
      const taskDate = new Date(dateStr);
      const diffTime = taskDate.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      if (diffDays < 0) return "Tarih geçti";
      if (diffDays <= 2) return "Tarihi yaklaşıyor";
      return null;
    }

  return (
    <div>
        <section className="space-y-4">
          <div className='flex justify-between'>
            <h2 className="text-xl font-semibold">📝 Görevler</h2>
            <button className='px-4 py-2 rounded-full bg-blue-200 hover:bg-blue-400 active:bg-white text-white transition duration-100' onClick={()=>resetTasks()}>Reset Tasks</button>
          </div>
          {tasks.length === 0 && (
            <p className="text-gray-500">Henüz görev yok.</p>
          )}
          {tasks.map((task) => (
            <div key={task.id} className="bg-white p-4 rounded shadow">
              <div className='flex justify-between'>
                <h3 className="font-bold text-lg">{task.title}</h3>
                <p
                  className={
                    getTaskStatus(task.date) === "Tarih geçti"
                      ? "text-white font-semibold font-bold bg-red-950 px-2 py-2 rounded-full "
                      : getTaskStatus(task.date) === "Tarihi yaklaşıyor"
                      ? "text-white py-2 font-semibold bg-red-500 rounded-full px-2"
                      : ""
                  }
                >
                  {getTaskStatus(task.date)}
                </p>
              </div>
              <p className="text-gray-600">{task.description}</p>
              <div className="text-sm text-gray-500 mt-1">
                📅 {task.date} ⏰ {task.time}
              </div>
              <div className='flex justify-between'>
                <button
                  onClick={() => handleEdit(task)}
                  className={
                    getTaskStatus(task.date) === "Tarih geçti" ?
                    "text-black-500 hover:underline mt-2 pointer-events-none" : 
                    "text-blue-500 hover:underline mt-2"
                  }
                >
                  Düzenle
                </button> 
                <button 
                  onClick={()=>handleDelete(task)}
                  className="text-red-500 hover:underline mt-2 ml-2"
                >
                  Sil
                </button>
              </div>
            </div>
          ))}
        </section>
    </div>
  )
}

export default Missinons
