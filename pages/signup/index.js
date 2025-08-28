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
    watch,
    formState: { errors },
  } = useForm();

  const signup = async (data) => {
    setLoading(true);

    // Remove confirmPassword and trim other fields
    const { confirmPassword, ...rest } = data;
    const trimmedData = {
      ...rest,
      firstname: rest.firstname.trim(),
      lastname: rest.lastname.trim(),
      username: rest.username.trim(),
      email: rest.email.trim(),
      password: rest.password.trim(),
    };

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(trimmedData),
      });

      const result = await res.json();
      if (res.ok) {
        toast.success("User registered successfully!");
        router.push("/signin");
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
<div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-yellow-100 to-amber-200 px-4 w-full">
  <ToastContainer />
  <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-8 space-y-6 animate-fade-in">
    <h1 className="text-3xl font-extrabold text-center text-amber-600">Create Your Account ✨</h1>
    <form className="space-y-5" onSubmit={handleSubmit(signup)}>
      {[
        { id: "firstname", label: "First Name", type: "text", rules: { required: "Firstname is required" } },
        { id: "lastname", label: "Last Name", type: "text", rules: { required: "Lastname is required" } },
        { id: "username", label: "Username", type: "text", rules: { required: "Username is required" } },
        {
          id: "email",
          label: "Email",
          type: "email",
          rules: {
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Invalid email format",
            },
          },
        },
        {
          id: "password",
          label: "Password",
          type: "password",
          rules: {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          },
        },
        {
          id: "confirmPassword",
          label: "Confirm Password",
          type: "password",
          rules: {
            required: "Please confirm your password",
            validate: (value) =>
              value === watch("password") || "Passwords do not match",
          },
        },
      ].map(({ id, label, type, rules }) => (
        <div key={id}>
          <label htmlFor={id} className="block text-sm font-medium text-gray-700">{label}</label>
          <input
            id={id}
            type={type}
            autoComplete="off"
            {...register(id, rules)}
            className={`mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-400 ${
              errors[id] ? "border-red-500" : "border-gray-300"
            }`}
            placeholder={label}
          />
          {errors[id] && <p className="mt-1 text-sm text-red-600">{errors[id].message}</p>}
        </div>
      ))}

      <button
        type="submit"
        disabled={loading}
        className={`w-full py-2 px-4 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-md transition duration-200 ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {loading ? "Signing Up..." : "Sign Up"}
      </button>
    </form>
    <p className="text-center text-sm text-gray-500">
      Already have an account? <a href="/signin" className="text-amber-600 hover:underline">Sign In</a>
    </p>
  </div>
</div>
  );
}

export default Index;
