import axios from "axios";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import ServiceCard from "../../components/ServiceCard";
import NavbarPatient from "../../components/NavbarPatient.jsx";
import Footer from "../../components/Footer.jsx";

function AllServices() {
  const [services, setServices] = useState([]);

  const fetchServices = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/services`);

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
    <div  className="bg-gradient-to-r from-slate-100 to-teal-50   min-h-screen ">
      <NavbarPatient />

      <div className="flex flex-wrap justify-center  gap-9  p-15">
        {services.map((serviceItem, index) => {
          return <ServiceCard key={index} {...serviceItem} />;
        })}
      </div>

      <Toaster /> 
       <Footer />
    </div>
  );
}

export default AllServices;
