import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    const { name, email, phone, password, confirmPassword } = formData;

    if (!name || !email || !phone || !password || !confirmPassword) {
      alert("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      alert(" Passwords do not match.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        phone,
        password,
      });

      alert("Registration successful. Redirecting to login...");
      navigate("/login"); // ✅ Redirect to login
    } catch (err) {
      console.error("Signup Error:", err);
      alert(
        "Signup failed: " + (err.response?.data?.message || "Unknown error")
      );
    }
  };

  return (
    <form onSubmit={handleSignup} className="max-w-md mx-auto p-6 space-y-4">
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-700">
        Register
      </h2>

      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded"
        required
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded"
        required
      />

      <input
        type="tel"
        name="phone"
        placeholder="Phone"
        value={formData.phone}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded"
        required
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded"
        required
      />

      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        value={formData.confirmPassword}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded"
        required
      />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Sign Up
      </button>
    </form>
  );
};

export default Signup;
