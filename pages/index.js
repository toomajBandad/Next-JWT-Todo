import React from "react";

function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-yellow-100 px-6 py-12 w-full">
      <main className="max-w-4xl mx-auto bg-white shadow-xl rounded-xl p-10 space-y-8 animate-fade-in">
        <h1 className="text-4xl font-extrabold text-amber-600 text-center">📝 Next.js Todo App</h1>
        <p className="text-gray-700 text-lg">
          A full-stack Todo application built with <span className="font-semibold text-gray-900">Next.js</span>, featuring secure user authentication using <span className="font-semibold text-gray-900">JWT</span> and <span className="font-semibold text-gray-900">bcryptjs</span>. Users can register, log in, and manage their personal todo list—adding, deleting, and marking tasks as complete.
        </p>

        <section>
          <h2 className="text-2xl font-bold text-amber-500">🔐 Authentication & Security</h2>
          <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
            <li>Authentication handled via secure <strong>Next.js API Routes</strong></li>
            <li>Passwords hashed using <strong>bcryptjs</strong></li>
            <li>JWT tokens issued and stored in <strong>HTTP-only cookies</strong> using the <strong>cookie</strong> package</li>
            <li>Cookies are inaccessible to frontend JavaScript, protecting against XSS and unauthorized access</li>
            <li>All protected routes verify tokens server-side using <strong>jsonwebtoken</strong></li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-amber-500">🚀 Features</h2>
          <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
            <li>Secure registration and login using <strong>bcryptjs</strong> for password hashing</li>
            <li>Session management with <strong>jsonwebtoken</strong> and server-side cookies</li>
            <li>Form handling powered by <strong>react-hook-form</strong></li>
            <li>Toast notifications using <strong>react-toastify</strong></li>
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
            <li>Modular <strong>Next.js API endpoints</strong> for authentication and todo operations</li>
            <li>Middleware for token verification using <strong>jsonwebtoken</strong></li>
            <li>Database operations handled via <strong>mongoose</strong> (MongoDB)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-amber-500">🛠️ Tech Stack</h2>
          <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
            <li><strong>Frontend:</strong> Next.js (React), Tailwind CSS, CSS Modules</li>
            <li><strong>Backend:</strong> Next.js API Routes</li>
            <li><strong>Authentication:</strong> bcryptjs, jsonwebtoken, cookie</li>
            <li><strong>Database:</strong> MongoDB via mongoose</li>
            <li><strong>UI Enhancements:</strong> react-icons, react-toastify</li>
            <li><strong>Form Handling:</strong> react-hook-form</li>
            <li><strong>Styling Tools:</strong> tailwindcss, postcss</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-amber-500">📦 Installation</h2>
          <div className="bg-gray-100 rounded-md p-4 text-sm font-mono text-gray-800">
            <p>git clone https://github.com/your-username/nextjs-todo-app.git</p>
            <p>cd nextjs-todo-app</p>
            <p>npm install</p>
            <p>npm run dev</p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Index;