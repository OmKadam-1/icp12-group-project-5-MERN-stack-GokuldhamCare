import { useEffect, useState } from "react";
import axios from "axios";
import NavbarAdmin from "../../components/NavbarAdmin";
import toast, { Toaster } from "react-hot-toast";
import Footer from "../../components/FooterAdmin.jsx";

function RecievdContact() {
  const [contact, setContact] = useState([]);

  const fetchContact = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/contact`);

      if (response.data.success) {
        toast.success(response.data.message);
        setContact(response.data.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching contact:", error);
      toast.error("Failed to fetch contact");
    }
  };
  useEffect(() => {
    fetchContact();
  }, []);

  return (
    <div className="bg-gradient-to-r from-slate-100 to-teal-50   min-h-screen ">
      <NavbarAdmin />
      <p className="text-xl md:text-2xl  font-semibold text-center mb-4 mt-4">
        Patient Messages <span className="text-green-700">Inbox</span>
      </p>
      <div className="min-h-[640px] flex items-center justify-center    ">
        <div className="p-6 flex flex-wrap   gap-9 justify-center ">
          {contact.map((cont) => (
            <div
              key={cont._id}
              className=" sm:w-[600px] bg-[#e6f4ef]  shadow-lg p-4 mb-4 rounded border"
            >
              <p>
                <b>Name:</b> {cont.name}
              </p>
              <p>
                <b>Email:</b> {cont.email}
              </p>
              <p>
                <b>Phone:</b> {cont.phone}
              </p>
              <p>
                <b>Address:</b> {cont.address}
              </p>
              <p>
                <b>Message:</b> {cont.message}
              </p>
            </div>
          ))}
        </div>
      </div>
      <Toaster />
      <Footer />
    </div>
  );
}

export default RecievdContact;
