import React from "react";
import Button from "./Button";
import { MedalIcon } from "lucide-react";
import doctor1 from "./../assets/doctor1.jpg"
import doctor2 from "./../assets/doctor2.jpg"
import doctor3 from "./../assets/doctor3.jpg"
import doctor4 from "./../assets/doctor4.jpg"

const doctors = [
    {
        id: 1,
        name: "Dr. Aarav Sharma",
        speciality: "Neurologist",
        experience: "3 years Experience",
        image: doctor1,
    },
    {
        id: 2,
        name: "Dr. Srushti Patel",
        speciality: "Cardiologist",
        experience: "12 years Experience",
        image: doctor2,
    },
    {
        id: 3,
        name: "Dr. Riddhi Verma",
        speciality: "Dermatologist",
        experience: "5 years Experience",
        image: doctor3,
    },
    {
        id: 4,
        name: "Dr. Rohan Mehta",
        speciality: "General Physician",
        experience: "35 years Experience",
        image: doctor4,
    },
];

const TeamSection = () => {
    return (
        <section className="py-20 bg-gradient-to-r from-slate-100 to-teal-50">
            <div className="text-center mb-14">
                <h1 className="text-4xl md:text-5xl font-semibold">
                    Our <span className="text-green-500">Medical Team</span>
                </h1>

                <p className="text-gray-500 mt-3">
                    Book appointments quickly with our verified specialists.
                </p>
            </div>

            <div className="flex flex-wrap justify-center gap-8 px-6">

                {doctors.map((doctor) => (
                    <div
                        key={doctor.id}
                        className="w-[280px] bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 hover:-translate-y-2">

                        <img
                            src={doctor.image}
                            alt={doctor.name}
                            className="w-full h-[220px] object-cover rounded-t-2xl" />
                        <div className="p-5 text-left">

                            <h3 className="text-xl font-semibold">
                                {doctor.name}
                            </h3>

                            <p className="flex items-center gap-2 text-green-500 mb-3">
                                <MedalIcon size={18} />
                                {doctor.speciality}
                            </p>
                            <div className="inline-block border border-emerald-400 text-sm px-4 py-1 rounded-full mb-4">
                                {doctor.experience}
                            </div>
                            <Button
                                title="» Book Now"
                                size="medium"
                                variant="secondary"
                            />


                        </div>
                    </div>
                ))}

            </div>

        </section>
    );
};

export default TeamSection;
