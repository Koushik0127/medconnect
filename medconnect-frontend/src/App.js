import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

// Context Providers
import { UserProvider } from "./context/UserContext";
import { DoctorProvider } from "./context/DoctorContext";

// Layout Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import DoctorPage from "./pages/DoctorPage";
import Appointment from "./pages/Appointment";
import Profile from "./pages/Profile";
import Overview from "./pages/Overview";
import TimeTable from "./pages/TimeTable";
import Pricing from "./pages/Pricing";
import Location from "./pages/Location";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import FAQ from "./pages/FAQ";
import SearchResults from "./pages/SearchResults";

const App = () => {
  useEffect(() => {
    fetch("http://localhost:5000/api/auth/test")
      .then((res) => res.json())
      .then((data) => console.log(" Backend Connected:", data))
      .catch((err) => console.error(" Backend Not Connected:", err));
  }, []);

  return (
    <UserProvider>
      <DoctorProvider>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/doctors" element={<DoctorPage />} />
              <Route path="/appointment" element={<Appointment />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/overview" element={<Overview />} />
              <Route path="/timetable" element={<TimeTable />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/location" element={<Location />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/search/:keyword" element={<SearchResults />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </DoctorProvider>
    </UserProvider>
  );
};

export default App;
