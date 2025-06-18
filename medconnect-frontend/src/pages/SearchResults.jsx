import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const highlightText = (text, keyword) => {
  const parts = text.split(new RegExp(`(${keyword})`, "gi"));
  return parts.map((part, i) =>
    part.toLowerCase() === keyword.toLowerCase() ? (
      <span key={i} className="bg-yellow-200 font-semibold">
        {part}
      </span>
    ) : (
      part
    )
  );
};

const SearchResults = () => {
  const { keyword } = useParams();
  const navigate = useNavigate();
  const [results, setResults] = useState([]);
  const [specializationFilter, setSpecializationFilter] = useState("All");
  const [allDoctors, setAllDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/doctors");
        setAllDoctors(res.data);
        const filtered = res.data.filter(
          (doctor) =>
            doctor.name.toLowerCase().includes(keyword.toLowerCase()) ||
            doctor.specialization.toLowerCase().includes(keyword.toLowerCase())
        );

        if (filtered.length === 0) {
          navigate("/"); // instant redirect if no results
        } else {
          setResults(filtered);
        }
      } catch (err) {
        console.error("Error fetching doctors:", err);
      }
    };

    fetchDoctors();
  }, [keyword, navigate]);

  const handleFilterChange = (e) => {
    const selected = e.target.value;
    setSpecializationFilter(selected);
    if (selected === "All") {
      setResults(allDoctors);
    } else {
      const filtered = allDoctors.filter(
        (doctor) =>
          doctor.specialization.toLowerCase() === selected.toLowerCase()
      );
      setResults(filtered);
    }
  };

  const specializations = [
    "All",
    ...Array.from(new Set(allDoctors.map((doc) => doc.specialization))),
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">
        Search Results for "<span className="text-blue-600">{keyword}</span>"
      </h2>

      <div className="mb-4">
        <label className="mr-2 font-medium">Filter by Specialization:</label>
        <select
          value={specializationFilter}
          onChange={handleFilterChange}
          className="border border-gray-300 px-3 py-1 rounded"
        >
          {specializations.map((spec) => (
            <option key={spec} value={spec}>
              {spec}
            </option>
          ))}
        </select>
      </div>

      {results.length === 0 ? (
        <div className="text-center mt-6">
          <p className="text-gray-500 mb-2">No matching doctors found.</p>
          <button
            onClick={() => navigate("/")}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Back to Home
          </button>
        </div>
      ) : (
        <ul className="space-y-4">
          {results.map((doc, index) => (
            <li key={index} className="border p-4 rounded shadow bg-white">
              <p>
                <strong>Name:</strong> {highlightText(doc.name, keyword)}
              </p>
              <p>
                <strong>Specialization:</strong>{" "}
                {highlightText(doc.specialization, keyword)}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchResults;
