import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useUser();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const getProfileImage = () => {
    if (user?.profilePic?.startsWith("http")) return user.profilePic;
    if (user?.profilePic) return `http://localhost:5000/uploads/${user.profilePic}`;
    return "https://via.placeholder.com/40?text=PP";
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search/${searchTerm.trim()}`);
      setSearchTerm("");
    }
  };

  return (
    <div className="shadow-md relative z-50">
      {/* Top Navbar */}
      <nav className="bg-white py-4 px-6 flex items-center justify-between">
        {/* Left: Logo + Brand */}
        <div className="flex items-center gap-4">
          <div
            className="flex flex-col justify-center items-center cursor-pointer space-y-1"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <div className="w-6 h-0.5 bg-gray-800" />
            <div className="w-6 h-0.5 bg-gray-800" />
            <div className="w-6 h-0.5 bg-gray-800" />
          </div>

          <img src="/logo.jpg" alt="MedConnect Logo" className="h-10 w-10" />
          <h1 className="text-3xl font-extrabold text-blue-700">MedConnect</h1>
        </div>

        {/* Right: Contact info + user */}
        <div className="flex items-center space-x-4 text-sm text-gray-700">
          <span className="hover:underline cursor-pointer">Help</span>
          <span>📞 +91 89047 24423</span>
          <span>📧 help@medconnect.com</span>

          {user ? (
            <div className="flex items-center gap-3">
              <Link
                to="/profile"
                className="flex items-center gap-2 hover:text-blue-800 transition"
              >
                <img
                  src={getProfileImage()}
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover border-2 border-blue-400"
                  onError={(e) =>
                    (e.target.src = "https://via.placeholder.com/40?text=PP")
                  }
                />
                <span className="font-semibold">{user.name}</span>
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex gap-2">
              <Link to="/login" className="text-blue-600 hover:underline">
                Login
              </Link>
              <Link to="/signup" className="text-blue-600 hover:underline">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* Navigation Links */}
      <div className="bg-blue-100 py-2 px-6">
        <div className="flex justify-center gap-8 text-blue-700 font-medium text-sm flex-wrap">
          <Link to="/" className="hover:text-blue-900">Home</Link>
          <Link to="/about" className="hover:text-blue-900">About</Link>
          <Link to="/services" className="hover:text-blue-900">Services</Link>
          <Link to="/contact" className="hover:text-blue-900">Contact</Link>
          <Link to="/doctors" className="hover:text-blue-900">Doctor Details</Link>
          <Link
            to="/appointment"
            className="text-white bg-blue-500 px-3 py-1 rounded hover:bg-blue-600"
          >
            Appointment
          </Link>
        </div>
      </div>
{/* Search Bar */}
<div className="bg-gray-100 py-4 px-6 flex justify-center">
  <form
    onSubmit={handleSearchSubmit}
    className="relative w-full max-w-xl flex"
  >
    <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">🔍</span>
    <input
      type="text"
      placeholder="Search for doctors, services, etc..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-l-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
    <button
      type="submit"
      className="bg-blue-500 text-white px-4 rounded-r-lg hover:bg-blue-600"
      disabled={!searchTerm.trim()}
    >
      Search
    </button>
  </form>
</div>


      {/* Dropdown Menu */}
      {menuOpen && (
        <div className="absolute top-[72px] left-0 bg-gradient-to-b from-blue-100 to-blue-200 shadow-lg border border-blue-300 w-64 p-4 z-50 rounded-md space-y-2 animate-slide-down">
          <Link to="/profile" onClick={() => setMenuOpen(false)} className="block px-3 py-2 hover:bg-blue-300">Profile</Link>
          <Link to="/overview" onClick={() => setMenuOpen(false)} className="block px-3 py-2 hover:bg-blue-300">Overview</Link>
          <Link to="/about" onClick={() => setMenuOpen(false)} className="block px-3 py-2 hover:bg-blue-300">About Us</Link>
          <Link to="/appointment" onClick={() => setMenuOpen(false)} className="block px-3 py-2 hover:bg-blue-300">Appointment</Link>
          <Link to="/timetable" onClick={() => setMenuOpen(false)} className="block px-3 py-2 hover:bg-blue-300">Time Table</Link>
          <Link to="/pricing" onClick={() => setMenuOpen(false)} className="block px-3 py-2 hover:bg-blue-300">Our Pricing</Link>
          <Link to="/location" onClick={() => setMenuOpen(false)} className="block px-3 py-2 hover:bg-blue-300">Location</Link>
          {!user && (
            <>
              <Link to="/signup" onClick={() => setMenuOpen(false)} className="block px-3 py-2 hover:bg-blue-300">Sign Up</Link>
              <Link to="/login" onClick={() => setMenuOpen(false)} className="block px-3 py-2 hover:bg-blue-300">Login</Link>
            </>
          )}
          <Link to="/faq" onClick={() => setMenuOpen(false)} className="block px-3 py-2 hover:bg-blue-300">FAQ</Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
