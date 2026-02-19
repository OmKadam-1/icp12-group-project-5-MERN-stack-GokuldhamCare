import React from 'react'
import NavbarAdmin from '../../components/NavbarAdmin'

function DoctorDashboard() {
  return (
    <div className="min-h-screen bg-[#e6f4ef]">
      <NavbarAdmin />
      <div className="flex justify-center items-center mt-20 px-4">
        <div className="bg-white rounded-3xl shadow-lg p-12 max-w-4xl w-full text-center border border-green-100">
          <img
            src={Logo}
            alt="logo"
            className="w-16 mx-auto mb-6"
          />
          <h1 className="text-4xl font-bold text-green-700 mb-4">
            Welcome TO <span className="text-black" >Health</span>Matrix+
            </h1>
         
          <p className="text-gray-600 mb-10">
            Manage hospital operations, doctors, staff, patient records,
            and system settings from a centralized control panel.
          </p>

          <div className="grid md:grid-cols-3 gap-6">

            <div className="bg-green-50 border border-green-200 p-6 rounded-xl">
              <h3 className="font-semibold text-green-800 mb-2">
                Secure Access
              </h3>
              <p className="text-gray-600 text-sm">
                Role-based login with protected medical data.
              </p>
            </div>

            <div className="bg-green-50 border border-green-200 p-6 rounded-xl">
              <h3 className="font-semibold text-green-800 mb-2">
                Real-time Management
              </h3>
              <p className="text-gray-600 text-sm">
                Monitor hospital activity and patient flow.
              </p>
            </div>

            <div className="bg-green-50 border border-green-200 p-6 rounded-xl">
              <h3 className="font-semibold text-green-800 mb-2">
                Medical Dashboard
              </h3>
              <p className="text-gray-600 text-sm">
                Clean, fast, and doctor-friendly interface.
              </p>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};


export default DoctorDashboard