import { useContext, useState } from "react";
import AppContext from "../context/AppContext";

function TasksList() {
  const { tasks, setTasks } = useContext(AppContext);
  const [search, setSearch] = useState("");
  const [completedTasks, setCompletedTasks] = useState([]);

  const handleDeleteTask = (index) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    tasks.filter((task) => task.title.includes(search));
  };

  const handleCompleteTask = (index) => {
    setCompletedTasks([...completedTasks, tasks[index]]);
  };

  return (
    <div className="mx-2 w-full rounded-xl bg-gray-100 p-5 md:w-1/2">
      <div className="flex items-center justify-between">
        <h2 className="w-2/3 text-3xl font-bold">Tasks List</h2>
        <input
          type="text"
          className="my-3 w-full rounded-xl p-2"
          placeholder="Search"
          value={search}
          onChange={handleSearchChange}
        />
      </div>
      <h2 className="mt-5 text-xl font-bold">
        Pending{" "}
        <span className="text-gray-500">
          {tasks.filter((task) => task.completed).length}
        </span>
      </h2>
      <ul className="divide-y divide-gray-200">
        {tasks.map((task, index) => (
          <li
            key={index}
            className="my-3 flex justify-between rounded-xl bg-gray-200 p-4"
          >
            <input type="checkbox" onClick={() => handleCompleteTask(index)} />
            <div className="ml-3">
              <h2 className="my-2 text-xl font-bold">{task.title}</h2>
              <div className="flex justify-between">
                <div className="mx-5 flex w-full items-center justify-between">
                  <span className="material-symbols-outlined">schedule</span>
                  <p className="ml-2 text-gray-500">{task.date}</p>
                </div>
                <div
                  className={`flex items-center justify-between rounded-xl p-2 text-white ${
                    task.priority === "high"
                      ? "bg-red-500 "
                      : task.priority === `medium`
                        ? "bg-yellow-500"
                        : "bg-blue-500"
                  }`}
                >
                  <span className="material-symbols-outlined mx-2">flag</span>
                  <p>{task.priority}</p>
                </div>
              </div>
              <p>
                <span className="text-gray-500">{task.description}</span>
              </p>
            </div>
            <button onClick={() => handleDeleteTask(index)}>
              <span className="material-symbols-outlined">delete</span>
            </button>
          </li>
        ))}
      </ul>
      <h2 className="mt-5 text-xl font-bold">
        Completed:{" "}
        <span className="text-gray-500">
          {completedTasks.filter((task) => task).length}
        </span>
      </h2>
      {completedTasks.map((task, index) => (
        <li
          key={index}
          className="my-3 flex justify-between rounded-xl bg-gray-200 p-4"
        >
          <div className="ml-3">
            <h2 className="my-2 text-xl font-bold">{task.title}</h2>
            <div className="flex justify-between">
              <div className="mx-5 flex w-full items-center justify-between">
                <span className="material-symbols-outlined">schedule</span>
                <p className="ml-2 text-gray-500">{task.date}</p>
              </div>
              <div
                className={`flex items-center justify-between rounded-xl p-2 text-white ${
                  task.priority === "high"
                    ? "bg-red-500 "
                    : task.priority === `medium`
                      ? "bg-yellow-500"
                      : "bg-blue-500"
                }`}
              >
                <span className="material-symbols-outlined mx-2">flag</span>
                <p>{task.priority}</p>
              </div>
            </div>
            <p>
              <span className="text-gray-500">{task.description}</span>
            </p>
          </div>
          <button onClick={() => handleDeleteTask(index)}>
            <span className="material-symbols-outlined">delete</span>
          </button>
        </li>
      ))}
    </div>
  );
}

export default TasksList;
