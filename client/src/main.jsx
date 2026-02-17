import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./views/Login";
import Signup from "./views/Signup";
import BookAppointment from "./views/patient/BookAppointment";
import ManageAppointment from "./views/doctor/ManageAppointment";

const root = createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/patient/book" element={<BookAppointment />} />
      <Route
        path="/doctor/manage-appointments"
        element={<ManageAppointment />}
      />
    </Routes>
  </BrowserRouter>,
);
