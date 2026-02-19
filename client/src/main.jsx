import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./views/auth/Signup";
import Login from "./views/auth/Login";
import BookAppointment from "./views/patient/BookAppointment";
import DoctorDashboard from "./views/doctor/DoctorDashboard";
import PatientDashboard from "./views/patient/PatientDashboard";
import ManageAppointment from "./views/doctor/ManageAppointment";
import MyAppointments from "./views/patient/MyAppointment";

const root = createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/signup" element={<Signup />} />
       <Route path="/login" element={<Login />} />
      <Route path="/patient/book" element={<BookAppointment />} />
       <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
        <Route path="/" element={<PatientDashboard />} />
      <Route
        path="/doctor/manage-appointments"
        element={<ManageAppointment />}
      />
      <Route path="/patient/my-appointments" element={<MyAppointments />} />
    </Routes>
  </BrowserRouter>,
);
