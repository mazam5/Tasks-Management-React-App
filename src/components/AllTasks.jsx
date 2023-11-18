import { Card } from "@mui/material";
import { useContext } from "react";
import AppContext from "../context/AppContext";

function TasksList() {
  const { pendingTasks, setPendingTasks, setCompletedTasks, completedTasks } =
    useContext(AppContext);

  const handleDeleteTask = (index, task) => {
    if (task === "pending") {
      const newTasks = [...pendingTasks];
      newTasks.splice(index, 1);
      setPendingTasks(newTasks);
    } else {
      const newTasks = [...completedTasks];
      newTasks.splice(index, 1);
      setCompletedTasks(newTasks);
    }
  };

  const handleCompleteTask = (index) => {
    const newTasks = [...pendingTasks];
    setCompletedTasks([...completedTasks, newTasks[index]]);
    newTasks.splice(index, 1);
    setPendingTasks(newTasks);
  };

  return (
    <div className="rounded-xl bg-gray-100 p-5 max-md:mx-1 max-md:my-5 max-md:w-full">
      <div className="items-center justify-between md:flex">
        <h2 className="text-3xl font-bold">Tasks List</h2>
        <div className="flex items-center justify-between">
          <input
            type="text"
            className="my-3 mr-5 w-full rounded-xl p-2"
            placeholder="Search"
          />
          <select className="my-3 w-2/3 rounded-xl p-2">
            <option value="">Select</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
      </div>
      {pendingTasks.length > 0 && (
        <div>
          <h2 className="mt-5 text-xl font-bold">
            Pending{" "}
            <span className="rounded-full bg-gray-300 px-4 py-2 text-gray-500">
              {pendingTasks.filter((task) => !task.completed).length}
            </span>
          </h2>
          <div className="grid grid-cols-2 max-md:grid-cols-1">
            {pendingTasks.map((task, index) => (
              <Card
                key={index}
                className="mx-2 my-4 flex justify-between gap-3 rounded-xl bg-gray-200 p-2"
              >
                <input
                  type="checkbox"
                  className="mr-3 hover:bg-red-500"
                  checked={task.completed}
                  onChange={() => handleCompleteTask(index)}
                />
                <div>
                  <h2 className="my-2 text-xl font-bold">{task.title}</h2>
                  <div className="flex justify-around max-md:flex-col">
                    <div
                      className={`mx-2 flex h-10 w-36 items-center justify-center rounded-xl p-2 text-white ${
                        task.priority === "High"
                          ? "bg-red-400"
                          : task.priority === "Medium"
                            ? "bg-yellow-500"
                            : "bg-blue-500"
                      }`}
                    >
                      <span className="material-symbols-outlined mr-2">
                        flag
                      </span>
                      <p>{task.priority}</p>
                    </div>
                    <div className="mx-2 flex h-10 w-36 items-center justify-center rounded-xl bg-green-500 p-2 max-md:mt-2">
                      <span className="material-symbols-outlined text-white">
                        schedule
                      </span>
                      <p className="ml-2 text-white">{task.dueDate}</p>
                    </div>
                  </div>
                  <p className="mt-3 text-gray-500">{task.description}</p>
                </div>
                <button onClick={() => handleDeleteTask(index, "pending")}>
                  <span className="material-symbols-outlined rounded-full p-2 hover:bg-gray-200 hover:text-red-500">
                    delete
                  </span>
                </button>
              </Card>
            ))}
          </div>
        </div>
      )}
      {completedTasks.length > 0 && (
        <div>
          <h2 className="mt-5 text-xl font-bold">
            Completed{" "}
            <span className="rounded-full bg-gray-300 px-4 py-2 text-gray-500">
              {completedTasks.filter((task) => task).length}
            </span>
          </h2>
          <div className="grid grid-cols-2 max-md:grid-cols-1">
            {completedTasks.map((task, index) => (
              <Card
                key={index}
                className="mx-2 my-4 flex justify-between gap-3 rounded-xl bg-gray-200 p-3"
              >
                <div className="ml-3">
                  <h2 className="my-2 text-xl font-bold">
                    <del>{task.title}</del>
                  </h2>
                  <div className="flex justify-around max-md:flex-col">
                    <div
                      className={`mx-2 flex h-10 w-36 items-center justify-center rounded-xl p-2 text-white ${
                        task.priority === "High"
                          ? "bg-red-300"
                          : task.priority === "Medium"
                            ? "bg-yellow-300"
                            : "bg-blue-300"
                      }`}
                    >
                      <span className="material-symbols-outlined mr-2">
                        flag
                      </span>
                      <p>{task.priority}</p>
                    </div>
                    <div className="mx-2 flex h-10 w-36 items-center justify-center rounded-xl bg-green-300 p-2 max-md:mt-2">
                      <span className="material-symbols-outlined text-white">
                        schedule
                      </span>
                      <p className="ml-2 text-white">{task.dueDate}</p>
                    </div>
                  </div>
                  <p className="mt-3 text-gray-500">{task.description}</p>
                </div>
                <button onClick={() => handleDeleteTask(index, "completed")}>
                  <span className="material-symbols-outlined rounded-full p-2 hover:bg-gray-200 hover:text-red-500">
                    delete
                  </span>
                </button>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default TasksList;
