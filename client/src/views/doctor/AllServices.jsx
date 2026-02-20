import AdminNavbar from "../../components/AdminNavbar";
import axios from "axios";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { getUserJwtToken } from "../utils";
import addService from "../../assets/addService.png";
import { Link } from "react-router";
import ServiceCard from "../../components/ServiceCard";

function AllServices() {
  const [services, setServices] = useState([]);

  const fetchServices = async () => {
    const userJWT = getUserJwtToken();
    try {
      const response = await axios.get("http://localhost:8080/api/services", {
        headers: {
          Authorization: `Bearer ${userJWT}`,
        },
      });

      if (response.data.success) {
        toast.success(response.data.message);
        setTours(response.data.data);
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
      <AdminNavbar />

      <div className="w-2/3 block mx-auto mt-10">
        <Link to="/service/new">
          <img
            src={addService}
            alt="Add New Service"
            className="fixed bottom-10 right-10 h-10 cursor-pointer"
          />
        </Link>

        {services.map((serviceItem, index) => {
          return <ServiceCard key={index} {...serviceItem} />;
        })}
      </div>

      <Toaster />
    </div>
  );
}

export default AllServices;
