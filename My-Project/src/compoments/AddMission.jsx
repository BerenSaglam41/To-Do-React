import React, { useContext, useEffect } from 'react';
import { AppContext } from '../context/AppContext';

const AddMission = () => {
  const { setTasks, setNewTask, newTask,errorMessage,setErrorMessage,successMessage,setSuccessMessage,darkMode  } = useContext(AppContext);

  const getCurrentDate = () => new Date().toISOString().slice(0, 10);

  const getCurrentTime = () => new Date().toTimeString().slice(0, 5);

  useEffect(() => {
    setNewTask({
      title: '',
      description: '',
      date: getCurrentDate(),
      time: getCurrentTime(),
    });
  }, []);

  const handleAddTask = () => {
    if (!newTask.title) return setErrorMessage("Başlık boş olamaz!");
    if (!newTask.description) return setErrorMessage("Açıklama boş olamaz!");
    if (!newTask.date) return setErrorMessage("Tarih seçilmelidir!");
    if (!newTask.time) return setErrorMessage("Saat seçilmelidir!");
    if (new Date(newTask.date) < new Date(getCurrentDate())) {
      return setErrorMessage("Geçmiş bir tarih seçilemez!");
    }
    if (
      newTask.date === getCurrentDate() &&
      newTask.time < getCurrentTime()
    ) {
      return setErrorMessage("Geçerli saat seçiniz!");
    }
        const task = {
      ...newTask,
      id: Date.now(),
      completed: false
    };
    setTasks((prev) => [...prev, task]);
    // Görev eklendiyse hata mesajını sil
    setErrorMessage('');
    setSuccessMessage('Görev başarıyla oluşturuldu ✅');

    // ✅ 3 saniye sonra otomatik kaybolsun
    setTimeout(() => setSuccessMessage(''), 3000);
    setNewTask({
      title: '',
      description: '',
      date: getCurrentDate(),
      time: getCurrentTime(),
    });
  };
  

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-center">➕ Yeni Görev Ekle</h2>
      {errorMessage && (
        <p className="text-center mx-auto my-4 font-semibold px-2 py-3 bg-red-500 text-white rounded-2xl w-sm">
          {errorMessage}
        </p>
      )}
      {!errorMessage && successMessage && (
        <p className="text-center mx-auto my-4 font-semibold px-2 py-3 bg-green-500 text-white rounded-2xl w-sm">
          {successMessage}
        </p>
      )}
      <section className={`p-6 rounded shadow w-full max-w-md mx-auto ${darkMode ? "bg-gray-400" : "bg-white"}`}>
        <input
          type="text"
          placeholder="Başlık"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          className={`w-full p-2 border rounded mb-3 ${darkMode ? "border-black text-black" : ""}`}
        />
        <textarea
          placeholder="Açıklama"
          value={newTask.description}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
          onInput={(e) => {
            e.target.style.height = 'auto'; // önce sıfırla
            e.target.style.height = `${e.target.scrollHeight}px`; // içeriğe göre ayarla
          }}
          rows={1}
          className={`w-full p-2 border rounded mb-3 resize-none overflow-hidden transition-all duration-150 ${darkMode ? "border-black text-black" : ""}`}
        />
        <div className="flex gap-2 mb-3">
          <input
            type="date"
            value={newTask.date}
            onChange={(e) => setNewTask({ ...newTask, date: e.target.value })}
            className={`w-1/2 p-2 border rounded ${darkMode ? "text-black" : ""}`}
          />
          <input
            type="time"
            value={newTask.time}
            onChange={(e) => setNewTask({ ...newTask, time: e.target.value })}
            className={`w-1/2 p-2 border rounded ${darkMode ? "text-black" : ""}`}
          />
        </div>
        <button
          onClick={handleAddTask}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition active:bg-white/20"
        >
          Görevi Ekle
        </button>
      </section>
    </div>
  );
};

export default AddMission;
