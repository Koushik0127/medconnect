import React from "react";

const Home = () => {
  return (
    <div
      className="relative h-[450px] bg-cover bg-center flex items-center justify-end pr-16"
      style={{ backgroundImage: `url('/doctor.jpg')` }} // doctor.jpg should be in /public
    >
      {/* Optional subtle dark overlay — remove if undesired */}
      <div className="absolute inset-0 bg-black/10 z-0" />

      {/* Right-aligned text with strong white shadow for readability */}
      <div className="relative z-10 text-right text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)] max-w-md">
        <h2 className="text-4xl font-extrabold mb-4">Welcome to MedConnect</h2>
        <p className="text-lg font-medium">
          Book appointments, manage health records, and stay connected with your
          doctor.
        </p>
      </div>
    </div>
  );
};

export default Home;
