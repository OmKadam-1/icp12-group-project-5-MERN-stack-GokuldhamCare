import { useState } from "react";
import { Trash2 } from "lucide-react";

function PhotoPreview({ imgUrl, show, onClose }) {
  if (!show) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center py-10 bg-gray-900">
      <span
        onClick={onClose}
        className="text-white absolute top-5 right-5 text-3xl cursor-pointer"
      >
        x
      </span>
      <img
        src={imgUrl}
        alt="Preview"
        className="max-w-full max-h-full rounded-md"
      />
    </div>
  );
}

function PhotoViewer({ imgUrl, index, onDelete, showDelete = false }) {
  const [showPreview, setShowPreview] = useState(false);
  return (
   <div className="relative w-full">
  <img
    key={index}
    src={imgUrl}
    alt={`Tour Photo ${index + 1}`}
    className="w-full h-[220px] rounded-t-2xl object-cover cursor-pointer"
    onClick={() => setShowPreview(true)}
  />

  {showDelete && (
    <Trash2
      className="absolute top-3 right-3 h-5 w-5 text-red-500 cursor-pointer bg-white rounded-full p-1 shadow-md hover:scale-110 transition"
      onClick={() => onDelete(imgUrl)}
    />
  )}


      <PhotoPreview
        imgUrl={imgUrl}
        show={showPreview}
        onClose={() => setShowPreview(false)}
      />
    </div>
  );
}

export default PhotoViewer;
