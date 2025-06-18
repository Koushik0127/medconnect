import React from "react";
import Services from "../components/Services"; // Ensure path is correct
import AppointmentBanner from "../components/AppointmentBanner";

const Home = () => {
  return (
    <div>
      {/* Welcome Section */}
      <div
        className="h-[450px] bg-cover bg-center flex items-center justify-end text-right px-10"
        style={{ backgroundImage: `url('/doctor.jpg')` }}
      >
        <div className="max-w-md">
          <h2 className="text-white text-4xl font-bold mb-2">
            Welcome to MedConnect
          </h2>
          <p className="text-white text-lg">
            Book appointments, manage health records, and stay connected with
            your doctor.
          </p>
        </div>
      </div>
      {/* Spacer with double gap */}
      <div className="h-16 bg-white" /> {/* 4rem vertical space */}
      {/* Services Section */}
      <Services />
      {/* Spacer */}
      <div className="h-10 bg-white" />{" "}
      {/* Optional space between services and banner */}
      {/* Appointment Call-to-Action Section */}
      <AppointmentBanner />
    </div>
  );
};

export default Home;
