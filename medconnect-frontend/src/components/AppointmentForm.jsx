import React, { useState } from "react";
import { useDoctor } from "../context/DoctorContext";

const AppointmentForm = ({ onBooked }) => {
  const { doctors } = useDoctor();

  const [formData, setFormData] = useState({
    patientName: "",
    phone: "",
    doctor: "",
    date: "",
    time: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData), // ✅ email not required in body
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Failed to book appointment");
      }

      alert("✅ Appointment Booked");
      setFormData({
        patientName: "",
        phone: "",
        doctor: "",
        date: "",
        time: "",
      });
      if (onBooked) onBooked();
    } catch (err) {
      console.error(" Submit error:", err.message);
      alert("Booking failed: " + err.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 max-w-md mx-auto bg-white p-6 rounded shadow"
    >
      <input
        name="patientName"
        placeholder="Patient Name"
        value={formData.patientName}
        onChange={handleChange}
        required
        className="border p-2 w-full"
      />
      <input
        name="phone"
        placeholder="Phone"
        value={formData.phone}
        onChange={handleChange}
        required
        className="border p-2 w-full"
      />

      <select
        name="doctor"
        value={formData.doctor}
        onChange={handleChange}
        required
        className="border p-2 w-full"
      >
        <option value="">-- Select a Doctor --</option>
        {doctors.length > 0 ? (
          doctors.map((doc, i) => (
            <option key={i} value={doc.name}>
              {doc.name} — {doc.specialization}
            </option>
          ))
        ) : (
          <option disabled>No doctors found</option>
        )}
      </select>

      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        required
        className="border p-2 w-full"
      />

      <div className="flex gap-2">
        {/* Hour */}
        <select
          required
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              time: `${e.target.value}:${
                formData.time?.split(":")[1]?.split(" ")[0] || "00"
              } ${formData.time?.split(" ")[1] || "AM"}`,
            }))
          }
          className="border p-2"
        >
          <option value="">Hour</option>
          {[...Array(12).keys()].map((h) => (
            <option key={h + 1}>{h + 1}</option>
          ))}
        </select>

        {/* Minute */}
        <select
          required
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              time: `${formData.time?.split(":")[0] || "1"}:${e.target.value} ${
                formData.time?.split(" ")[1] || "AM"
              }`,
            }))
          }
          className="border p-2"
        >
          <option value="">Min</option>
          {["00", "15", "30", "45"].map((m) => (
            <option key={m}>{m}</option>
          ))}
        </select>

        {/* AM/PM */}
        <select
          required
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              time: `${formData.time?.split(":")[0] || "1"}:${
                formData.time?.split(":")[1]?.split(" ")[0] || "00"
              } ${e.target.value}`,
            }))
          }
          className="border p-2"
        >
          <option value="">AM/PM</option>
          <option>AM</option>
          <option>PM</option>
        </select>
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded w-full"
      >
        Book Appointment
      </button>
    </form>
  );
};

export default AppointmentForm;
