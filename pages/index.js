import React from "react";

function Index() {
  return (
<div className="min-h-screen bg-gradient-to-br from-amber-50 to-yellow-100 px-6 py-12 w-full">
  <main className="max-w-4xl mx-auto bg-white shadow-xl rounded-xl p-10 space-y-8 animate-fade-in">
    <h1 className="text-4xl font-extrabold text-amber-600 text-center">📝 Next.js Todo App</h1>
    <p className="text-gray-700 text-lg">
      A full-stack Todo application built with <span className="font-semibold text-gray-900">Next.js</span>, featuring secure user authentication using <span className="font-semibold text-gray-900">JWT</span> and <span className="font-semibold text-gray-900">bcrypt</span>. Users can register, log in, and manage their personal todo list—adding, deleting, and marking tasks as complete.
    </p>

    <section>
      <h2 className="text-2xl font-bold text-amber-500">🚀 Features</h2>
      <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
        <li>Secure registration and login using bcrypt for password hashing</li>
        <li>JWT-based session management across the app</li>
      </ul>
    </section>

    <section>
      <h3 className="text-xl font-semibold text-amber-500">📋 Personalized Todo List</h3>
      <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
        <li>View todos specific to the logged-in user</li>
        <li>Add new todos</li>
        <li>Delete existing todos</li>
        <li>Toggle todo status (complete/incomplete)</li>
      </ul>
    </section>

    <section>
      <h3 className="text-xl font-semibold text-amber-500">⚙️ API Routes</h3>
      <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
        <li>Modular Next.js API endpoints for authentication and todo operations</li>
        <li>Middleware for token verification and protected routes</li>
      </ul>
    </section>

    <section>
      <h2 className="text-2xl font-bold text-amber-500">🛠️ Tech Stack</h2>
      <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
        <li><strong>Frontend:</strong> Next.js (React)</li>
        <li><strong>Backend:</strong> Next.js API Routes</li>
        <li><strong>Authentication:</strong> bcrypt, JWT</li>
        <li><strong>Database:</strong> MongoDB, PostgreSQL (your choice)</li>
        <li><strong>Styling:</strong> Tailwind CSS, CSS Modules</li>
      </ul>
    </section>

    <section>
      <h2 className="text-2xl font-bold text-amber-500">📦 Installation</h2>
      <div className="bg-gray-100 rounded-md p-4 text-sm font-mono text-gray-800">
        <p>git clone https://github.com/your-username/nextjs-todo-app.git</p>
        <p>cd nextjs-todo-app</p>
        <p>npm install</p>
      </div>
    </section>
  </main>
</div>
  );
}

export default Index;
