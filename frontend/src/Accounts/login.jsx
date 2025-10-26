import { showError, showSuccess } from "@/utils";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../app/reducer/user"; // ✅ adjust path as needed

export function Login() {
  const [logininfo, setlogininfo] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch(); // ✅ add this

  const handleChange = (e) => {
    const { name, value } = e.target;
    setlogininfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch("http://localhost:6523/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(logininfo),
    });

    const data = await response.json();
    console.log("Login response data:", data);

    if (!response.ok) {
      showError(data.message || "Login failed");
      return;
    }

    dispatch(
      login({
        user: data.user,
        token: data.Token,
      })
    );

    localStorage.setItem("token", data.Token);
    localStorage.setItem("user", JSON.stringify(data.user));  // <-- add this!

    showSuccess("Login successful!");
    navigate("/");
  } catch (error) {
    showError(error.message || "Something went wrong");
  }
};


  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            required
            value={logininfo.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            required
            value={logininfo.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="********"
          />
        </div>

        <div className="text-right">
          <Link
            to="/account/forgetpassword"
            className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors duration-200"
          >
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition font-medium"
        >
          Login
        </button>
      </form>

      <div className="text-center mt-6 pt-4 border-t border-gray-200">
        <p className="text-gray-600 text-sm">
          Don't have an account?{" "}
          <Link
            to="/account/register"
            className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}
