import { useContext } from "react";
import AppContext from "../context/AppContext";

import {
  materialCells,
  materialRenderers,
} from "@jsonforms/material-renderers";
import { JsonForms } from "@jsonforms/react";
import schema from "../json/schema.json";
import uischema from "../json/uischema.json";

function AddTask() {
  const { newTask, setNewTask, setPendingTasks, pendingTasks } =
    useContext(AppContext);

  const handleAddTask = (e) => {
    e.preventDefault();
    setPendingTasks([...pendingTasks, newTask]);
    setNewTask({});
  };

  return (
    <div className="mx-3 rounded-xl bg-gray-100 p-5 max-md:mx-1 max-md:w-full">
      <h2 className="my-3 text-3xl font-bold max-md:my-1">Add Task</h2>
      <JsonForms
        data={newTask}
        schema={schema}
        uischema={uischema}
        renderers={materialRenderers}
        cells={materialCells}
        onChange={({ data }) => setNewTask(data)}
      />
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
    </div>
  );
}

export default AddTask;
