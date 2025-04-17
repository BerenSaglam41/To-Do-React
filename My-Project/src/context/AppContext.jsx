import { createContext,useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import Tasks from '../assets/Tasks.json'

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  // State'leri burada tanımlayabilirsin
  const navigate = useNavigate()
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [newTask, setNewTask] = useState({
      title: "",
      description: "",
      date: "",
      time: "",
  });

  const fetchTasks = async () => {
    if(tasks.length === 0 ){
      setTasks((prev)=>([...prev,...Tasks]));
    }
  }
  useEffect(()=> {
    fetchTasks();
  },[]);
  const value = {
    navigate,
    tasks,setTasks,
    editingTask,setEditingTask,
    newTask,setNewTask,
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};
