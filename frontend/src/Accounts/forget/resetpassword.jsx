import { showError, showSuccess } from "@/utils";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export function Resetpassword() {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email;

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      showError("Email is missing. Please restart the reset process.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      showError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("http://localhost:6523/auth/user/resetpassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        showError(data.message || "Failed to reset password.");
        return;
      }

      showSuccess(data.message || "Password reset successful!");
      
      // Optional: redirect to login
      navigate("/account/login");
    } catch (error) {
      showError("Error: " + error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h1 className="text-2xl font-bold mb-4 text-center">Reset Password</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="password" className="block mb-1 font-medium">
            New Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label htmlFor="confirmPassword" className="block mb-1 font-medium">
            Confirm New Password
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            required
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="••••••••"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition font-medium"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
}
