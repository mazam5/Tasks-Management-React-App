import { useState } from "react";
import AddTask from "./components/AddTask";
import TasksList from "./components/TasksList";
import AppContext from "./context/AppContext";
import { initialCompleted, initialPending } from "./data/data";

function App() {
  const [pendingTasks, setPendingTasks] = useState(initialPending);
  const [completedTasks, setCompletedTasks] = useState(initialCompleted);
  const [newTask, setNewTask] = useState({});

  return (
    <AppContext.Provider
      value={{
        pendingTasks,
        setPendingTasks,
        completedTasks,
        setCompletedTasks,
        newTask,
        setNewTask,
      }}
    >
      <h2 className="ml-5 mt-5 text-3xl font-bold max-md:mb-5">
        Tasks Management React App
      </h2>
      {pendingTasks.length === 0 && completedTasks.length === 0 ? (
        <div className="mx-auto flex items-center justify-center">
          <AddTask />
        </div>
      ) : (
        <div className="m-16 mx-auto w-4/5 max-md:m-0 max-md:w-full lg:w-4/5">
          <div className="flex flex-col-reverse justify-between md:flex-row">
            <div className="flex justify-center">
              <TasksList />
            </div>
            <div className="flex justify-center">
              <AddTask />
            </div>
          </div>
        </div>
      )}
    </AppContext.Provider>
  );
}

export default App;
