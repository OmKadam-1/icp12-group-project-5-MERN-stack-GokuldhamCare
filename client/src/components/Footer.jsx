import React from "react";
import { Link } from "react-router-dom";
import {
  Phone,
  Mail,
  MapPin,
  ArrowRight,
} from "lucide-react";

import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import logo from "../assets/logo.png"
import Terms from "../views/Terms.jsx";

const Footer = () => {
  const socialIcons = [
    FaFacebookF,
    FaTwitter,
    FaInstagram,
    FaLinkedinIn,
    FaYoutube,
  ];

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Doctors", path: "/doctors" },
    { name: "Services", path: "/services" },
    { name: "Contact", path: "/contact" },
    { name: "Appointments", path: "/appointments" },
  ];

  return (
    <footer className="bg-[#e6f4ef] text-green-800 pt-14 pb-6 px-6 md:px-16">

      <div className="grid md:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-3 mb-4">

            <div className="w-12 h-12 flex items-center justify-center">
              <img
                src={logo}
                alt="HealthMatrix Logo"
                className="w-10 h-10 object-contain"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-green-600">
                <span className="text-black">Health</span>Matrix+
              </h1>
              <p className="text-sm font-semibold">
                Healthcare Solutions
              </p>
            </div>
          </div>

          <p className="text-sm leading-relaxed mb-6">
            Your trusted partner in healthcare innovation.
          </p>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-green-200 p-3 rounded-full">
                <Phone size={18} />
              </div>
              <span>+91 9876543219</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-green-200 p-3 rounded-full">
                <Mail size={18} />
              </div>
              <span>healthmatrixservices@gmail.com</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-green-200 p-3 rounded-full">
                <MapPin size={18} />
              </div>
              <span>Maharashtra, India</span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-4">Quick Links</h3>
          <ul className="space-y-4">
            {quickLinks.map((link, index) => (
              <li key={index}>
                <Link
                  to={link.path}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <span className="bg-green-200 w-8 h-8 flex items-center justify-center rounded-full group-hover:bg-green-600 group-hover:text-white transition">
                    <ArrowRight size={16} />
                  </span>
                  <span className="group-hover:text-green-600 transition">
                    {link.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-4">Our Services</h3>
          <ul className="space-y-4">
            {[
              "Blood Pressure Check",
              "Blood Sugar Test",
              "Full Blood Count",
              "X-Ray Scan",
              "ECG Test",
            ].map((service, index) => (
              <li key={index} className="flex items-center gap-3">
                <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                {service}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-4">Follow Us</h3>

          <div className="flex gap-4 mb-4">
            {socialIcons.map((Icon, index) => (
              <div
                key={index}
                className="w-10 h-10 flex items-center justify-center bg-white rounded-xl shadow hover:bg-green-600 hover:text-white transition cursor-pointer"
              >
                <Icon size={18} />
              </div>
            ))}
          </div>

          <div className="mt-4">
            <a
              href="/terms"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 font-semibold group"
            >
              <span className="w-8 h-8 flex items-center justify-center bg-green-200 rounded-full group-hover:bg-green-600 group-hover:text-white transition">
                <ArrowRight size={16} />
              </span>

              <span className="group-hover:text-green-600 transition">
                Terms & Conditions
              </span>
            </a>

            <p className="text-sm text-green-700 mt-3 leading-relaxed">
              By using our healthcare services, you agree to follow our medical
              guidelines and policies. Please read our terms carefully before
              booking any consultation or service.
            </p>
          </div>
        </div>

      </div>
      <div className="text-center border-t border-green-300 mt-10 pt-4 text-sm">
        <p>© 2026 HealthMatrix+</p>
      </div>

    </footer>
  );
};

export default Footer;