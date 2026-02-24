import { useEffect, useState } from "react";
import axios from "axios";
import NavbarPatient from "../../components/NavbarPatient";
import Footer from "../../components/Footer";
import MyAppointments from "../../assets/myappointment.png";
import toast, { Toaster } from "react-hot-toast";

function MyAppointment() {
  const [appointments, setAppointments] = useState([]);
  const patientId = localStorage.getItem("userId");

  const fetchAppointments = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/appointment/patient/${patientId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      if (res.data.success) {
        setAppointments(res.data.data);
      }
    } catch (err) {
      console.error(err);
      toast.error("You have to login first");
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <div className="bg-gradient-to-r from-slate-100 to-teal-50  min-h-screen    ">
      <NavbarPatient />

      <div className="p-6 min-h-[500px]  flex flex-col items-center justify-center">
        <p className="text-xl md:text-2xl  text-center items-center justify-center mb-4  font-semibold flex flex-row   ">
          <img
            src={MyAppointments}
            alt="MyAppointments"
            className=" h-7 mr-3"
          />
          My <span className="text-green-700 ml-2"> Appointments</span>
        </p>

        {appointments.length === 0 && (
          <p className="text-gray-500 text-center mt-10 text-lg font-semibold">
            No Appointments Found
          </p>
        )}

        {appointments.map((app) => (
          <div
            key={app._id}
            className=" sm:w-[600px]   bg-[#e6f4ef]  shadow  p-4 mb-4  rounded border"
          >
            <p>
              <b>Name:</b> {app.patientName}
            </p>

            <p>
              <b>Problem:</b> {app.problem}
            </p>

            <p>
              <b>Status:</b>
              {app.status === "pending" && (
                <span className="text-yellow-600 ml-2">Pending</span>
              )}
              {app.status === "approved" && (
                <span className="text-green-600 ml-2">Approved</span>
              )}
              {app.status === "rejected" && (
                <span className="text-red-600 ml-2">Rejected</span>
              )}
            </p>

            {app.status === "approved" && (
              <p>
                <b>Date:</b>{" "}
                {new Date(app.appointmentDate).toLocaleDateString()}
                <br />
                <b>Time:</b> {app.appointmentTime}
              </p>
            )}
          </div>
        ))}
      </div>

      <Footer />
      <Toaster/>
    </div>
  );
}

export default MyAppointment;
