import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Logo from "../assets/logo.png";
import Avatar from "./Avatar";
import Button from "./Button";
import { isUserLoggedIn, logoutUser } from "../utils";

const NavbarPatient = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  // Check login status
  const loggedIn = isUserLoggedIn();

  // Get role for avatar display
  const role = localStorage.getItem("role") || "User";

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Doctors", path: "/doctors" },
    { name: "Services", path: "/service/viewservices" },
    { name: "Appointments", path: "/patient/book" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      <div className="fixed top-0 left-0 z-50 h-1 bg-green-500 w-full"></div> 

      <nav className="fixed top-1 left-0 w-full z-40 bg-gray-100 px-6 md:px-12 py-4 flex items-center justify-between shadow-sm">

        <Link to="/" className="flex items-center gap-3 cursor-pointer">
          <img src={Logo} alt="logo" className="w-14" />
          <div>
            <h1 className="text-2xl font-bold text-green-600">
              <span className="text-black">Health</span>Matrix+
            </h1>
            <p className="text-sm text-gray-600">
              Healthcare Solutions
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center bg-white border border-green-400 rounded-full px-8 py-3 shadow-md space-x-10">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`font-medium transition-all duration-300 px-5 py-2 rounded-full
                 ${
                   isActive
                     ? "bg-green-500 text-white shadow-md"
                     : "text-gray-700 hover:bg-green-100 hover:text-green-600"
                 }`}
              >
                {item.name}
              </Link>
            );
          })}
        </div>

        {/* Right Side (Desktop) */}
        <div className="hidden lg:flex items-center gap-4">
          <Link
            to="/login"
            className="flex items-center gap-2 border-2 border-green-600 text-green-600 px-5 py-2 rounded-full font-medium hover:bg-green-600 hover:text-white transition"
          >
            Doctor/Patient
          </Link>

          <Link
            to="/signup"
            className="bg-green-500 text-white px-6 py-2 rounded-full font-medium shadow-md hover:bg-green-600 transition"
          >
            Registration
          </Link>
        </div>

        <div className="lg:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="fixed top-[85px] left-0 w-full z-30 lg:hidden bg-white shadow-md px-6 py-6 space-y-5">

          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMenuOpen(false)}
              className="block w-full text-left text-gray-700 font-medium hover:text-green-600 transition"
            >
              {item.name}
            </Link>
          ))}

          <hr />

          {!loggedIn && (
            <>
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="block w-full border-2 border-green-600 text-green-600 py-2 rounded-full font-medium hover:bg-green-600 hover:text-white transition text-center"
              >
                Doctor/Patient
              </Link>

              <Link
                to="/signup"
                onClick={() => setMenuOpen(false)}
                className="block w-full bg-green-500 text-white py-2 rounded-full font-medium hover:bg-green-600 transition text-center"
              >
                Registration
              </Link>
            </>
          )}

          {loggedIn && (
            <div className="flex items-center justify-between">
              <Avatar name={role} size="small" />
              <Button
                title="Logout"
                size="small"
                variant="secondary"
                onClick={() => {
                  logoutUser();
                  setMenuOpen(false);
                }}
              />
            </div>
          )}
        </div>
      )}

      <div className="h-[90px]"></div>

    </>
  );
};

export default NavbarPatient;
