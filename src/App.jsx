import { useState } from "react";
import AddTask from "./components/AddTask";
import TasksList from "./components/AllTasks";
import AppContext from "./context/AppContext";

function App() {
  const [tasks, setTasks] = useState([]);

  return (
    <AppContext.Provider value={{ tasks, setTasks }}>
      <div className="container m-4 mx-auto w-full items-center md:m-8 md:w-4/5">
        <div className="container flex flex-col justify-between md:flex-row">
          <TasksList />
          <AddTask />
        </div>
      </div>
    </AppContext.Provider>
  );
}

export default App;
