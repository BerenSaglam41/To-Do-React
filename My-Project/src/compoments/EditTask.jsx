import React,{useContext,useRef,useEffect} from 'react'
import { AppContext } from '../context/AppContext';

const EditTask = () => {
    const { editingTask, setEditingTask, setTasks,setErrorMessage,setSuccessMessage } = useContext(AppContext);
    const textAreaRef = useRef(null);
    const getCurrentDate = () => new Date().toISOString().slice(0, 10);
    const getCurrentTime = () => new Date().toTimeString().slice(0, 5);
    const handleEditChange = (field, value) => {
        setEditingTask((prev) => ({
          ...prev,
          [field]: value,
        }));
      };
    
      // Düzenlemeyi kaydet
      const handleSave = () => {
        if (!editingTask.title) return setErrorMessage("Başlık boş olamaz!");
        if (!editingTask.description) return setErrorMessage("Açıklama boş olamaz!");
        if (!editingTask.date) return setErrorMessage("Tarih seçilmelidir!");
        if (!editingTask.time) return setErrorMessage("Saat seçilmelidir!");
        if (new Date(editingTask.date) < new Date(getCurrentDate())) {
          return setErrorMessage("Geçmiş bir tarih seçilemez!");
        }
        if (
          editingTask.date === getCurrentDate() &&
          editingTask.time < getCurrentTime()
        ) {
          return setErrorMessage("Geçerli saat seçiniz!");
        }        setTasks((prev) =>
          prev.map((task) =>
            task.id === editingTask.id ? editingTask : task
          )
        );
        setEditingTask(null);
        setSuccessMessage("Görev başarıyla güncellendi ✅");
        setErrorMessage('');
        setTimeout(() => {
          setSuccessMessage('');
        }, 3000);
      };
      useEffect(() => {
        if (textAreaRef.current) {
          textAreaRef.current.style.height = 'auto';
          textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
        }
      });
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
                ref={textAreaRef} // 👈 buraya bağladık
                value={editingTask?.description || ""}
                onChange={(e) => handleEditChange("description", e.target.value)}
                onInput={(e) => {
                  e.target.style.height = 'auto';
                  e.target.style.height = `${e.target.scrollHeight}px`;
                }}
                className="w-full p-2 border rounded resize-none overflow-hidden transition-all duration-150"
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
