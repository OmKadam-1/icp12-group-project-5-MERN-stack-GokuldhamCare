import PhotoViewer from "./PhotoViewer";

function ServiceCard({
  serviceImg,
  serviceName,
  department,
  description,
}) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 w-full max-w-md mx-auto">
      <div className="flex flex-wrap gap-2">
        {serviceImg.map((imgUrl, index) => (
          <PhotoViewer key={index} imgUrl={imgUrl} index={index} />
        ))}
      </div>
      <h2 className="text-2xl font-bold mb-2">{serviceName}</h2>
      <p className="text-gray-600 mb-4">{department}</p>
      <p className="text-gray-800 mb-4">{description}</p>
    </div>
  );
}

export default ServiceCard;