import { createContext,useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import Tasks from '../assets/Tasks.json'

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  // State'leri burada tanımlayabilirsin
  const navigate = useNavigate()
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [showSortMenu,setShowSortMenu] = useState(false);
  const [newTask, setNewTask] = useState({
      title: "",
      description: "",
      date: "",
      time: "",
      completed : false
  });

  const resetTasks = async () => {
      setTasks([...Tasks]); 
      localStorage.removeItem("tasks"); 
  }

  const fetchTasks = async () => {
    if(tasks.length === 0 ){
      setTasks((prev)=>([...prev,...Tasks]));
    }
  }
  useEffect(()=> {
    const storedTasks = localStorage.getItem("tasks");
    if(storedTasks){
      setTasks(JSON.parse(storedTasks));
    }
    else{
      fetchTasks();
    }
  },[]);
  useEffect(()=>{
    localStorage.setItem("tasks",JSON.stringify(tasks));
  },[tasks]);
  const value = {
    navigate,
    tasks,setTasks,
    editingTask,setEditingTask,
    newTask,setNewTask,
    resetTasks,
    showSortMenu,setShowSortMenu,
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};
