import { useEffect, useState, useRef } from "react";
import { setPageTitle, getUserJwtToken } from "../../utils";
import NavbarAdmin from "../../components/NavbarAdmin";
import Button from "../../components/Button.jsx";
import Input from "../../components/Input";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import {
  ImageKitAbortError,
  ImageKitInvalidRequestError,
  ImageKitServerError,
  ImageKitUploadNetworkError,
  upload,
} from "@imagekit/react";
import PhotoViewer from "../../components/PhotoViewer.jsx";
import Footer from "../../components/Footer.jsx";
import Servicelogo from "../../assets/servicelogo.png";

function AddServices() {
  const [newService, setNewService] = useState({
    serviceName: "",
    department: "",
    description: "",
    serviceImg: [],
  });

  const [progress, setProgress] = useState(0);

  const fileInputRef = useRef();

  const authenticator = async () => {
    try {
      // Perform the request to the upload authentication endpoint.
      const response = await fetch("http://localhost:8080/auth");
      if (!response.ok) {
        // If the server response is not successful, extract the error text for debugging.
        const errorText = await response.text();
        throw new Error(
          `Request failed with status ${response.status}: ${errorText}`,
        );
      }

      // Parse and destructure the response JSON for upload credentials.
      const data = await response.json();
      const { signature, expire, token, publicKey } = data;
      return { signature, expire, token, publicKey };
    } catch (error) {
      // Log the original error for debugging before rethrowing a new error.
      console.error("Authentication error:", error);
      throw new Error("Authentication request failed");
    }
  };

  const handleUpload = async () => {
    const fileInput = fileInputRef.current;
    if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
      alert("Please select a file to upload");
      return;
    }

    const file = fileInput.files[0];

    let authParams;
    try {
      authParams = await authenticator();
    } catch (authError) {
      console.error("Failed to authenticate for upload:", authError);
      return;
    }
    const { signature, expire, token, publicKey } = authParams;

    try {
      const uploadResponse = await upload({
        expire,
        token,
        signature,
        publicKey,
        file,
        fileName: file.name,
        onProgress: (event) => {
          setProgress((event.loaded / event.total) * 100);
        },
      });

      setNewService({
        ...newService,
        serviceImg: [...newService.serviceImg, uploadResponse.url],
      });
      setProgress(0);
      fileInput.value = "";
    } catch (error) {
      console.log(error);

      if (error instanceof ImageKitAbortError) {
        console.error("Upload aborted:", error.reason);
      } else if (error instanceof ImageKitInvalidRequestError) {
        console.error("Invalid request:", error.message);
      } else if (error instanceof ImageKitUploadNetworkError) {
        console.error("Network error:", error.message);
      } else if (error instanceof ImageKitServerError) {
        console.error("Server error:", error.message);
      } else {
        // Handle any other errors that may occur.
        console.error("Upload error:", error);
      }
    }
  };

  const addService = async () => {
    const response = await axios.post(
      "http://localhost:8080/api/services",
      newService,
      {
        headers: {
          Authorization: `Bearer ${getUserJwtToken()}`,
        },
      },
    );
    console.log(response.data);
    if (response.data.success) {
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  };

  useEffect(() => {
    setPageTitle("Add New Service");
  }, []);

  return (
    <div className="bg-gradient-to-r from-slate-100 to-teal-50  min-h-screen    ">
      <NavbarAdmin />

      <div className="min-h-[640px] flex items-center justify-center    ">
        <div className="w-full max-w-2xl   mx-auto p-6  min-h-[400px] shadow-xl   rounded-xl bg-white border border-green-300 flex flex-col items-center justify-center   ">
          <p className="text-xl md:text-2xl  text-center mb-4  font-semibold flex flex-row items-center   ">
            <img
              src={Servicelogo}
              alt="Add New Service"
              className=" h-6 mt-1 mr-2 "
            />
            Add new <span className="text-green-700 ml-2 ">Service</span>
          </p>

          <div className="flex gap-x-2">
            {newService.serviceImg?.map((serviceImg, index) => (
              <PhotoViewer
                key={index}
                imgUrl={serviceImg}
                index={index}
                onDelete={(url) => {
                  setNewService({
                    ...newService,
                    serviceImg: newService.serviceImg.filter(
                      (serviceImg) => serviceImg !== url,
                    ),
                  });
                }}
                showDelete
              />
            ))}
          </div>
          <Input
            type="text"
            placeholder="Enter Service Name"
            value={newService.serviceName}
            onChange={(e) => {
              setNewService({
                ...newService,
                serviceName: e.target.value,
              });
            }}
          />

          <Input
            type="text"
            placeholder="Enter Department"
            value={newService.department}
            onChange={(e) => {
              setNewService({
                ...newService,
                department: e.target.value,
              });
            }}
          />
          <Input
            type="text"
            placeholder="Enter Description"
            value={newService.description}
            onChange={(e) => {
              setNewService({
                ...newService,
                description: e.target.value,
              });
            }}
          />

          <Input
            type="file"
            ref={fileInputRef}
            onChange={(e) => {
              if (e.target.files.length > 0) {
                handleUpload();
              }
            }}
          />
          {progress > 0 ? `Uploading... ${progress}%` : null}

          <div className="text-center mt-4">
            <Button
              title="Add Service"
              size="medium"
              variant="primary"
              onClick={addService}
            />
          </div>
        </div>
      </div>

      <Toaster />
      <Footer />
    </div>
  );
}

export default AddServices;
