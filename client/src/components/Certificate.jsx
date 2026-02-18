import React from "react";
import certificate1 from "../assets/certificate1.png";
import certificate2 from "../assets/certificate2.svg";
import certificate3 from "../assets/certificate3.svg";
import certificate4 from "../assets/certificate4.png";
import certificate5 from "../assets/certificate5.png";
import certificate6 from "../assets/certificate6.png";

const Certificates = () => {
  const certificates = [
    {
      id: 1,
      name: "Medical Commission",
      image: certificate1,
    },
    {
      id: 2,
      name: "Ministry of Health",
      image: certificate2,
    },
    {
      id: 3,
      name: "Medical Council",
      image: certificate3,
    },
    {
      id: 4,
      name: "NABH Accredited",
      image: certificate4,
    },
    {
      id: 5,
      name: "Government Approved",
      image: certificate5,
    },
    {
      id: 6,
      name: "Quality Healthcare",
      image: certificate6,
    },
  ];

  return (
    <section className="bg-gray-50 py-16">
      <div className="text-center mb-12">

        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="w-16 h-[2px] bg-green-500"></div>

          <h2 className="text-3xl md:text-5xl font-bold text-green-500">
            CERTIFIED & EXCELLENCE
          </h2>

          <div className="w-16 h-[2px] bg-green-500"></div>
        </div>

        <p className="text-gray-500 text-lg mb-6">
          Government recognized and internationally accredited healthcare standards
        </p>

        <div className="inline-flex items-center gap-2 px-6 py-2 border border-green-400 rounded-full bg-green-50">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>

          <span className="text-green-700 font-semibold">
            OFFICIALLY CERTIFIED
          </span>
        </div>

      </div>
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 px-4">

        {certificates.map((cert) => (
          <div
            key={cert.id}
            className="flex flex-col items-center hover:scale-110 transition duration-300 cursor-pointer"
          >
            <img
              src={cert.image}
              alt={cert.name}
              className="w-20 h-20 object-contain mb-3"
            />

            <p className="font-semibold text-gray-700 text-center">
              {cert.name}
            </p>
          </div>
        ))}

      </div>

    </section>
  );
};

export default Certificates;
