import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";

function Index() {
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

  const addTodo = async () => {
    if (!todoTitle.trim()) {
      toast.error("Please enter a task before adding.");
      return;
    }

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

  const changeIsComplete = async (id) => {
    const todo = userTodos.find((t) => t._id === id);
    const updatedTodo = { id: todo._id, isComplete: !todo.isComplete };

    const response = await fetch("/api/todos", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTodo),
    });

    if (response.ok) {
      toast.success("Todo updated!");
      getTodos();
    } else {
      console.error("Failed to update todo");
    }
  };

  return (
    <>
      <div className="alert">
        <div>
          <h1>Next-Todos</h1> Please add a task !
        </div>
        <Link className="btn" href="/">
          Home
        </Link>
      </div>

      <div className="container">
        <ToastContainer />
        <div className="wrapper">
          <div className="form-container">
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
            <div>Todo List</div>
          </div>
          <div className="pad">
            <div id="todo">
              <ul id="tasksContainer">
                {userTodos.length > 0 ? (
                  userTodos.map((todo) => (
                    <li key={todo._id} className="task">
                      <span className="mark">
                        <input
                          type="checkbox"
                          className="checkbox"
                          checked={todo.isComplete}
                          value={todo.isComplete}
                          onChange={() => changeIsComplete(todo._id)}
                        />
                      </span>
                      <div className="list">
                        <p>{todo.title}</p>
                      </div>
                      <span
                        className="delete btn"
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

export default Index;
