import { Card } from "@mui/material";
import { useContext, useEffect } from "react";
import AppContext from "../context/AppContext";

function TasksList() {
  const {
    pendingTasks,
    setPendingTasks,
    setCompletedTasks,
    completedTasks,
    filter1,
    setFilter1,
    filter2,
    setFilter2,
    search,
    setSearch,
  } = useContext(AppContext);

  const handleCompleteTask = (index) => {
    const newTasks = [...pendingTasks];
    setCompletedTasks([...completedTasks, newTasks[index]]);
    newTasks.splice(index, 1);
    setPendingTasks(newTasks);
  };

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

  useEffect(() => {
    setFilter1(pendingTasks);
    setFilter2(completedTasks);
  }, [pendingTasks, completedTasks, setFilter1, setFilter2]);

  useEffect(() => {
    const debounceFilter = setTimeout(() => {
      const filteredResult1 = filter1.filter((item) => {
        const { title, description } = item;
        const lowerSearch = search.toLowerCase().trim();
        return (
          title.toLowerCase().includes(lowerSearch) ||
          description.toLowerCase().includes(lowerSearch)
        );
      });
      setFilter1(filteredResult1);
      const filteredResult2 = filter2.filter((item) => {
        const { title, description } = item;
        const lowerSearch = search.toLowerCase().trim();
        return (
          title.toLowerCase().includes(lowerSearch) ||
          description.toLowerCase().includes(lowerSearch)
        );
      });
      setFilter2(filteredResult2);
    }, 300);

    return () => clearTimeout(debounceFilter);
  }, [filter1, filter2, search, setFilter1, setFilter2]);

  return (
    <div className="rounded-xl bg-gray-100 p-5 max-md:mx-1 max-md:my-5 max-md:w-full">
      <div className="items-center justify-between md:flex">
        <h2 className="text-3xl font-bold">Tasks List</h2>
        <div className="flex items-center justify-between">
          <button
            onClick={() => {
              setSearch("");
              setFilter1(pendingTasks);
              setFilter2(completedTasks);
            }}
            className="mx-2 rounded-full p-2 hover:bg-gray-200 hover:text-red-500"
          >
            <span className="material-symbols-outlined">restart_alt</span>
          </button>

          <input
            type="text"
            className="my-3 mr-5 w-full rounded-xl p-2"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      {filter1.length > 0 && (
        <div>
          <h2 className="mt-5 text-xl font-bold">
            Pending{" "}
            <span className="rounded-full bg-gray-300 px-4 py-2 text-gray-500">
              {filter1.filter((task) => !task.completed).length}
            </span>
          </h2>
          <div className="grid grid-cols-2 max-md:grid-cols-1">
            {filter1.map((task, index) => (
              <Card
                key={index}
                className="mx-2 my-4 flex max-h-full justify-between gap-3 rounded-xl bg-gray-200 p-2"
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
                <button
                  onClick={() => handleDeleteTask(index, "pending")}
                  className="md:mr-10 md:pr-14"
                >
                  <span className="material-symbols-outlined rounded-full p-2 hover:bg-gray-200 hover:text-red-500">
                    delete
                  </span>
                </button>
              </Card>
            ))}
          </div>
        </div>
      )}
      {filter2.length > 0 && (
        <div>
          <h2 className="mt-5 text-xl font-bold">
            Completed{" "}
            <span className="rounded-full bg-gray-300 px-4 py-2 text-gray-500">
              {filter2.filter((task) => task).length}
            </span>
          </h2>
          <div className="grid grid-cols-2 max-md:grid-cols-1">
            {filter2.map((task, index) => (
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
