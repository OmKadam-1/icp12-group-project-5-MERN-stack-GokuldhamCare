import { useState } from "react";
import axios from "axios";
import Input from "../../components/Input";
import Button from "../../components/Button";

function BookAppointment() {
  const [form, setForm] = useState({
    patientName: "",
    doctorId: "",
    problem: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/appointment/book",
        form
      );

      if (res.data.success) {
        alert("Appointment Requested Successfully ✅");
        setForm({ patientName: "", doctorId: "", problem: "" });
      } else {
        alert("Failed to book appointment ❌");
      }
    } catch (error) {
      console.log(error);
      alert("Server Error");
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 shadow-lg rounded-xl mt-10">
      <h2 className="text-xl font-bold text-center mb-4">
        🏥 Book Appointment
      </h2>

      {/* Patient Name */}
      <Input
        type="text"
        placeholder="Enter Patient Name"
        name="patientName"
        value={form.patientName}
        onChange={handleChange}
      />

      {/* Doctor ID */}
      <Input
        type="text"
        placeholder="Enter Doctor ID"
        name="doctorId"
        value={form.doctorId}
        onChange={handleChange}
      />

      {/* Problem */}
      <textarea
        name="problem"
        placeholder="Describe your problem"
        value={form.problem}
        onChange={handleChange}
        className="border border-gray-300 rounded px-2 py-1 mx-2 my-1 focus:outline-none focus:ring-2 focus:ring-blue-500 block w-full"
      ></textarea>

      {/* Submit Button */}
      <div className="text-center mt-4">
        <Button title="Book Appointment" size="medium" variant="primary" onClick={handleSubmit} />
      </div>
    </div>
  );
}

export default BookAppointment;