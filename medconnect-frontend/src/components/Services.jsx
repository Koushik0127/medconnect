import React, { useState } from "react";
import { motion } from "framer-motion";
const ServicesSection = () => {
  const [hospitalBedAvailable, setHospitalBedAvailable] = useState(false);
  const [emergencyPhoneVisible, setEmergencyPhoneVisible] = useState(false);
  const [doctorAvailable, setDoctorAvailable] = useState(false);

  // Animation variants for fade-in
  const fadeInVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div
      className="py-16 px-4 bg-cover bg-center text-white"
      style={{ backgroundImage: `url('/services-bg.jpg')` }}
    >
      {/* Title */}
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h3 className="text-4xl font-bold mb-4 text-black">
          Check Our Services
        </h3>
        <p className="text-lg font-semibold max-w-3xl mx-auto inline-block bg-blue-200 bg-opacity-70 text-blue-900 px-4 py-2 rounded">
          Explore the healthcare services we offer to make your experience more
          comfortable and reliable.
        </p>
      </div>

      {/* Service Boxes */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Hospitality */}
        <motion.div
          className="bg-blue-100 text-black rounded-lg p-6 flex flex-col items-center shadow-md"
          variants={fadeInVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <img
            src="/hospitality.jpg"
            alt="Hospitality"
            className="w-full h-48 object-cover rounded-md mb-4"
          />
          <h4 className="text-xl font-bold mb-2 text-blue-700">Hospitality</h4>
          <input
            type="text"
            placeholder="Appointment for Bed"
            className="w-full px-3 py-2 rounded-md border border-blue-300 mb-2"
            onFocus={() => setHospitalBedAvailable(true)}
          />
          {hospitalBedAvailable && (
            <p className="text-green-700 font-medium mt-2">
              ✅ 5 Beds Available
            </p>
          )}
        </motion.div>

        {/* Emergency Care */}
        <motion.div
          className="bg-blue-100 text-black rounded-lg p-6 flex flex-col items-center shadow-md"
          variants={fadeInVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <img
            src="/emergency.jpg"
            alt="Emergency Care"
            className="w-full h-48 object-cover rounded-md mb-4"
          />
          <h4 className="text-xl font-bold mb-2 text-blue-700">
            Emergency Care
          </h4>
          <input
            type="text"
            placeholder="Contact Phone Number"
            className="w-full px-3 py-2 rounded-md border border-blue-300 mb-2"
            onFocus={() => setEmergencyPhoneVisible(true)}
          />
          {emergencyPhoneVisible && (
            <p className="text-green-700 font-medium mt-2">
              📞 +91 98765 43210
            </p>
          )}
        </motion.div>

        {/* Chamber Services */}
        <motion.div
          className="bg-blue-100 text-black rounded-lg p-6 flex flex-col items-center shadow-md"
          variants={fadeInVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <img
            src="/chamber.jpg"
            alt="Chamber Services"
            className="w-full h-48 object-cover rounded-md mb-4"
          />
          <h4 className="text-xl font-bold mb-2 text-blue-700">
            Chamber Services
          </h4>
          <input
            type="text"
            placeholder="Appointment"
            className="w-full px-3 py-2 rounded-md border border-blue-300 mb-2"
            onFocus={() => setDoctorAvailable(true)}
          />
          {doctorAvailable && (
            <p className="text-green-700 font-medium mt-2">
              ✅ Doctor Available Today
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ServicesSection;
