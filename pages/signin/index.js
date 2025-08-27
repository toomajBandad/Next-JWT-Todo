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
          router.push("/dashboard");
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
    <div className="container">
      <ToastContainer />
      <div className="wrapper">
        <h1 align="center">Login Form</h1>
        <form role="form" method="post" onSubmit={handleSubmit(signIn)}>
          <div className="inputBox">
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              type="email"
              autoComplete="off"
              aria-invalid={errors.email ? "true" : "false"}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email format",
                },
              })}
              placeholder="Email"
            />
            {errors.email && <p className="error">{errors.email.message}</p>}
          </div>

          <div className="inputBox">
            <label htmlFor="password">Password:</label>
            <input
              id="password"
              type="password"
              autoComplete="off"
              aria-invalid={errors.password ? "true" : "false"}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              placeholder="Password"
            />
            {errors.password && (
              <p className="error">{errors.password.message}</p>
            )}
          </div>

          <input
            type="submit"
            className="register-btn btn"
            value={loading ? "Signing In..." : "Sign In"}
            disabled={loading}
          />
        </form>
      </div>
    </div>
  );
}

export default Index;
