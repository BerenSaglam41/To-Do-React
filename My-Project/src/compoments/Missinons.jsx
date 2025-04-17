import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext';
const Missinons = () => {
    const {tasks,setEditingTask,setTasks} = useContext(AppContext);

    const handleEdit = (task) => {
        setEditingTask({ ...task }); // kopya ver ki inputlar controlled olsun
    };
    const handleDelete = (task) => {
    setTasks((prev) => prev.filter((t) => t.id !== task.id));
    }
  return (
    <div>
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">📝 Görevler</h2>
          {tasks.length === 0 && (
            <p className="text-gray-500">Henüz görev yok.</p>
          )}
          {tasks.map((task) => (
            <div key={task.id} className="bg-white p-4 rounded shadow">
              <h3 className="font-bold text-lg">{task.title}</h3>
              <p className="text-gray-600">{task.description}</p>
              <div className="text-sm text-gray-500 mt-1">
                📅 {task.date} ⏰ {task.time}
              </div>
              <div className='flex justify-between'>
                <button
                  onClick={() => handleEdit(task)}
                  className="text-blue-500 hover:underline mt-2"
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
