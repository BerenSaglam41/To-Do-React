import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';

const HomePage = () => {
  const { tasks, setTasks, editingTask, setEditingTask } = useContext(AppContext);

  // Yeni görev için form state'i
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    date: '',
    time: ''
  });

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

  // Düzenleme başlat
  const handleEdit = (task) => {
    setEditingTask({ ...task }); // kopya ver ki inputlar controlled olsun
  };

  // Düzenleme sırasında input değişimi
  const handleEditChange = (field, value) => {
    setEditingTask((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Düzenlemeyi kaydet
  const handleSave = () => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === editingTask.id ? editingTask : task
      )
    );
    setEditingTask(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 font-mono">
      {/* Üst Bar */}
      <header className="bg-red-300 p-4 text-center shadow-md">
        <h1 className="text-3xl font-bold">🧠 To-Do Dashboard</h1>
      </header>

      <main className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
        {/* Sol: Görev Listesi */}
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
              <button
                onClick={() => handleEdit(task)}
                className="text-blue-500 hover:underline mt-2"
              >
                Düzenle
              </button>
            </div>
          ))}
        </section>
        {/* Orta: Yeni Görev Ekle */}
        <section className="bg-white p-6 rounded shadow w-full max-w-md mx-auto">
          <h2 className="text-xl font-semibold mb-4 text-center">➕ Yeni Görev Ekle</h2>
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

        {/* Sağ: Görev Düzenleme */}
        <section className="bg-white p-6 rounded shadow space-y-4">
          <h2 className="text-xl font-semibold">✏️ Görev Düzenle</h2>
          {editingTask ? (
            <div className="space-y-3">
              <input
                type="text"
                value={editingTask.title}
                onChange={(e) => handleEditChange("title", e.target.value)}
                className="w-full p-2 border rounded"
              />
              <textarea
                value={editingTask.description}
                onChange={(e) => handleEditChange("description", e.target.value)}
                className="w-full p-2 border rounded"
              />
              <div className="flex gap-2">
                <input
                  type="date"
                  value={editingTask.date}
                  onChange={(e) => handleEditChange("date", e.target.value)}
                  className="w-1/2 p-2 border rounded"
                />
                <input
                  type="time"
                  value={editingTask.time}
                  onChange={(e) => handleEditChange("time", e.target.value)}
                  className="w-1/2 p-2 border rounded"
                />
              </div>
              <button
                onClick={handleSave}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Kaydet
              </button>
            </div>
          ) : (
            <p className="text-gray-500">Bir görevi düzenlemek için soldan seç.</p>
          )}
        </section>
      </main>
    </div>
  );
};

export default HomePage;
