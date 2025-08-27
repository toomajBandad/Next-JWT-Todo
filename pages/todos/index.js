import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";

function index() {
  const [isShowInput, setIsShowInput] = useState(false);
  const [todoTitle, setTodoTitle] = useState("");
  const [userTodos, setUserTodos] = useState([]);

  useEffect(() => {
    getTodos();
  }, []);
  const getTodos = async () => {
    try {
      const response = await fetch("/api/todos");
      if (response.ok) {
        const data = await response.json();
        setUserTodos(data.data);
      } else {
        console.error("Failed to fetch todos");
      }
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const removeTodo = async (id) => {
    const response = await fetch("/api/todos", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
      }),
    });

    if (response.ok) {
      toast.success("Todo removed successfully!");
      getTodos();
    } else {
      console.error("Failed to remove todo");
    }
  };

  const signOut = async () => {};

  const addTodo = async () => {
    const response = await fetch("/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: todoTitle,
        desc: "",
        isComplete: false,
      }),
    });

    if (response.ok) {
      setTodoTitle("");
      toast.success("Todo added successfully!");
      getTodos();
    } else {
      console.error("Failed to add todo");
    }
  };

  return (
    <>
      <h1>Next-Todos</h1>

      <div className="alert">
        <p> Please add a task !</p>
      </div>

      <div className="container">
        <ToastContainer />
        <div className="wrapper">
          <div
            className="form-container"
            style={{ display: `${isShowInput ? "block" : "none"}` }}
          >
            <div className="add-form">
              <input
                id="input"
                type="text"
                placeholder="Type your To-Do works..."
                value={todoTitle}
                onChange={(e) => setTodoTitle(e.target.value)}
              />
              <button
                className="btn"
                type="submit"
                id="submit"
                onClick={() => addTodo()}
              >
                ADD
              </button>
            </div>
          </div>
          <div className="head">
            <div className="add" onClick={() => setIsShowInput(true)}>
              <svg
                width="2rem"
                height="2rem"
                viewBox="0 0 16 16"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
                />
                <path
                  fillRule="evenodd"
                  d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
                />
              </svg>
            </div>
            <div className="time">Logout</div>
          </div>
          <div className="pad">
            <div id="todo">
              <ul id="tasksContainer">
                {userTodos.length > 0 ? (
                  userTodos.map((todo) => (
                    <li key={todo._id} className="task">
                      <span className="mark">
                        <input type="checkbox" className="checkbox" />
                      </span>
                      <div className="list">
                        <p>{todo.title}</p>
                      </div>
                      <span
                        className="delete"
                        onClick={() => removeTodo(todo._id)}
                      >
                        <FaTrash />
                      </span>
                    </li>
                  ))
                ) : (
                  <p>No todos available</p>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default index;
