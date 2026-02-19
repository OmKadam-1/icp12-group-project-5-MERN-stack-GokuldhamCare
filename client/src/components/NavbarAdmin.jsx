import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Calendar,
  Briefcase,
  PlusSquare,
  CalendarCheck,
  Menu,
  X,
} from "lucide-react";

import Logo from "../assets/logo.png";

const NavbarAdmin = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Dashboard", path: "/doctor/dashboard", icon: LayoutDashboard },
    { name: "Appointments", path: "/doctor/manage-appointments", icon: Calendar },
    { name: "Service Dashboard", path: "/admin/service-dashboard", icon: Briefcase },
    { name: "Add Service", path: "/admin/add-service", icon: PlusSquare },
    { name: "Service Appointments", path: "/admin/service-appointments", icon: CalendarCheck },
  ];

  return (
    <div className="relative w-full bg-[#e6f4ef] px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={Logo} alt="logo" className="w-12 h-12" />
          <div>
            <h1 className="text-xl font-bold text-green-600">
              <span className="text-black">Health</span>Matrix+
            </h1>
            <p className="text-xs text-gray-500">Healthcare Solutions</p>
          </div>
        </div>
        <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center bg-white border border-green-200 rounded-full px-6 py-3 shadow-md gap-8">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={index}
                to={item.path}
                className={`flex flex-col items-center text-xs font-medium transition
                  ${isActive
                    ? "text-green-600"
                    : "text-gray-600 hover:text-green-600"}
                `}
              >
                <Icon size={18} />
                {item.name}
              </Link>
            );
          })}
        </div>
        <button
          className="lg:hidden text-green-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

      </div>

      {isOpen && (
        <div className="lg:hidden mt-4 bg-white border border-green-200 rounded-xl shadow-md p-4 space-y-4">

          {navItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={index}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 font-medium transition
                  ${isActive
                    ? "text-green-600"
                    : "text-gray-700 hover:text-green-600"}
                `}
              >
                <Icon size={20} />
                {item.name}
              </Link>
            );
          })}

        </div>
      )}

    </div>
  );
};

export default NavbarAdmin;
