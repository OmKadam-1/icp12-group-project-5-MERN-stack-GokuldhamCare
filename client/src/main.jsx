import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./views/auth/Signup";
import BookAppointment from "./views/patient/BookAppointment";
import ManageAppointment from "./views/doctor/ManageAppointment";
import MyAppointments from "./views/patient/MyAppointment";

const root = createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/patient/book" element={<BookAppointment />} />
      <Route
        path="/doctor/manage-appointments"
        element={<ManageAppointment />}
      />
      <Route path="/patient/my-appointments" element={<MyAppointments />} />
    </Routes>
  </BrowserRouter>,
);
