import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { showSuccess, showError } from "@/utils"; // Optional if you're using toast notifications

export function Register() {
  const navigate = useNavigate(); // For redirecting after successful registration

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      // alert("Passwords do not match");
      showError("Passwords do not match");
      return;
    }

    // Exclude confirmPassword from submission
    const { confirmPassword, ...payload } = formData;

    try {
      const response = await fetch("http://localhost:6523/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        // alert(data.message || "Registration failed");
        showError(data.message || "Registration failed");
        return;
      }

      // alert("Registration successful!");
      showSuccess("Registration successful!");

      // Redirect to login
      navigate("/account/login");
    } catch (error) {
      // alert(error.message || "Something went wrong");
      showError(error.message || "Something went wrong");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block mb-1 font-medium">
            Full Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Your full name"
          />
        </div>

        <div>
          <label htmlFor="email" className="block mb-1 font-medium">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label htmlFor="password" className="block mb-1 font-medium">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            value={formData.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="••••••••"
          />
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block mb-1 font-medium">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            required
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition font-medium"
        >
          Register
        </button>
      </form>

      <div className="text-center mt-6 pt-4 border-t border-gray-200">
        <p className="text-gray-600 text-sm">
          Already have an account?{" "}
          <Link
            to="/account/login"
            className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}
