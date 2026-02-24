import { useState, useEffect } from "react";
import axios from "axios";
import Input from "../../components/Input";
import Button from "../../components/Button";
import toast, { Toaster } from "react-hot-toast";
import NavbarPatient from "../../components/NavbarPatient";
import { setPageTitle } from "../../utils";
import Footer from "../../components/Footer";
import Appointment from "../../assets/appointment.png";
import MyAppointments from "../../assets/myappointment.png";
import { Link } from "react-router";

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
        },
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
      toast.error("You have to login first");
    }
  };

  return (
    <div className="bg-gradient-to-r from-slate-100 to-teal-50  min-h-screen    ">
      <NavbarPatient />

      <Link to="/patient/my-appointments">
        <img
          src={MyAppointments}
          alt="MyAppointments"
          className="fixed top-30 right-10 h-10 cursor-pointer"
        />
      </Link>

      <div className="min-h-[640px] flex items-center justify-center    ">
        <div className="w-full max-w-2xl   mx-auto p-6  min-h-[400px] shadow-xl   rounded-xl bg-white border border-green-300 flex flex-col items-center justify-center   ">
          <p className="text-xl md:text-2xl  text-center mb-4  font-semibold flex flex-row   ">
            <img
              src={Appointment}
              alt="Add New Appointment"
              className=" h-9 mr-1"
            />
            Book Your <span className="text-green-700 ml-2"> Appointment</span>
          </p>

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
            type="tel"
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
      </div>

      <Toaster />

      <Footer />
    </div>
  );
}

export default BookAppointment;
