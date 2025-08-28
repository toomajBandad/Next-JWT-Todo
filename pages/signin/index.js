import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Index() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const signIn = async (data) => {
    setLoading(true);

    const trimmedData = {
      ...data,
      email: data.email.trim(),
      password: data.password.trim(),
    };

    try {
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(trimmedData),
      });

      const result = await res.json();

      if (res.ok) {
        toast.success("User login successfully!");
        setTimeout(() => {
          router.push("/");
        }, 2000);
      } else {
        toast.error(result.message || "Something went wrong");
      }
    } catch (err) {
      console.error("Signup error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-amber-100 to-yellow-200 px-4 w-full">
      <ToastContainer />
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 space-y-6 animate-fade-in">
        <h1 className="text-3xl font-extrabold text-center text-amber-600">
          Welcome Back
        </h1>
        <form className="space-y-5" onSubmit={handleSubmit(signIn)}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <input
              id="email"
              type="email"
              autoComplete="off"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email format",
                },
              })}
              className={`mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-400 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="you@example.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="off"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className={`mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-400 ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-md transition duration-200 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>
        <p className="text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <a href="/signup" className="text-amber-600 hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
}

export default Index;
