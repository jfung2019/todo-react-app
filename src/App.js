import React, { useState } from "react";

function App() {
  // Initial State
  const [tasks, setTasks] = useState([
    { id: 1, title: "item 1", status: false },
    { id: 2, title: "item 2", status: false },
    { id: 3, title: "item 3", status: false },
  ]);

  // temp state
  const [newTask, setNewTask] = useState("");
  const [updateTask, setUpdateTask] = useState("");

  function handleAddTask() {
    if (newTask) {
      let newId = tasks.length + 1;
      let newInput = { id: newId, title: newTask, status: false };
      setTasks([...tasks, newInput]);
      setNewTask("");
    }
  }

  function handleUpdateTask(id) {
    let deleteOldRecords = tasks.filter(task => task.id !== updateTask.id);
    let updatedRecords = [...deleteOldRecords, updateTask];
    setTasks(updatedRecords);
    setUpdateTask("");
    console.log("this is old record,", deleteOldRecords);
  }

  const handleIsCompleted = id => {
    let newTasks = tasks.map(task => {
      if (task.id === id) {
        return { ...task, status: !task.status };
      }
      return task;
    });
    setTasks(newTasks);
  };

  function handleDeleteTask(id) {
    // takes the specified id of the task and filter it out of the array
    let newTasks = tasks.filter(task => task.id !== id);
    setTasks(newTasks);
  }

  // handle changes on the input and store it in newTask.
  const handleChange = e => {
    setNewTask(e.target.value);
  };

  // handle changes on the input and store it in newTask.
  const handleUpdateChange = e => {
    let newData = {
      id: updateTask.id,
      title: e.target.value,
      status: updateTask.status,
    };
    setUpdateTask(newData);
  };

  // cancel update data
  const handleCancelUpdateChange = e => {
    setUpdateTask("");
  };

  return (
    <div className="bg-gray-800 min-h-screen text-black flex flex-col items-center justify-center">
      <h1 className="text-5xl font-bold -mt-[50px] text-white p-4 mb-4">Todo App</h1>
      {/* Add Task Input*/}
      {!updateTask && (
        <div>
          <div className="flex w-96">
            <input
              class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mr-2"
              placeholder="Add Todo"
              type="text"
              value={newTask}
              onChange={handleChange}
            />
            <button className="bg-blue-700 rounded-lg p-2 w-28 text-white" onClick={handleAddTask}>Add Task</button>
          </div>
        </div>
      )}

      {/* Update Task Input*/}
      {updateTask && (
        <div>
          <div className="flex space-x-2 w-96">
            <input
              class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Update Todo"
              value={updateTask && updateTask.title}
              type="text"
              onChange={handleUpdateChange}
            />
            <button className="bg-blue-700 rounded-lg p-2 text-white" onClick={handleUpdateTask}>Update</button>
            <button className="bg-green-700 rounded-lg p-2 text-white" onClick={handleCancelUpdateChange}>Cancel</button>
          </div>
        </div>
      )}

      <div className="p-4 text-white">
        {tasks && tasks.length ? (<div>"We got some things to do!"</div>) : (<div>"Add some task!"</div>)}
      </div>

      <div className="space-y-2 w-96">
        {tasks &&
          tasks
            .sort((a, b) => (a.id > b.id ? 1 : -1))
            .map((task, index) => {
              return (
                <div
                  key={task.id}
                  className="flex justify-between rounded-lg p-4 bg-green-200 hover:bg-gray-100 hover:scale-110 transition-all duration-75 ease-in">
                  <div className={task.status ? "line-through" : ""}>
                    {index + 1}: &nbsp;{task.title}
                  </div>
                  <div>{task.status}</div>
                  <div className="flex pl-2 space-x-2">
                    <button onClick={e => handleIsCompleted(task.id)}>
                      Completed?
                    </button>
                    {task.status ? null : (
                      <button
                        onClick={() =>
                          setUpdateTask({
                            id: task.id,
                            title: task.title,
                            status: task.status,
                          })
                        }>
                        Edit
                      </button>
                    )}
                    <div>
                      {/* this fires the function as it iterates */}
                      {/* <button onClick={handleDeleteTask(task.id)}>Delete</button> */}

                      {/* use this instead it only calls the function on click */}
                      <button onClick={() => handleDeleteTask(task.id)}>
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
      </div>
    </div>
  );
}

export default App;
