import React from "react";

const Location = () => {
  return (
    <div className="px-6 py-12 max-w-4xl mx-auto text-gray-800 bg-gradient-to-br from-blue-50 to-white min-h-screen space-y-8">
      <h1 className="text-4xl font-bold text-blue-800 text-center">
        Our Location
      </h1>

      {/* Address Info */}
      <div className="bg-white shadow-md rounded p-6 space-y-2 text-center">
        <h2 className="text-2xl font-semibold text-gray-700">
          Sunrise Multispeciality Hospital
        </h2>
        <p className="text-gray-600">Chikkabanavara, Bengaluru, India</p>
        <p className="text-gray-600">Phone: +91 98765 43210</p>
        <p className="text-gray-600">Email: info@sunrisehospital.com</p>
      </div>

      {/* Map */}
      <div className="w-full h-96">
        <iframe
          title="Hospital Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3890.513143438871!2d77.50275767465494!3d13.073170387259697!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae23219f11b28b%3A0xb38164e4fd902ba4!2sChikkabanavara%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1717654372734!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="rounded shadow-lg"
        ></iframe>
      </div>
    </div>
  );
};

export default Location;
