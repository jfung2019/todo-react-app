import React, { useState } from "react";

function App() {
  // Initial State
  const [tasks, setTasks] = useState([]);

  // temp state
  const [newTask, setNewTask] = useState("");
  const [updateTask, setUpdateTask] = useState("");

  function handleAddTask(e) {
    e.preventDefault();
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

  // handle changes on the input and store it in updateTask temporarily.
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
    <div className="bg-[#3c335b] min-h-screen text-black flex flex-col items-center pb-10">
      <h1 className="text-5xl font-bold text-[#e7bb87] p-4 mt-[80px] mb-10">
        Todo List App
      </h1>
      {/* Add Task Input*/}
      {!updateTask && (
        <div>
          <form className="flex w-96">
            <input
              className="bg-gray-50 border border-gray-300 text-[#3c335b] rounded-lg block w-96 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-[#e7bb87] dark:text-[#e7bb87] mr-2"
              placeholder="Add Todo"
              type="text"
              value={newTask}
              onChange={handleChange}
            />
            <button
              className="bg-[#e7bb87] hover:bg-[#da8d36] rounded-lg p-2 w-28 text-[#3c335b]"
              onClick={handleAddTask}
              type="submit">
              Add Task
            </button>
          </form>
        </div>
      )}

      {/* Update Task Input*/}
      {updateTask && (
        <div>
          <form className="flex space-x-2 w-96">
            <input
              class="bg-gray-50 border border-gray-300 dark:placeholder-[#e7bb87] dark:text-[#e7bb87] rounded-lg block w-96 p-2.5 dark:bg-gray-700 dark:border-gray-600"
              placeholder="Update Todo"
              value={updateTask && updateTask.title}
              type="text"
              onChange={handleUpdateChange}
            />
            <button
              className="bg-[#e7bb87] rounded-lg p-2 text-[#3c335b]"
              onClick={handleUpdateTask}
              type="submit">
              Update
            </button>
            <button
              className="bg-[#f4aaa0] rounded-lg p-2 text-[#3c335b]"
              onClick={handleCancelUpdateChange}>
              Cancel
            </button>
          </form>
        </div>
      )}

      <div className="p-4 text-white">
        {tasks && tasks.length ? (
          <div className="animate-pulse text-[#e7bb87] font-bold">
            You have {tasks.length} {tasks.length > 1 ? "tasks" : "task"} for
            today!
          </div>
        ) : (
          <div className="animate-bounce text-[#e7bb87] font-bold">
            Add some task!
          </div>
        )}
      </div>

      <div className="space-y-2 w-96">
        {tasks &&
          tasks
            .sort((a, b) => (a.id > b.id ? 1 : -1))
            .map((task, index) => {
              return (
                <div
                  key={task.id}
                  className="flex justify-between rounded-lg p-4 odd:bg-[#e7bb87] even:bg-[#a0c6eb] hover:[#041a5565] hover:scale-110 transition-all duration-75 ease-in text-[#3c335b]">
                  <div className={task.status ? "line-through" : ""}>
                    {index + 1}: &nbsp;{task.title}
                  </div>
                  <div>{task.status}</div>
                  <div className="flex pl-2 space-x-2">
                    <button onClick={e => handleIsCompleted(task.id)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6 hover:text-white hover:fill-[#383156]">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 019 9v.375M10.125 2.25A3.375 3.375 0 0113.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 013.375 3.375M9 15l2.25 2.25L15 12"
                        />
                      </svg>
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
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-6 h-6 hover:text-white hover:fill-[#383156]">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                          />
                        </svg>
                      </button>
                    )}
                    <div>
                      {/* this fires the function as it iterates */}
                      {/* <button onClick={handleDeleteTask(task.id)}>Delete</button> */}

                      {/* use this instead it only calls the function on click */}
                      <button
                        className="mt-1"
                        onClick={() => handleDeleteTask(task.id)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-6 h-6 hover:text-white hover:fill-[#383156]">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                          />
                        </svg>
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
