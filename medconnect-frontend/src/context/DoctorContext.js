import React, { createContext, useContext, useEffect, useState } from "react";

const DoctorContext = createContext();

export const DoctorProvider = ({ children }) => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/doctors");
        const data = await res.json();
        setDoctors(data);
      } catch (err) {
        console.error("Failed to fetch doctors:", err);
      }
    };

    fetchDoctors();
  }, []);

  return (
    <DoctorContext.Provider value={{ doctors }}>
      {children}
    </DoctorContext.Provider>
  );
};

export const useDoctor = () => useContext(DoctorContext);
