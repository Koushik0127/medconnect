import React, { useState } from "react";

const AppointmentBanner = () => {
  const [showPhone, setShowPhone] = useState(false);

  return (
    <div className="bg-blue-50 py-10 mt-16 text-center">
      <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">
        Make an appointment with one of our prof Dr. John Doe
      </h3>

      {!showPhone ? (
        <button
          onClick={() => setShowPhone(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow-md transition"
        >
          Call Now
        </button>
      ) : (
        <p className="text-lg font-bold text-blue-700 mt-2">
          📞 +91 98765 43210
        </p>
      )}
    </div>
  );
};

export default AppointmentBanner;
