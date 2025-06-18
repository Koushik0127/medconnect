import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "../context/UserContext";

const Profile = () => {
  const { user, setUser } = useUser();
  const [preview, setPreview] = useState("");
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Sync values from context
  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setPhone(user.phone || "");
    }
  }, [user]);

  // ✅ Fetch profile from server if user not loaded
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await axios.get("http://localhost:5000/api/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch (err) {
        console.error("Fetch user failed:", err);
      }
    };

    if (!user) fetchUser();
  }, [user, setUser]);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
    }
  };

  const validateForm = () => {
    if (!name.trim()) return "Name is required.";
    if (!email || !/\S+@\S+\.\S+/.test(email)) return "Valid email required.";
    if (!phone || !/^[0-9]{10}$/.test(phone))
      return "Valid 10-digit phone required.";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = validateForm();
    if (error) return alert("❌ " + error);

    const token = localStorage.getItem("token");
    if (!token) return alert(" No token found. Please login again.");

    const formData = new FormData();
    formData.append("name", name.trim());
    formData.append("email", email.trim());
    formData.append("phone", phone.trim());
    if (file) formData.append("profilePic", file);

    setLoading(true);
    try {
      const res = await axios.put(
        "http://localhost:5000/api/user/profile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // ✅ Update context and localStorage
      setUser(res.data.updatedUser);
      localStorage.setItem(
        "loggedInUser",
        JSON.stringify(res.data.updatedUser)
      );
      alert("Profile updated successfully!");
      setPreview("");
      setFile(null);
    } catch (err) {
      console.error("Profile update error:", err);
      alert("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  const getProfileImage = () => {
    if (preview) return preview;
    if (user?.profilePic?.startsWith("http")) return user.profilePic;
    if (user?.profilePic)
      return `http://localhost:5000/uploads/${user.profilePic}`;
    return "https://via.placeholder.com/80?text=PP";
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">👤 Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center gap-4">
          <img
            src={getProfileImage()}
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover border"
          />
          <label className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Upload Picture
            <input
              type="file"
              onChange={handleFileChange}
              className="hidden"
              accept="image/*"
            />
          </label>
        </div>

        <div>
          <label className="block font-medium">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium">Phone</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`px-6 py-2 rounded text-white ${
            loading ? "bg-gray-500" : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
};

export default Profile;
