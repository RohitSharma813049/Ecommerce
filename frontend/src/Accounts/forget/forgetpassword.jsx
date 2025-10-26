import { showError, showSuccess } from "@/utils";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Forgetpassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:6523/auth/user/sendotp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        showError(data.message || "Something went wrong.");
        return;
      }

      showSuccess(data.message || "Reset link sent successfully.");

      // ✅ Navigate to OTP verification page and optionally pass email in state
      navigate("/account/otpverify", { state: { email } });
    } catch (error) {
      showError("Error: " + error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h1 className="text-2xl font-bold mb-4 text-center">Forgot Password</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block mb-1 font-medium">
            Enter your email address
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition font-medium"
        >
          Send Reset Link
        </button>
      </form>
    </div>
  );
}
