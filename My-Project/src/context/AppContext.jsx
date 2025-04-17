import { createContext,useState } from "react";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  // State'leri burada tanımlayabilirsin
    const navigate = useNavigate()
    const [tasks, setTasks] = useState([]);
    const [editingTask, setEditingTask] = useState(null);
  // navigate ve fonksiyonlar burada olabilir

  const value = {
    navigate,
    tasks,setTasks,
    editingTask,setEditingTask,
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};
