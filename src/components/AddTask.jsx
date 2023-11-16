import { useContext, useState } from "react";
import AppContext from "../context/AppContext";

function AddTask() {
  const { tasks, setTasks } = useContext(AppContext);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    date: "",
    priority: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    setTasks([...tasks, newTask]);
    setNewTask({ title: "", description: "", date: "", priority: "" });
  };

  return (
    <div className="mx-2 w-full rounded-xl bg-gray-100 p-5 md:w-1/2">
      <h1 className="my-3 text-3xl font-bold">Add Task</h1>
      <form>
        <div className="mb-5 rounded-xl bg-gray-200 p-5">
          <label
            className="mb-2 block text-lg font-bold text-gray-700"
            htmlFor="title"
          >
            Task
          </label>
          <input
            type="text"
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
            id="title"
            placeholder="Add Title"
            name="title"
            value={newTask.title}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex w-full justify-around">
          <div className="mb-5 mr-3 w-1/2 rounded-xl bg-gray-200 p-5">
            <label
              className="mb-2 block text-lg font-bold text-gray-700"
              htmlFor="date"
            >
              Due Date
            </label>
            <input
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
              id="date"
              type="date"
              placeholder="Date"
              name="date"
              value={newTask.date}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-5 w-1/2 rounded-xl bg-gray-200 p-5">
            <label
              className="mb-2 block text-lg font-bold text-gray-700"
              htmlFor="priority"
            >
              Priority
            </label>
            <select
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
              id="priority"
              name="priority"
              value={newTask.priority}
              onChange={handleInputChange}
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>
        </div>
        <div className="mb-5 rounded-xl bg-gray-200 p-5">
          <label
            className="mb-2 block text-lg font-bold text-gray-700"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
            id="description"
            type="text"
            rows={3}
            placeholder="Add Description"
            name="description"
            value={newTask.description}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex justify-center">
          <button
            className="focus:shadow-outline flex rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
            type="button"
            onClick={handleAddTask}
          >
            <span className="material-symbols-outlined mr-2">add</span>
            <p>Add</p>
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddTask;
