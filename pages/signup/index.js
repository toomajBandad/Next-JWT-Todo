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
    <div className="container">
      <ToastContainer />
      <div className="wrapper">
        <h1 align="center">SignUp Form</h1>
        <form role="form" method="post" onSubmit={handleSubmit(signup)}>
          <div className="inputBox">
            <label htmlFor="firstname">Firstname:</label>
            <input
              id="firstname"
              type="text"
              autoComplete="off"
              aria-invalid={errors.firstname ? "true" : "false"}
              {...register("firstname", { required: "Firstname is required" })}
              placeholder="Firstname"
            />
            {errors.firstname && (
              <p className="error">{errors.firstname.message}</p>
            )}
          </div>

          <div className="inputBox">
            <label htmlFor="lastname">Lastname:</label>
            <input
              id="lastname"
              type="text"
              autoComplete="off"
              aria-invalid={errors.lastname ? "true" : "false"}
              {...register("lastname", { required: "Lastname is required" })}
              placeholder="Lastname"
            />
            {errors.lastname && (
              <p className="error">{errors.lastname.message}</p>
            )}
          </div>

          <div className="inputBox">
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              autoComplete="off"
              aria-invalid={errors.username ? "true" : "false"}
              {...register("username", { required: "Username is required" })}
              placeholder="Username"
            />
            {errors.username && (
              <p className="error">{errors.username.message}</p>
            )}
          </div>

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

          <div className="inputBox">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              id="confirmPassword"
              type="password"
              autoComplete="off"
              aria-invalid={errors.confirmPassword ? "true" : "false"}
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === watch("password") || "Passwords do not match",
              })}
              placeholder="Confirm Password"
            />
            {errors.confirmPassword && (
              <p className="error">{errors.confirmPassword.message}</p>
            )}
          </div>

          <input
            type="submit"
            className="register-btn btn"
            value={loading ? "Signing Up..." : "Sign Up"}
            disabled={loading}
          />
        </form>
      </div>
    </div>
  );
}

export default Index;
