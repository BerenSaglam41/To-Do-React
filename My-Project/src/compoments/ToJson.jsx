import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const ToJson = () => {
  const { tasks } = useContext(AppContext);

  const handleDownloadJSON = () => {
    const dataStr = JSON.stringify(tasks, null, 2); // okunabilir biçimde

    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `gorevler-${new Date().toLocaleDateString('tr-TR')}.json`;
    link.click();
    URL.revokeObjectURL(url); // Belleği temizle
  };

  return (
    <div>
      <button
        onClick={handleDownloadJSON}
        className="bg-green-500 px-4 py-2 text-white rounded hover:bg-green-700"
      >
        JSON Olarak İndir!
      </button>
    </div>
  );
};

export default ToJson;
