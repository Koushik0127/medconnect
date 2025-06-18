import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Overview() {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  const loggedInEmail = loggedInUser?.email;

  const [formData, setFormData] = useState({
    gender: "",
    dob: "",
    nextOfKin: "",
    prevVisit: "",
    nextVisit: "",
    allergies: "",
    files: [],
  });

  const [overviewData, setOverviewData] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (loggedInEmail) {
      axios
        .get(`http://localhost:5000/api/overview/${loggedInEmail}`)
        .then((res) => {
          if (res.data) {
            setOverviewData(res.data);
            setFormData({
              gender: res.data.gender || "",
              dob: res.data.dob?.slice(0, 10) || "",
              nextOfKin: res.data.nextOfKin || "",
              prevVisit: res.data.prevVisit?.slice(0, 10) || "",
              nextVisit: res.data.nextVisit?.slice(0, 10) || "",
              allergies: res.data.allergies || "",
              files: res.data.files || [],
            });
          }
        })
        .catch((err) => {
          console.log("No existing overview:", err);
        });
    }
  }, [loggedInEmail]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    axios
      .post("http://localhost:5000/api/overview/save", {
        email: loggedInEmail,
        ...formData,
      })
      .then((res) => {
        setMessage("Overview saved successfully!");
        setOverviewData(res.data);
      })
      .catch((err) => {
        console.error("Save error:", err);
        setMessage("Failed to save overview");
      });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Patient Overview</h1>

      <div className="space-y-4 max-w-lg">
        {/* GENDER - dropdown */}
        <div>
          <label>Gender:</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="border w-full p-2"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* DATE OF BIRTH */}
        <div>
          <label>Date of Birth:</label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            className="border w-full p-2"
          />
        </div>

        {/* NEXT OF KIN */}
        <div>
          <label>Next of Kin:</label>
          <input
            type="text"
            name="nextOfKin"
            value={formData.nextOfKin}
            onChange={handleChange}
            className="border w-full p-2"
          />
        </div>

        {/* PREVIOUS VISIT */}
        <div>
          <label>Previous Visit:</label>
          <input
            type="date"
            name="prevVisit"
            value={formData.prevVisit}
            onChange={handleChange}
            className="border w-full p-2"
          />
        </div>

        {/* NEXT VISIT */}
        <div>
          <label>Next Visit:</label>
          <input
            type="date"
            name="nextVisit"
            value={formData.nextVisit}
            onChange={handleChange}
            className="border w-full p-2"
          />
        </div>

        {/* ALLERGIES */}
        <div>
          <label>Allergies:</label>
          <input
            type="text"
            name="allergies"
            value={formData.allergies}
            onChange={handleChange}
            className="border w-full p-2"
          />
        </div>

        {/* SAVE BUTTON */}
        <button
          onClick={handleSave}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Save
        </button>
      </div>

      {/* MESSAGE */}
      {message && <p className="text-center text-blue-600 mt-4">{message}</p>}

      {/* TABLE TO SHOW SAVED OVERVIEW */}
      {overviewData && (
        <div className="mt-8 max-w-2xl mx-auto">
          <h2 className="text-xl font-semibold mb-4 text-center">
            Saved Overview
          </h2>
          <table className="w-full border-collapse border border-gray-300">
            <tbody>
              <tr>
                <td className="border p-2 font-bold">Gender</td>
                <td className="border p-2">{overviewData.gender}</td>
              </tr>
              <tr>
                <td className="border p-2 font-bold">DOB</td>
                <td className="border p-2">{overviewData.dob?.slice(0, 10)}</td>
              </tr>
              <tr>
                <td className="border p-2 font-bold">Next of Kin</td>
                <td className="border p-2">{overviewData.nextOfKin}</td>
              </tr>
              <tr>
                <td className="border p-2 font-bold">Previous Visit</td>
                <td className="border p-2">
                  {overviewData.prevVisit?.slice(0, 10)}
                </td>
              </tr>
              <tr>
                <td className="border p-2 font-bold">Next Visit</td>
                <td className="border p-2">
                  {overviewData.nextVisit?.slice(0, 10)}
                </td>
              </tr>
              <tr>
                <td className="border p-2 font-bold">Allergies</td>
                <td className="border p-2">{overviewData.allergies}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
