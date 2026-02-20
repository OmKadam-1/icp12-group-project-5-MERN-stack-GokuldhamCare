import axios from "axios";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import ServiceCard from "../../components/ServiceCard";
import NavbarPatient from "../../components/NavbarPatient.jsx";

function AllServices() {
  const [services, setServices] = useState([]);

  const fetchServices = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/services");

      if (response.data.success) {
        toast.success(response.data.message);
        setServices(response.data.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching services:", error);
      toast.error("Failed to fetch services");
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <div>
      <NavbarPatient />

      <div className="w-2/3 block mx-auto mt-10">
        {services.map((serviceItem, index) => {
          return <ServiceCard key={index} {...serviceItem} />;
        })}
      </div>

      <Toaster />
    </div>
  );
}

export default AllServices;
