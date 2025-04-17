import React,{useContext} from 'react'
import { AppContext } from '../context/AppContext';

const EditTask = () => {
    const { editingTask, setEditingTask, setTasks } = useContext(AppContext);
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
    <div>
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
    </div>
  )
}

export default EditTask
