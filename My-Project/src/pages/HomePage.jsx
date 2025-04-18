import React from 'react';
import Header from '../compoments/header';
import Missinons from '../compoments/Missinons';
import AddMission from '../compoments/AddMission';
import EditTask from '../compoments/EditTask';
import ProgressBar from '../compoments/ProgressBar';
import TaskCalendarModal from '../compoments/TaskCalendarModal';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-100 font-mono">
      {/* Üst Bar */}
      <Header/>
      <main className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
        {/* Sol: Görev Listesi */}
        <Missinons/>
        {/* Orta: Yeni Görev Ekle */}
        <div>
          <AddMission/>
          <ProgressBar/>
           <TaskCalendarModal/>
        </div>
        {/* Sağ: Görev Düzenleme */}
        <EditTask/>
      </main>
    </div>
  );
};

export default HomePage;
