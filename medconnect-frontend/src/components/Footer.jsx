import React from "react";
import {
  FaInstagram,
  FaFacebookF,
  FaTelegramPlane,
  FaTwitter,
} from "react-icons/fa";

const FooterSection = () => {
  return (
    <div className="bg-gray-900 text-gray-300 py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* About Us */}
        <div>
          <h3 className="text-xl font-bold mb-4 text-white">About Us</h3>
          <p className="mb-6">
            MedConnect is dedicated to providing the best healthcare experience
            with advanced technology and compassionate care.
          </p>
          <div className="flex space-x-4 text-white text-xl">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
            >
              <FaInstagram className="hover:text-pink-500 transition" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
            >
              <FaFacebookF className="hover:text-blue-600 transition" />
            </a>
            <a
              href="https://telegram.org"
              target="_blank"
              rel="noreferrer"
              aria-label="Telegram"
            >
              <FaTelegramPlane className="hover:text-blue-400 transition" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Twitter"
            >
              <FaTwitter className="hover:text-blue-400 transition" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-bold mb-4 text-white">Quick Links</h3>
          <div className="grid grid-cols-2 gap-4">
            <ul className="space-y-2">
              <li>
                <a href="/" className="hover:text-white transition">
                  Home
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-white transition">
                  About Us
                </a>
              </li>
              <li>
                <a href="/services" className="hover:text-white transition">
                  Services
                </a>
              </li>
              <li>
                <a href="/cases" className="hover:text-white transition">
                  Our Cases
                </a>
              </li>
            </ul>
            <ul className="space-y-2">
              <li>
                <a href="/other-links" className="hover:text-white transition">
                  Other Links
                </a>
              </li>
              <li>
                <a href="/faq" className="hover:text-white transition">
                  FAQ
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-white transition">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Open Hours */}
        <div>
          <h3 className="text-xl font-bold mb-4 text-white">Open Hours</h3>
          <ul className="space-y-2 text-gray-400">
            <li>Monday - Friday: 9:00 AM - 6:00 PM</li>
            <li>Saturday: 10:00 AM - 4:00 PM</li>
            <li>Sunday: Closed</li>
            <li>Emergency: 24/7 Available</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FooterSection;
