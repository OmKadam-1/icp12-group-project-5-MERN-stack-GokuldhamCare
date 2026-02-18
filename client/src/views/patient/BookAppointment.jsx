import { useState, useEffect } from "react";
import axios from "axios";
import Input from "../../components/Input";
import Button from "../../components/Button";
import toast, { Toaster } from "react-hot-toast";
import NavbarPatient from "../../components/NavbarPatient";
import { setPageTitle } from "../../utils";

function BookAppointment() {
  const [form, setForm] = useState({
    patientName: "",
    email: "",
    phone: "",
    problem: "",
    address: "",
  });

  useEffect(() => {
    setPageTitle("Add Appointment");
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addAppointment = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8080/api/appointment/book",
        form,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log(res.data);

      if (res.data.success) {
        toast.success(res.data.message);

        setForm({
          patientName: "",
          email: "",
          phone: "",
          problem: "",
          address: "",
        });
      } else {
        toast.error(res.data.message);
      }

    } catch (error) {
      console.error(error);
      toast.error("Server Error ❌");
    }
  };

  return (
    <div className="bg-gray-100">
      <NavbarPatient />

      <div className="max-w-xl mx-auto p-6 shadow-lg rounded-xl mt-10 bg-gray-200">
        <h2 className="text-xl font-bold text-center mb-4">
          🏥 Book Appointment
        </h2>

        <Input
          type="text"
          placeholder="Enter Patient Name"
          name="patientName"
          value={form.patientName}
          onChange={handleChange}
        />

        <Input
          type="email"
          placeholder="Enter Your Email"
          name="email"
          value={form.email}
          onChange={handleChange}
        />

        <Input
          type="text"
          placeholder="Enter Your Phone Number"
          name="phone"
          value={form.phone}
          onChange={handleChange}
        />

        <Input
          type="textarea"
          placeholder="Describe your problem"
          name="problem"
          value={form.problem}
          onChange={handleChange}
        />

        <Input
          type="text"
          placeholder="Enter Your Address"
          name="address"
          value={form.address}
          onChange={handleChange}
        />

        <div className="text-center mt-4">
          <Button
            title="Book Appointment"
            size="medium"
            variant="primary"
            onClick={addAppointment}
          />
        </div>
      </div>

      <Toaster position="top" />
    </div>
  );
}

export default BookAppointment;