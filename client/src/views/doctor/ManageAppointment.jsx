import { useEffect, useState } from "react";
import axios from "axios";
import Input from "../../components/Input";
import Button from "../../components/Button";

function ManageAppointment() {
  const [appointments, setAppointments] = useState([]);
  const [timeData, setTimeData] = useState({}); // store date & time for each appointment

  // 🔹 Fetch doctor appointments
  const fetchAppointments = async () => {
    const doctorId = "DOCTOR_ID_HERE"; // replace with logged-in doctor id

    const res = await axios.get(
      `http://localhost:5000/api/appointment/doctor/${doctorId}`
    );

    if (res.data.success) {
      setAppointments(res.data.data);
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
    const { appointmentDate, appointmentTime } = timeData[id] || {};

    await axios.put(`http://localhost:5000/api/appointment/approve/${id}`, {
      appointmentDate,
      appointmentTime,
    });

    alert("Appointment Approved ✅");
    fetchAppointments();
  };

  // ❌ Reject Appointment
  const rejectAppointment = async (id) => {
    await axios.put(`http://localhost:5000/api/appointment/reject/${id}`);
    alert("Appointment Rejected ❌");
    fetchAppointments();
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">📋 Manage Appointments</h2>

      {appointments.map((app) => (
        <div
          key={app._id}
          className="bg-white shadow p-4 mb-4 rounded border"
        >
          <p><b>Patient:</b> {app.patientName}</p>
          <p><b>Problem:</b> {app.problem}</p>
          <p><b>Status:</b> {app.status}</p>

          {/* Date Input */}
          <Input
            type="date"
            placeholder="Appointment Date"
            value={timeData[app._id]?.appointmentDate || ""}
            onChange={(e) =>
              handleTimeChange(app._id, "appointmentDate", e.target.value)
            }
          />

          {/* Time Input */}
          <Input
            type="time"
            placeholder="Appointment Time"
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
  );
}

export default ManageAppointment;