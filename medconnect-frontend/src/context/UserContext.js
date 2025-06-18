import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // ✅ Safe JSON parse for loggedInUser
    let savedUser = null;
    try {
      const storedUser = localStorage.getItem("loggedInUser");
      if (storedUser) {
        savedUser = JSON.parse(storedUser);
        setUser(savedUser);
      }
    } catch (err) {
      console.error("Error parsing loggedInUser from localStorage:", err);
      localStorage.removeItem("loggedInUser"); // remove corrupted data
    }

    const token = localStorage.getItem("token");
    if (!token) return;

    // ✅ Sync user with backend
    axios
      .get("http://localhost:5000/api/auth/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setUser(res.data);
        localStorage.setItem("loggedInUser", JSON.stringify(res.data));
      })
      .catch(() => {
        localStorage.clear();
        setUser(null);
      });
  }, []);

  // ✅ Update user and sync to localStorage
  const updateUser = (newUser) => {
    setUser(newUser);
    if (newUser) {
      localStorage.setItem("loggedInUser", JSON.stringify(newUser));
    } else {
      localStorage.clear();
    }
  };

  // ✅ Logout function
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser: updateUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// ✅ Custom hook for context access
export const useUser = () => useContext(UserContext);
