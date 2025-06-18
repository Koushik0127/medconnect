import axios from "axios";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useUser } from "../context/UserContext";

const Login = () => {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        emailOrPhone: emailOrPhone.trim(),
        password: password.trim(),
      });

      if (res.data.token) {
        const user = res.data.user;

        // ✅ Store user data
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("loggedInUser", JSON.stringify(user));
        setUser(user);

        // ✅ IMPORTANT: Set email for Overview
        if (user.email) {
          localStorage.setItem("medconnect_loggedInUserEmail", user.email);
        }

        navigate("/profile");
      } else {
        setError("Login failed: Token not received.");
      }
    } catch (err) {
      console.error("Login error:", err);
      const msg = err.response?.data?.message || "Login failed. Try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-50">
      <div className="bg-white p-8 shadow-lg rounded-lg w-full max-w-md space-y-6">
        <h2 className="text-2xl font-bold text-center text-blue-700">
          Login to MedConnect
        </h2>

        {error && <p className="text-red-600 text-center">{error}</p>}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label
              htmlFor="emailOrPhone"
              className="block text-sm font-medium mb-1"
            >
              Email or Phone
            </label>
            <input
              id="emailOrPhone"
              type="text"
              value={emailOrPhone}
              onChange={(e) => setEmailOrPhone(e.target.value)}
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your email or phone"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-1"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
