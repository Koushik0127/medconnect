import React, { useState } from "react";
import { Menu, X } from "lucide-react";
const HamburgerMenu = () => {
  const [open, setOpen] = useState(false);

  const links = [
    { name: "Profile", path: "/profile" },
    { name: "Overview", path: "/overview" },
    { name: "About Us", path: "/about" },
    { name: "Appointment", path: "/appointment" },
    { name: "Time Table", path: "/timetable" },
    { name: "Our Pricing", path: "/pricing" },
    { name: "Location", path: "/location" },
    { name: "Sign Up", path: "/signup" },
    { name: "Login", path: "/login" },
    { name: "FAQ", path: "/faq" },

    { name: "404 Error", path: "/404" },
  ];

  return (
    <>
      <div className="fixed top-4 left-4 z-50">
        <button onClick={() => setOpen(!open)} className="text-gray-800 p-2">
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-md z-40 transform transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 space-y-4">
          <h2 className="text-xl font-bold text-blue-700">Navigation</h2>
          <ul className="space-y-3">
            {links.map((link, idx) => (
              <li key={idx}>
                <a
                  href={link.path}
                  className="block text-gray-700 hover:text-blue-600 transition"
                  onClick={() => setOpen(false)}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-30"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
};

export default HamburgerMenu;
