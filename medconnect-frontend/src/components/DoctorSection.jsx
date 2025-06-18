import React, { useState } from "react";
import { motion } from "framer-motion";

const DoctorSection = () => {
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const doctors = [
    {
      name: "Dr. Aisha Mehra",
      image: "/doctors/doc1.jpg",
      specialist: "Cardiologist",
      available: "Available Today",
      description: "Expert in heart health and cardiovascular treatment.",
    },
    {
      name: "Dr. Priyank Sharma",
      image: "/doctors/doc2.jpg",
      specialist: "Dermatologist",
      available: "Next Available: Tomorrow",
      description: "Skin care and treatment of chronic skin diseases.",
    },
    {
      name: "Dr. Rahul Desai",
      image: "/doctors/doc3.jpg",
      specialist: "Orthopedic Surgeon",
      available: "Available Today",
      description: "Specializes in joint replacements and bone injuries.",
    },
    {
      name: "Dr. Imran Ali",
      image: "/doctors/doc4.jpg",
      specialist: "Pediatrician",
      available: "Available Today",
      description: "Expert in child healthcare and vaccinations.",
    },
  ];

  return (
    <div className="mt-16 text-center">
      <h3 className="text-3xl font-bold mb-6 text-blue-800">
        We have specialist doctors to solve your problems
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {doctors.map((doc, idx) => (
          <motion.div
            key={idx}
            className="bg-white text-black rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg transition"
            onClick={() =>
              setSelectedDoctor(selectedDoctor === idx ? null : idx)
            }
            whileHover={{ scale: 1.05 }}
          >
            <img
              src={doc.image}
              alt={doc.name}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h4 className="text-lg font-semibold text-blue-700">{doc.name}</h4>

            {selectedDoctor === idx && (
              <div className="mt-4 text-left text-sm">
                <p>
                  <strong>Specialist:</strong> {doc.specialist}
                </p>
                <p>
                  <strong>Available:</strong> {doc.available}
                </p>
                <p>
                  <strong>About:</strong> {doc.description}
                </p>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default DoctorSection;
