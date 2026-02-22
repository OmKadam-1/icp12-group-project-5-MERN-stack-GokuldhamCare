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
    <>
      <NavbarPatient />
      <div className="min-h-screen flex flex-col items-center p-10">
        <h1 className="text-4xl font-bold text-green-700 mb-10">
          Contact To Our Clinic
        </h1>

        <div className="flex flex-col md:flex-row gap-10 w-full max-w-6xl">
          <div className="bg-white shadow-lg rounded-2xl p-6 w-full border-2 border-solid border-green-500 hover:shadoow-xl/30 hover:shadow-green-600 duration-400">
            <form className="space-y-4">
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

              {/* <textarea
                name="message"
                placeholder="Enter Message"
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              /> */}

              {/* <button
                type="submit"
                className="bg-green-600 text-white w-full py-2 rounded-xl hover:bg-green-700"
              >
                Send Message
              </button> */}

              <div className="text-center mt-4">
                <Button
                  title="Send Message"
                  size="medium"
                  variant="primary"
                  onClick={sendMessage}
                />
              </div>
            </form>

            <div className="w-full">
              <div
                className="w-170 rounded-2xl shadow-xl bg-green-100 border-2 border-solid border-green-500 my-3
          hover:shadoow-xl/30 hover:shadow-green-600 duration-400"
              >
                <h1 className="text-3xl font-bold px-3 py-1 ">
                  Visit Our Clinic
                </h1>
                <h1 className="px-6 font-bold md:font-semibold text-lg">
                  Hadapsar, Pune, Maharashtra
                </h1>
                <h1 className="px-6 italic my-2 text-m">
                  Contact :- 9172896214
                </h1>
                <h1 className="px-6  italic py-2 text-m">
                  Mail :- healthmatrix@gmail.com
                </h1>
              </div>
              <iframe
                title="map"
                className="w-full min-h-[300px] rounded-xl shadow-xl my-7
             border-2 border-solid border-green-600 hover:shadoow-xl/30 hover:shadow-green-600 duration-400"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30584.90662048613!2d73.91881922148384!3d18.497252885849324!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2e9ff81f1aae9%3A0x2560343555ac8b53!2sHadapsar%2C%20Pune%2C%20Maharashtra!5e1!3m2!1sen!2sin!4v1771491556635!5m2!1sen!2sin"
              />
              <div className="w-170 rounded-2xl shadow-xl bg-green-400 border-2 border-solid border-green-900 hover:shadoow-xl/30 hover:shadow-green-600 duration-400">
                <h1 className="text-3xl font-bold px-3 py-1"> Clinic Timing</h1>
                <h1 className="text-m  italic px-7 py-1">
                  {" "}
                  Mon - Sat: 9:00 AM - 6:00 PM
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
export default Contact;