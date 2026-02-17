import { useEffect, useState } from "react";
import axios from "axios";

function MyAppointment() {
  const [appointments, setAppointments] = useState([]);

  // 🔹 Get logged-in patient ID
  const patientId = "PATIENT_ID_HERE"; // replace with login patient id

  const fetchMyAppointments = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/appointment/patient/${patientId}`
      );

      if (res.data.success) {
        setAppointments(res.data.data);
      }
    } catch (err) {
      console.log("Error fetching appointments", err);
    }
  };

  useEffect(() => {
    fetchMyAppointments();
  }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-xl font-bold mb-4">📅 My Appointments</h2>

      {appointments.length === 0 && (
        <p className="text-gray-500">No appointments found</p>
      )}

      {appointments.map((app) => (
        <div
          key={app._id}
          className="bg-white shadow p-4 mb-4 rounded border"
        >
          <p><b>Doctor ID:</b> {app.doctorId}</p>
          <p><b>Problem:</b> {app.problem}</p>

          <p>
            <b>Status:</b>{" "}
            <span
              className={`font-bold ${
                app.status === "approved"
                  ? "text-green-600"
                  : app.status === "rejected"
                  ? "text-red-600"
                  : "text-orange-600"
              }`}
            >
              {app.status}
            </span>
          </p>

          {/* Show date & time only if approved */}
          {app.status === "approved" && (
            <>
              <p><b>Date:</b> {app.appointmentDate}</p>
              <p><b>Time:</b> {app.appointmentTime}</p>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default MyAppointment;
