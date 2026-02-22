import { useEffect, useState } from "react";
import axios from "axios";
import NavbarAdmin from "../../components/NavbarAdmin";
import toast, { Toaster } from "react-hot-toast";

function RecievdContact() {
  const [contact, setContact] = useState([]);

  const fetchContact = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/contact");

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
    <div>
      <NavbarAdmin />

      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">📋 Manage Appointments</h2>

        {contact.map((cont) => (
          <div
            key={cont._id}
            className="bg-white shadow p-4 mb-4 rounded border"
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
      <Toaster />
    </div>
  );
}

export default RecievdContact;