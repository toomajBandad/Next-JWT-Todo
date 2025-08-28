import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import connectToDB from "@/configs/db";
import UserModel from "@/models/User";
import { verifyToken } from "@/utils/auth";
import TodoModel from "@/models/Todo";

function Index({ user, todos }) {
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
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-yellow-100 px-6 py-10 w-full">
      <ToastContainer />
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-xl p-8 space-y-8 animate-fade-in">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-amber-600">
            📝 {user.firstname} {user.lastname} Todos List
          </h1>
          <Link
            href="/"
            className="text-sm text-amber-500 hover:underline font-medium"
          >
            Home
          </Link>
        </div>
        <p className="text-gray-600 text-2xl">Please add a task {user.firstname}!</p>

        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Type your To-Do works..."
            value={todoTitle}
            onChange={(e) => setTodoTitle(e.target.value)}
            className="flex-grow px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
          <button
            onClick={addTodo}
            className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-4 py-2 rounded-md transition"
          >
            ADD
          </button>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            📋 Todo List
          </h2>
          <ul className="space-y-4">
            {userTodos.length > 0 ? (
              userTodos.map((todo) => (
                <li
                  key={todo._id}
                  className="flex items-center justify-between bg-gray-50 p-4 rounded-md shadow-sm hover:shadow-md transition"
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={todo.isComplete}
                      onChange={() => changeIsComplete(todo._id)}
                      className="h-5 w-5 text-amber-500 focus:ring-amber-400 border-gray-300 rounded"
                    />
                    <p
                      className={`text-gray-700 ${
                        todo.isComplete ? "line-through" : ""
                      }`}
                    >
                      {todo.title}
                    </p>
                  </div>
                  <button
                    onClick={() => removeTodo(todo._id)}
                    className="text-red-500 hover:text-red-600 transition"
                  >
                    <FaTrash />
                  </button>
                </li>
              ))
            ) : (
              <p className="text-gray-500">No todos available</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { token } = context.req.cookies;
  connectToDB();

  if (!token) {
    return {
      redirect: {
        destination: "/signin",
      },
    };
  }

  const tokenPayload = verifyToken(token);

  if (!tokenPayload) {
    return {
      redirect: {
        destination: "/signin",
      },
    };
  }

  const user = await UserModel.findOne(
    {
      email: tokenPayload.email,
    },
    "-_id firstname lastname"
  );

  const todos = await TodoModel.find({
    user: user._id,
  });

  return {
    props: {
      user: JSON.parse(JSON.stringify(user)),
      todos: JSON.parse(JSON.stringify(todos)),
    },
  };
}

export default Index;
