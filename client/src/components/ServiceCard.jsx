import PhotoViewer from "./PhotoViewer";

function ServiceCard({ serviceImg, serviceName, department, description }) {
  return (
    <div className=" bg-white  w-[300px] rounded-2xl shadow-md hover:shadow-xl transition duration-300 hover:-translate-y-2">
      <div>
        {serviceImg.map((imgUrl, index) => (
          <PhotoViewer key={index} imgUrl={imgUrl} index={index} />
        ))}
      </div>

      <div className="p-4">
        <h2 className="text-xl font-semibold text-blue-700 mb-1">
          {serviceName}
        </h2>

        <p className="text-sm text-gray-500 mb-2">Department: {department}</p>

        <p className="text-gray-700 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

export default ServiceCard;
