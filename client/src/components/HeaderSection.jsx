import React from "react";
import { Star } from "lucide-react";
import {
    Calendar,
    Phone,
    ShieldCheck,
    Clock,
    Stethoscope,
    Users,
} from "lucide-react";
import Image from "../assets/doctorteam.png";

const HeroSection = () => {
    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl shadow-xl w-full max-w-5xl p-8 md:p-12 ">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="bg-green-500 text-white p-3 rounded-full shadow-md">
                                <Stethoscope size={24} />
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold">
                                <span className="text-gray-800">Health</span>
                                <span className="text-green-600">Matrix+</span>
                            </h1>
                        </div>
                        <div className="flex gap-1 text-yellow-400 mb-6">
                            {[1, 2, 3, 4, 5].map((item) => (
                                <Star key={item} className="w-5 h-5 fill-current" />
                            ))}
                        </div>
                        <h2 className="text-3xl md:text-4xl font-semibold text-gray-700 leading-snug">
                            Premium Healthcare <br />
                            <span className="text-green-600 font-bold">
                                At Your Fingertips
                            </span>
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                            <Feature icon={<ShieldCheck size={20} />} text="Certified Specialists" />
                            <Feature icon={<Clock size={20} />} text="24/7 Availability" />
                            <Feature icon={<ShieldCheck size={20} />} text="Safe & Secure" />
                            <Feature icon={<Users size={20} />} text="100% Doctors" />
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4 mt-8">
                            <button className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full shadow-lg transition duration-300">
                                <Calendar size={18} />
                                Book Appointment Now
                            </button>

                            <button className="flex items-center justify-center gap-2 bg-red-100 hover:bg-red-200 text-red-600 px-6 py-3 rounded-full shadow-lg transition duration-300">
                                <Phone size={18} />
                                Emergency Call
                            </button>
                        </div>
                    </div>

                    <div className="flex justify-center">
                        <img
                            src={Image}
                            alt="Doctors"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

const Feature = ({ icon, text }) => {
    return (
        <div className="flex items-center gap-3 bg-green-100 hover:bg-green-200 text-gray-700 px-5 py-3 rounded-full shadow-md transition duration-300">
            <div className="text-green-600">{icon}</div>
            <span className="font-medium">{text}</span>
        </div>
    );
};

export default HeroSection;