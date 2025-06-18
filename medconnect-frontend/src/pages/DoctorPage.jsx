import React, { useState, useEffect } from "react";

const hospitalData = {
  name: "Sunrise Multispeciality Hospital",
  address: "Chikkabanavara, Bengaluru , India",
  contact: "+91 98765 43210",
  doctors: [
    {
      name: "Dr. Aisha Mehra",
      image: "/doctors/doc1.jpg",
      specialist: "Cardiologist",
      description:
        "Over 15 years of experience in treating heart-related conditions.",
      available: "Mon, Wed, Fri - 10am to 1pm",
    },
    {
      name: "Dr. Priyank Sharma",
      image: "/doctors/doc2.jpg",
      specialist: "Dermatologist",
      description: "Expert in skin diseases and cosmetic dermatology.",
      available: "Tue, Thu - 11am to 2pm",
    },
    {
      name: "Dr. Rahul Desai",
      image: "/doctors/doc3.jpg",
      specialist: "Orthopedic Surgeon",
      description: "Specializes in joint replacements and bone injuries.",
      available: "Mon to Fri - 9am to 12pm",
    },
    {
      name: "Dr. Imran Ali",
      image: "/doctors/doc4.jpg",
      specialist: "Pediatrician",
      description: "Caring for children's health with 8+ years of experience.",
      available: "Mon to Sat - 10am to 1pm",
    },
    {
      name: "Dr. Meera Joshi",
      image: "/doctors/doc5.jpg",
      specialist: "Gynecologist",
      description:
        "Experienced in women's health, prenatal care, and fertility treatments.",
      available: "Mon, Wed, Fri - 10am to 2pm",
    },
    {
      name: "Dr. Ramesh Verma",
      image: "/doctors/doc6.jpg",
      specialist: "Neurologist",
      description:
        "Treats disorders of the nervous system including stroke and epilepsy.",
      available: "Tue, Thu - 3pm to 6pm",
    },
    {
      name: "Dr. Nidhi Rao",
      image: "/doctors/doc7.jpg",
      specialist: "ENT Specialist",
      description:
        "Specialist in ear, nose, and throat treatments with over 10 years of experience.",
      available: "Mon to Sat - 11am to 1pm",
    },
    {
      name: "Dr. Manav Kapoor",
      image: "/doctors/doc8.jpg",
      specialist: "Psychiatrist",
      description:
        "Helps patients manage mental health conditions such as anxiety and depression.",
      available: "Mon, Wed, Fri - 4pm to 7pm",
    },
    {
      name: "Dr. Kavita Sen",
      image: "/doctors/doc9.jpg",
      specialist: "General Physician",
      description:
        "Primary care provider with expertise in routine checkups and diagnostics.",
      available: "Mon to Sat - 9am to 12pm",
    },
    // Add more doctors here
  ],
};

const DoctorPage = () => {
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  // ⭐ Save doctor names to localStorage when component loads
  useEffect(() => {
    const doctorNames = hospitalData.doctors.map((doc) => doc.name);
    localStorage.setItem("doctorList", JSON.stringify(doctorNames));
  }, []);

  return (
    <div className="px-6 py-12 max-w-7xl mx-auto text-gray-800 bg-gradient-to-br from-blue-50 to-white min-h-screen">
      {/* Hospital Info */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-blue-800">
          {hospitalData.name}
        </h2>
        <p className="text-lg mt-2">{hospitalData.address}</p>
        <p className="text-md text-blue-600">{hospitalData.contact}</p>
      </div>

      {/* Doctor List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {hospitalData.doctors.map((doc, idx) => (
          <div
            key={idx}
            className="bg-white rounded-lg shadow-md p-4 hover:shadow-xl transition cursor-pointer"
            onClick={() =>
              setSelectedDoctor(selectedDoctor === idx ? null : idx)
            }
          >
            <img
              src={doc.image}
              alt={doc.name}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h3 className="text-xl font-semibold text-blue-700">{doc.name}</h3>
            <p className="text-sm text-gray-600">{doc.specialist}</p>

            {/* Doctor Details Toggle */}
            {selectedDoctor === idx && (
              <div className="mt-4 text-sm text-left space-y-1">
                <p>
                  <strong>Description:</strong> {doc.description}
                </p>
                <p>
                  <strong>Available:</strong> {doc.available}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorPage;
