import React, { useState } from "react";
import { motion } from "framer-motion";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Failed to send message.");
      } else {
        alert("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      }
    } catch (err) {
      console.error("Submit error:", err.message);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="relative min-h-screen bg-cover bg-center py-16 px-6"
      style={{ backgroundImage: "url('/contact-bg.jpg')" }}
    >
      <div className="absolute inset-0 bg-white bg-opacity-80 backdrop-blur-sm"></div>

      <div className="relative z-10 max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Left: Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-blue-700 mb-6">Contact Us</h2>
          <p className="text-lg text-gray-700 mb-6">
            We're here to assist you. Reach out to us through the following
            channels or drop us a message using the form.
          </p>
          <ul className="space-y-4 text-gray-800">
            <li>
              📞 <strong>Phone:</strong> +91 89047 24423
            </li>
            <li>
              📧 <strong>Email:</strong> help@medconnect.com
            </li>
            <li>
              📍 <strong>Address:</strong> Chikkabanavara, Bengaluru, India
            </li>
          </ul>
        </motion.div>

        {/* Right: Contact Form */}
        <motion.form
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit}
          className="bg-white bg-opacity-90 p-8 rounded-lg shadow-xl backdrop-blur-sm space-y-4"
        >
          <div>
            <label className="block text-gray-700 font-semibold">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              required
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              required
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              placeholder="Your Message"
              required
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </motion.form>
      </div>
    </div>
  );
};

export default Contact;
