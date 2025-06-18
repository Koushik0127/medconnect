import React, { useState, useEffect } from "react";
import axios from "axios";

export default function TimeTable() {
  const [doctorList, setDoctorList] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [timeTable, setTimeTable] = useState([]);
  const [loading, setLoading] = useState(false);

  const timeSlots = [
    "9:00 AM",
    "9:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "12:30 PM",
    "1:00 PM",
    "1:30 PM",
    "2:00 PM",
    "2:30 PM",
    "3:00 PM",
    "3:30 PM",
    "4:00 PM",
    "4:30 PM",
    "5:00 PM",
    "5:30 PM",
    "6:00 PM",
    "6:30 PM",
    "7:00 PM",
    "7:30 PM",
    "8:00 PM",
  ];

  // Load doctor list from backend
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/doctors");
        setDoctorList(res.data.map((doc) => doc.name));
      } catch (err) {
        console.error("Error loading doctors", err);
      }
    };

    fetchDoctors();
  }, []);

  // Fetch time slots for selected doctor
  useEffect(() => {
    if (!selectedDoctor) return;

    const fetchTimetable = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `http://localhost:5000/api/timetable/${selectedDoctor}`
        );
        setTimeTable(res.data.slots || []);
        setLoading(false);
      } catch (err) {
        console.error("Error loading timetable", err);
        setTimeTable([]);
      }
    };

    fetchTimetable();
  }, [selectedDoctor]);

  const handleSlotClick = async (slot) => {
    if (!selectedDoctor) return;

    try {
      const isBooked = timeTable.includes(slot);
      let updatedSlots = [];

      if (isBooked) {
        updatedSlots = timeTable.filter((s) => s !== slot);
      } else {
        updatedSlots = [...timeTable, slot];
      }

      // Save updated timetable
      await axios.post(
        `http://localhost:5000/api/timetable/${selectedDoctor}`,
        {
          slots: updatedSlots,
        }
      );

      setTimeTable(updatedSlots);
    } catch (err) {
      console.error("Error updating slot", err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 mt-8 bg-white shadow-md rounded-lg space-y-8">
      <h1 className="text-2xl font-bold text-blue-700 mb-4 text-center">
        Doctor Time Table & Booking
      </h1>

      {/* Doctor Selector */}
      <div className="mb-6">
        <label
          htmlFor="doctor"
          className="block text-sm font-semibold text-gray-700 mb-2"
        >
          Select Doctor:
        </label>
        <select
          id="doctor"
          value={selectedDoctor}
          onChange={(e) => setSelectedDoctor(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="" disabled>
            -- Select Doctor --
          </option>
          {doctorList.map((doctor, index) => (
            <option key={index} value={doctor}>
              {doctor}
            </option>
          ))}
        </select>
      </div>

      {/* Time Slot Buttons */}
      {selectedDoctor && (
        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            {loading
              ? "Loading slots..."
              : `Available Slots for ${selectedDoctor}`}
          </h2>
          <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
            {timeSlots.map((slot, index) => {
              const isBooked = timeTable.includes(slot);
              return (
                <button
                  key={index}
                  onClick={() => handleSlotClick(slot)}
                  className={`px-4 py-2 rounded text-sm font-medium transition-all
                    ${
                      isBooked
                        ? "bg-red-500 text-white"
                        : "bg-green-500 text-white hover:bg-green-600"
                    }`}
                >
                  {slot}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {!selectedDoctor && (
        <p className="text-gray-500 text-center">
          Please select a doctor to view available slots.
        </p>
      )}
    </div>
  );
}
