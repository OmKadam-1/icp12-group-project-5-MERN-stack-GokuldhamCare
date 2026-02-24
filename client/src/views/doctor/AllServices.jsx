import axios from "axios";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import addService from "../../assets/addService.png";
import { Link } from "react-router";
import ServiceCard from "../../components/ServiceCard";
import NavbarAdmin from "../../components/NavbarAdmin.jsx";
import Footer from "../../components/Footer.jsx";

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
    <div className="bg-gradient-to-r from-slate-100 to-teal-50   min-h-screen ">
      <NavbarAdmin />

     
        <Link to="/service/new">
          <img
            src={addService}
            alt="Add New Service"
            className="fixed top-30 right-10 h-10 cursor-pointer"
          />
        </Link>

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
