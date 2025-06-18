import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

// ✅ Import both context providers
import { UserProvider } from "./context/UserContext";
import { DoctorProvider } from "./context/DoctorContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      {/* ✅ Wrap DoctorProvider outside of UserProvider */}
      <DoctorProvider>
        <UserProvider>
          <App />
        </UserProvider>
      </DoctorProvider>
    </BrowserRouter>
  </React.StrictMode>
);
