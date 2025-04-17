import React from 'react'
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const AddMission = () => {
    const { setTasks,setNewTask,newTask } = useContext(AppContext);
    // Görev ekleme
    const handleAddTask = () => {
    if (!newTask.title) return alert("Başlık boş olamaz!");
    const task = {
      ...newTask,
      id: Date.now(),
    };
    setTasks((prev) => [...prev, task]);
    setNewTask({ title: '', description: '', date: '', time: '' });
  };
  return (
    <div>
        <h2 className="text-xl font-semibold mb-4 text-center">➕ Yeni Görev Ekle</h2>
        <section className="bg-white p-6 rounded shadow w-full max-w-md mx-auto">
          <input
            type="text"
            placeholder="Başlık"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            className="w-full p-2 border rounded mb-3"
          />
          <textarea
            placeholder="Açıklama"
            value={newTask.description}
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            className="w-full p-2 border rounded mb-3"
          />
          <div className="flex gap-2 mb-3">
            <input
              type="date"
              value={newTask.date}
              onChange={(e) => setNewTask({ ...newTask, date: e.target.value })}
              className="w-1/2 p-2 border rounded"
            />
            <input
              type="time"
              value={newTask.time}
              onChange={(e) => setNewTask({ ...newTask, time: e.target.value })}
              className="w-1/2 p-2 border rounded"
            />
          </div>
          <button
            onClick={handleAddTask}
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
          >
            Görevi Ekle
          </button>
        </section>
    </div>
  )
}

export default AddMission
