import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

const PhoneLogin = () => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1); // 1 = Send OTP, 2 = Verify OTP
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { setUser } = useUser();
  const navigate = useNavigate();

  const sendOtp = async () => {
    setError("");
    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/auth/send-otp", { phone });
      alert("OTP sent to your phone.");
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    setError("");
    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/verify-otp",
        { phone, otp }
      );
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("loggedInUser", JSON.stringify(res.data.user));
      setUser(res.data.user);
      alert("OTP verified. Logged in.");
      navigate("/profile");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-50">
      <div className="bg-white p-8 rounded shadow-lg w-full max-w-md space-y-4">
        <h2 className="text-2xl font-bold text-center text-blue-700">
          Login with Phone OTP
        </h2>

        {error && <p className="text-red-600 text-center">{error}</p>}

        {step === 1 ? (
          <>
            <label className="block text-sm">Phone Number</label>
            <input
              type="tel"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border px-3 py-2 rounded"
              required
            />
            <button
              onClick={sendOtp}
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          </>
        ) : (
          <>
            <label className="block text-sm">Enter OTP</label>
            <input
              type="text"
              placeholder="Enter received OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full border px-3 py-2 rounded"
              required
            />
            <button
              onClick={verifyOtp}
              disabled={loading}
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:opacity-50"
            >
              {loading ? "Verifying..." : "Verify OTP & Login"}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default PhoneLogin;
