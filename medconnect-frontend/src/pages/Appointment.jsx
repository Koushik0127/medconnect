import React, { useEffect, useState } from "react";
import AppointmentBanner from "../components/AppointmentBanner";
import AppointmentForm from "../components/AppointmentForm";

const Appointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔄 Fetch appointments for the logged-in user
  const fetchAppointments = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setAppointments([]);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/appointments", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Unauthorized or server error");

      const data = await res.json();
      setAppointments(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(" Fetch error:", err.message);
      setAppointments([]);
    } finally {
      setLoading(false);
    }
  };

  // ⏳ Load once on mount
  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <div className="p-6">
      {/* 🏥 Appointment Banner */}
      <AppointmentBanner />

      {/* 📅 Booking Form */}
      <h2 className="text-2xl font-bold mt-8 mb-4">Book Appointment</h2>
      <AppointmentForm onBooked={fetchAppointments} />

      {/* 📋 Appointment List */}
      <h2 className="text-xl font-semibold mt-10 mb-4">Your Appointments</h2>

      {loading ? (
        <p>Loading appointments...</p>
      ) : appointments.length === 0 ? (
        <p className="text-gray-500">No appointments found.</p>
      ) : (
        <ul className="space-y-4">
          {appointments.map((appt) => (
            <li key={appt._id} className="border p-4 rounded shadow bg-white">
              <p>
                <strong>Doctor:</strong> {appt.doctor}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(appt.date).toLocaleDateString()}
              </p>
              <p>
                <strong>Time:</strong> {appt.time}
              </p>
              <p>
                <strong>Appointment ID:</strong> {appt._id}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Appointment;
