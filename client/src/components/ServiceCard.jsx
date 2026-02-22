import PhotoViewer from "./PhotoViewer";
import Servicelogo from "../assets/servicelogo.png";

function ServiceCard({ serviceImg, serviceName, department, description }) {
  return (
    <div className="w-[280px] bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 hover:-translate-y-2">
      <div>
        {serviceImg.map((imgUrl, index) => (
          <PhotoViewer key={index} imgUrl={imgUrl} index={index} />
        ))}
      </div>

      <div className="p-4 ">
        <h2
          className="text-xl flex
         font-semibold mb-2    "
        >
          {" "}
          <img src={Servicelogo} alt="Add New Service" className=" h-6 mt-1 mr-1 " />
          {serviceName}
        </h2>

        <div  className="inline-block border border-emerald-400 text-sm px-4 py-1 rounded-full mb-2">
          {" "}
          {department}
        </div>

        <p className="text-gray-700 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

export default ServiceCard;
