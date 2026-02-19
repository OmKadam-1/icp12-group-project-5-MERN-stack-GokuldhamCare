import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./views/auth/Signup";
import Login from "./views/auth/Login";
import BookAppointment from "./views/patient/BookAppointment";
import DoctorDashboard from "./views/doctor/DoctorDashboard";
import PatientDashboard from "./views/patient/PatientDashboard";
import ManageAppointment from "./views/doctor/ManageAppointment";
import MyAppointment from "./views/patient/MyAppointment";
import Contact from "./views/patient/Contact";
import DoctorInbox from "./views/doctor/DoctorInbox";

const root = createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/signup" element={<Signup />} />
       <Route path="/login" element={<Login />} />
      <Route path="/patient/book" element={<BookAppointment />} />
      <Route path="/patient/contact" element={<Contact />} />
       <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
       <Route path="/doctor/doctor-inbox" element={<DoctorInbox />} />
        <Route path="/" element={<PatientDashboard />} />
      <Route
        path="/doctor/manage-appointments"
        element={<ManageAppointment />}
      />
      <Route path="/patient/my-appointments" element={<MyAppointment />} />
    </Routes>
  </BrowserRouter>,
);
