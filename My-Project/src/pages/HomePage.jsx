import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext';

const HomePage = () => {
  return (
<div className="min-h-screen bg-gray-100 font-mono">
  {/* Üst Bar */}
  <header className="bg-red-300 p-4 text-center shadow-md">
    <h1 className="text-3xl font-bold">🧠 To-Do Dashboard</h1>
  </header>
  {/* Ana İçerik */}
  <main className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
    {/* Sol Sütun: Görev Kartları */}
    <section className="space-y-4">
      <h2 className="text-xl font-semibold">📝 Görevler</h2>
      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-bold">React Öğren</h3>
        <p className="text-sm text-gray-500">⚡ 2 gün kaldı</p>
        <button className="text-red-500 hover:underline mt-2">Sil</button>
      </div>
    </section>
    {/* Orta Sütun: Görev Ekleme */}
    <section className="bg-white p-6 rounded shadow mx-auto w-full max-w-md">
      <h2 className="text-xl font-semibold mb-4 text-center">➕ Yeni Görev Ekle</h2>
      <input
        type="text"
        placeholder="Görev başlığı..."
        className="w-full p-2 border rounded mb-3"
      />
      <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition">
        Görevi Ekle
      </button>
    </section>
    {/* Sağ Sütun: Opsiyonel Alan */}
    <section className="space-y-4">
      <h2 className="text-xl font-semibold">⚙️ Düzenlemeler</h2>
      <div className="bg-white p-4 rounded shadow">
        <p className="text-sm text-gray-600">İpuçları, filtreleme, kullanıcı bilgisi ya da hava durumu gibi şeyler ekleyebilirsin.</p>
      </div>
    </section>
  </main>
</div>

  )
}

export default HomePage
