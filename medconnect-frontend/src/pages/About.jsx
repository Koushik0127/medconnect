import React, { useEffect, useState } from "react";

const About = () => {
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setFadeIn(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`px-6 py-12 max-w-7xl mx-auto text-gray-800 bg-gradient-to-r from-blue-50 to-blue-100 min-h-screen transition-opacity duration-1000 ${
        fadeIn ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Title */}
      <h2 className="text-4xl font-bold text-blue-700 mb-12 text-center">
        About MedConnect
      </h2>

      {/* Hero Image + Intro */}
      <div className="flex flex-col md:flex-row items-center gap-10 mb-16">
        <img
          src="/about.jpg" // Replace with your image path
          alt="MedConnect Team"
          className="rounded-lg shadow-lg max-w-full md:w-1/2"
        />
        <div className="md:w-1/2 space-y-6 text-lg">
          <p>
            <strong>MedConnect</strong> is a digital healthcare platform
            designed to simplify how patients and doctors connect. Whether
            you’re booking appointments, checking hospital bed availability, or
            viewing your health records — MedConnect brings healthcare to your
            fingertips.
          </p>
          <p>
            Our platform integrates the latest technology with compassionate
            care to ensure everyone can access health services with ease.
          </p>
        </div>
      </div>

      {/* Mission & Vision Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div className="bg-white rounded-lg p-8 shadow-md hover:shadow-xl transition-shadow duration-300">
          <h3 className="text-2xl font-semibold text-blue-600 mb-4">
            Our Mission
          </h3>
          <p>
            To bridge the gap between healthcare providers and patients by
            delivering timely, reliable, and compassionate care through
            technology.
          </p>
        </div>
        <div className="bg-white rounded-lg p-8 shadow-md hover:shadow-xl transition-shadow duration-300">
          <h3 className="text-2xl font-semibold text-blue-600 mb-4">
            Our Vision
          </h3>
          <p>
            To create a connected healthcare ecosystem where access to care is
            effortless, and management is seamless for both patients and
            doctors.
          </p>
        </div>
      </div>

      {/* Features Grid with Icons and Images */}
      <h3 className="text-3xl font-semibold text-blue-700 mb-8 text-center">
        What We Offer
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-16">
        {/* Feature Card 1 */}
        <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center text-center">
          <img
            src="/icons/appointment.jpg"
            alt="Appointments"
            className="w-16 h-16 mb-4"
          />
          <h4 className="font-semibold mb-2">Online Appointments</h4>
          <p>Book doctor appointments anytime, anywhere with a few clicks.</p>
        </div>
        {/* Feature Card 2 */}
        <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center text-center">
          <img
            src="/icons/bed.jpg"
            alt="Bed Availability"
            className="w-16 h-16 mb-4"
          />
          <h4 className="font-semibold mb-2">Real-Time Bed Availability</h4>
          <p>Check hospital bed availability instantly to avoid delays.</p>
        </div>
        {/* Feature Card 3 */}
        <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center text-center">
          <img
            src="/icons/schedule.png"
            alt="Schedules"
            className="w-16 h-16 mb-4"
          />
          <h4 className="font-semibold mb-2">Doctor Schedules</h4>
          <p>View chamber timings and manage appointments easily.</p>
        </div>
        {/* Feature Card 4 */}
        <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center text-center">
          <img
            src="/icons/emergency.png"
            alt="Emergency"
            className="w-16 h-16 mb-4"
          />
          <h4 className="font-semibold mb-2">24/7 Emergency Contacts</h4>
          <p>Access urgent contact numbers anytime for emergency help.</p>
        </div>
        {/* Feature Card 5 */}
        <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center text-center">
          <img
            src="/icons/records.jpg"
            alt="Records"
            className="w-16 h-16 mb-4"
          />
          <h4 className="font-semibold mb-2">Health Records</h4>
          <p>Manage your health records securely and conveniently.</p>
        </div>
        {/* Feature Card 6 */}
        <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center text-center">
          <img
            src="/icons/consult.png"
            alt="Consultation"
            className="w-16 h-16 mb-4"
          />
          <h4 className="font-semibold mb-2">Expert Consultations</h4>
          <p>
            Talk to top specialists and receive personalized medical advice.
          </p>
        </div>
      </div>

      {/* Founder’s Note */}
      <div className="bg-blue-50 border-l-4 border-blue-400 p-6 italic rounded shadow-md max-w-3xl mx-auto mb-16">
        “We started MedConnect with a simple idea: to make healthcare more
        accessible. Every click, every feature, is designed with patients in
        mind.” — <strong>Team MedConnect</strong>
      </div>

      {/* Call to Action */}
      <div className="text-center">
        <a
          href="/appointment"
          className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Book an Appointment Now
        </a>
      </div>
    </div>
  );
};

export default About;
