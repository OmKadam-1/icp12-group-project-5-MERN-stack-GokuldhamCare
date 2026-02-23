import { useState, useEffect } from "react";
import axios from "axios";
import Input from "../../components/Input";
import Button from "../../components/Button";
import toast, { Toaster } from "react-hot-toast";
import NavbarPatient from "../../components/NavbarPatient";
import Footer from "../../components/Footer";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const sendMessage = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/contact",
        form,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      console.log(response.data);

      if (res.data.success) {
        toast.success(res.data.message);

        setForm({
          name: "",
          email: "",
          phone: "",
          address: "",
          message: "",
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
      <div className=" flex flex-col items-center justify-center p-10">
        <h1 className="text-4xl md:text-5xl font-semibold  mb-10">
          Contact <span className="text-green-500">To Our Clinic</span>
        </h1>

        <div className="flex flex-col md:flex-row gap-10 w-full max-w-6xl">
          <div className="w-full max-w-2xl  mx-auto p-6  min-h-[400px] shadow-xl   rounded-xl bg-white border border-green-300 flex flex-col items-center justify-center ">
            <p className="text-xl md:text-2xl  text-center mb-5  font-semibold   ">
              {" "}
              Feel Free to <span className="text-green-700 ">Contact Us</span>
            </p>
            <Input
              name="name"
              type="text"
              placeholder="Enter Your Name"
              value={form.name}
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
              type="text"
              placeholder="Enter Your Address"
              name="address"
              value={form.address}
              onChange={handleChange}
            />

            <Input
              type="textarea"
              placeholder="Describe your message"
              name="message"
              value={form.message}
              onChange={handleChange}
            />

            <div className="text-center mt-4">
              <Button
                title="Send Message"
                size="medium"
                variant="primary"
                onClick={sendMessage}
              />
            </div>

            <div className="w-full mt-5 rounded-2xl shadow-lg bg-gradient-to-r from-slate-100 to-teal-50  border border-green-300 p-2 flex flex-col items-center justify-center">
              <p className="text-3xl md:text-4xl font-semibold mb-3"> Clinic Timing</p>
              <p className="text-sm  italic px-7 py-1">
                {" "}
                Mon - Sat: 9:00 AM - 6:00 PM
              </p>
            </div>
          </div>

          <div>
            <div
              className="w-full rounded-2xl shadow-lg bg-white p-2    border border-green-300 flex flex-col items-center justify-center"
            >
              <p className="text-3xl md:text-4xl font-semibold mb-3">
                Visit Our <span className="text-green-700 ">Clinic</span>
              </p>

             
              <h1 className="font-bold md:font-semibold text-lg">
                Hadapsar, Pune, Maharashtra
              </h1>
              <h1 className=" italic  text-m">Contact :- +91 9876543219</h1>
              <h1 className=" italic  text-m">
                Mail :- healthmatrix@gmail.com
              </h1>
            </div>


            <iframe
              title="map"
              className="w-full min-h-[300px] rounded-xl shadow-xl my-7
             border-2 border-solid border-green-600 hover:shadoow-xl/30 hover:shadow-green-600 duration-400"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30584.90662048613!2d73.91881922148384!3d18.497252885849324!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2e9ff81f1aae9%3A0x2560343555ac8b53!2sHadapsar%2C%20Pune%2C%20Maharashtra!5e1!3m2!1sen!2sin!4v1771491556635!5m2!1sen!2sin"
            />

          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
export default Contact;
