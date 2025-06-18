import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // for redirect

const pricingData = [
  {
    title: "General Consultation",
    price: "₹500",
    doctor: "Dr. Kavita Sen",
    available: "Mon to Sat - 9am to 12pm",
    features: [
      "15-minute consultation",
      "General health checkup",
      "Basic prescription",
    ],
  },
  {
    title: "Specialist Consultation",
    price: "₹1000",
    doctor: "Dr. Rahul Desai",
    available: "Mon to Fri - 9am to 12pm",
    features: [
      "30-minute consultation",
      "Specialist doctor",
      "Advanced diagnosis",
    ],
  },
  {
    title: "Full Body Health Checkup",
    price: "₹3000",
    doctor: "Dr. Meera Joshi",
    available: "Mon, Wed, Fri - 10am to 2pm",
    features: [
      "Complete blood test",
      "X-ray & ECG",
      "Doctor consultation",
      "Report discussion",
    ],
  },
  {
    title: "Pediatric Consultation",
    price: "₹700",
    doctor: "Dr. Imran Ali",
    available: "Mon to Sat - 10am to 1pm",
    features: [
      "Child health checkup",
      "Vaccination review",
      "Growth monitoring",
    ],
  },
];

const OurPricing = () => {
  const navigate = useNavigate(); // React Router navigation
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleBookNow = (plan) => {
    setSelectedPlan(plan);
    setShowModal(true);
  };

  const handleConfirmBooking = () => {
    setShowModal(false);
    // Redirect to /appointment with doctor and time in URL params
    navigate(
      `/appointment?doctor=${encodeURIComponent(
        selectedPlan.doctor
      )}&time=${encodeURIComponent(selectedPlan.available)}`
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 bg-gradient-to-br from-purple-50 to-white min-h-screen text-gray-800">
      <h1 className="text-4xl font-bold text-center text-purple-800 mb-12">
        Our Pricing
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {pricingData.map((plan, idx) => (
          <div
            key={idx}
            className="bg-white border border-gray-200 rounded-lg shadow-md p-6 flex flex-col justify-between hover:shadow-xl transition"
          >
            <div>
              <h2 className="text-2xl font-semibold text-purple-700 mb-2">
                {plan.title}
              </h2>
              <p className="text-3xl font-bold text-gray-900 mb-4">
                {plan.price}
              </p>

              <p className="text-sm text-gray-600 mb-2">
                <strong>Doctor:</strong> {plan.doctor}
              </p>
              <p className="text-sm text-gray-600 mb-4">
                <strong>Available:</strong> {plan.available}
              </p>

              <ul className="space-y-2 text-sm text-gray-700 mb-6">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center">
                    <span className="ml-2">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              className="mt-auto bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
              onClick={() => handleBookNow(plan)}
            >
              Book Now
            </button>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && selectedPlan && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96 text-center space-y-4">
            <h2 className="text-xl font-bold text-purple-700">
              Confirm Your Booking
            </h2>
            <p className="text-md text-gray-700">
              <strong>Plan:</strong> {selectedPlan.title}
            </p>
            <p className="text-md text-gray-700">
              <strong>Doctor:</strong> {selectedPlan.doctor}
            </p>
            <p className="text-md text-gray-700">
              <strong>Available:</strong> {selectedPlan.available}
            </p>

            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={handleConfirmBooking}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Confirm
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OurPricing;
