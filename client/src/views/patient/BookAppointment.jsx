import { useState } from "react";
import axios from "axios";
import Input from "../../components/Input";
import Button from "../../components/Button";
import toast, { Toaster } from "react-hot-toast";
import NavbarPatient from "../../components/NavbarPatient";

function BookAppointment() {
  const [form, setForm] = useState({
    patientName: "",
    email: "",
    phone: "",
    problem: "",
    address: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8080/api/appointment/book",
        form,
      );

      if (res.data.success) {
        toast.success("Appointment Requested Successfully ✅");
        setForm({
          patientName: "",
          email: "",
          phone: "",
          problem: "",
          address: "",
        });
      } else {
        toast.error("Failed to book appointment ❌");
      }
    } catch (error) {
      console.log(error);
      toast.error("Server Error");
    }
  };

  return (
    <div className="bg-gray-100">
      <NavbarPatient />
      

      <div className="max-w-xl mx-auto  p-6 shadow-lg rounded-xl mt-10 bg-gray-200">
        <h2 className="text-xl font-bold text-center mb-4">
          🏥 Book Appointment
        </h2>

        <Input
          type={"text"}
          placeholder={"Enter Patient Name"}
          name={"patientName"}
          value={form.patientName}
          onChange={handleChange}
        />

        <Input
          type={"email"}
          placeholder={"Enter Your Email"}
          name={"email"}
          value={form.email}
          onChange={handleChange}
        />

        <Input
          type={"text"}
          placeholder={"Enter Your Phone Number"}
          name={"phone"}
          value={form.phone}
          onChange={handleChange}
        />

        <Input
          type={"textarea"}
          placeholder={"Describe your problem"}
          name={"problem"}
          value={form.problem}
          onChange={handleChange}
        />

        <Input
          type={"text"}
          placeholder={"Enter Your Address"}
          name={"address"}
          value={form.address}
          onChange={handleChange}
        />

        <div className="text-center mt-4">
          <Button
            title="Book Appointment"
            size="medium"
            variant="primary"
            onClick={handleSubmit}
          />
        </div>
      </div>
      <Toaster position="top-right" />
    </div>
  );
}

export default BookAppointment;
