import { useEffect, useState } from "react";
import axios from "axios";
import Input from "../../components/Input";
import Button from "../../components/Button";
import AdminNavbar from "../../components/NavbarAdmin";

function ManageAppointment() {
  const [appointments, setAppointments] = useState([]);
  const [timeData, setTimeData] = useState({});

  const doctorId = localStorage.getItem("userId");

  // 🔹 Fetch doctor appointments
  const fetchAppointments = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/appointment/doctor/${doctorId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (res.data.success) {
        setAppointments(res.data.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  // 🔹 Handle date & time input change
  const handleTimeChange = (id, field, value) => {
    setTimeData({
      ...timeData,
      [id]: {
        ...timeData[id],
        [field]: value,
      },
    });
  };

  // ✅ Approve Appointment
  const approveAppointment = async (id) => {
    try {
      const { appointmentDate, appointmentTime } = timeData[id] || {};

      await axios.put(
        `http://localhost:8080/api/appointment/approve/${id}`,
        { appointmentDate, appointmentTime },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      alert("Appointment Approved ✅");
      fetchAppointments();
    } catch (error) {
      alert("Error approving appointment ❌");
    }
  };

  // ❌ Reject Appointment
  const rejectAppointment = async (id) => {
    try {
      await axios.put(
        `http://localhost:8080/api/appointment/reject/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      alert("Appointment Rejected ❌");
      fetchAppointments();
    } catch (error) {
      alert("Error rejecting appointment ❌");
    }
  };

  return (
    <div>
      <AdminNavbar />

      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">📋 Manage Appointments</h2>

        {appointments.map((app) => (
          <div
            key={app._id}
            className="bg-white shadow p-4 mb-4 rounded border"
          >
            <p><b>Patient:</b> {app.patientName}</p>
            <p><b>Email:</b> {app.email}</p>
            <p><b>Phone:</b> {app.phone}</p>
            <p><b>Problem:</b> {app.problem}</p>
            <p><b>Address:</b> {app.address}</p>
            <p><b>Status:</b> {app.status}</p>

            <Input
              type="date"
              value={timeData[app._id]?.appointmentDate || ""}
              onChange={(e) =>
                handleTimeChange(app._id, "appointmentDate", e.target.value)
              }
            />

            <Input
              type="time"
              value={timeData[app._id]?.appointmentTime || ""}
              onChange={(e) =>
                handleTimeChange(app._id, "appointmentTime", e.target.value)
              }
            />

            <div className="flex mt-2">
              <Button
                title="Approve"
                size="small"
                variant="primary"
                onClick={() => approveAppointment(app._id)}
              />

              <Button
                title="Reject"
                size="small"
                variant="secondary"
                onClick={() => rejectAppointment(app._id)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ManageAppointment;