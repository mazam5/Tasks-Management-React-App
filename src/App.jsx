import AppContext from "./context/Context";
import AddTask from "./components/AddTask";
import TasksList from "./components/TasksList";
import { useState } from "react";

function App() {
  const [tasks, setTasks] = useState([
    {
      id: "",
      title: "",
      date: "",
      description: "",
      priority: "",
    },
  ]);
  return (
    <AppContext.Provider value={{ tasks, setTasks }}>
      <AddTask />
      <TasksList />
    </AppContext.Provider>
  );
}

export default App;
