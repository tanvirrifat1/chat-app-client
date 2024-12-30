import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function LoginPages() {
  const [showPass, setShowPass] = useState(false);
  const router = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login, isLoggingIn } = useAuthStore();

  const validForm = () => {
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!formData.password.trim()) return toast.error("Password is required");
    if (!formData.password.length > 6)
      return toast.error("Password must be at least 6 characters");

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const success = validForm();

    if (success === true) login(formData);

    if (success === true) {
      router("/");
    }
  };

  return (
    <div className="flex justify-center items-start h-screen mt-10">
      <div className="w-full max-w-md rounded-lg bg-white px-10 pb-10 pt-8 shadow-md dark:bg-zinc-900">
        <div className="mb-6">
          <h2 className="text-center text-3xl font-semibold tracking-tight">
            Login
          </h2>
          <p className="text-center text-sm text-zinc-500 dark:text-zinc-400">
            We&apos;d love to hear from you!
          </p>
        </div>
        <form onSubmit={handleSubmit} className="w-full space-y-6">
          <div className="space-y-2 text-sm text-zinc-700 dark:text-zinc-400">
            <label className="block font-medium" htmlFor="email">
              Email
            </label>
            <input
              className="h-10 w-full rounded border px-3 py-2 text-sm leading-tight focus:outline-none focus:ring-1 dark:border-zinc-700"
              id="email"
              placeholder="Your Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
          <div className="space-y-2 text-sm text-zinc-700 dark:text-zinc-400">
            <label className="block font-medium" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <input
                className="h-10 w-full rounded border px-3 py-2 text-sm leading-tight focus:outline-none focus:ring-1 dark:border-zinc-700"
                id="password"
                placeholder="Your Password"
                name="password"
                type={showPass ? "text" : "password"}
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 dark:text-zinc-400"
                onClick={() => setShowPass((prev) => !prev)}
              >
                {showPass ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          <button
            disabled={isLoggingIn}
            className="rounded-md bg-sky-500 px-4 py-2 text-white transition-colors hover:bg-sky-600 dark:bg-sky-700"
          >
            Submit
          </button>
        </form>
        <div className="my-3 flex items-center gap-2 text-sm">
          You have an account?
          <Link to="/signup">
            <p className="link link-primary">SignUp</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPages;
