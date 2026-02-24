import Service from "../models/Service.js";
import User from "../models/User.js";

import dotenv from "dotenv";
dotenv.config();

const postSerivice = async (req, res) => {

  const { serviceName, department, description, serviceImg } = req.body;

  const newService = new Service({
    serviceName,
    department,
    description,
    serviceImg,
    createdBy: req.user.id,
  });

  try {
    const saveService = await newService.save();
    return res.json({
      success: true,
      message: "Service created successfully",
      data: saveService,
    });
  } catch (error) {
    console.error("Error creating service:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create service",
      error: error.message,
    });
  }
}

const getService = async (req, res) => {
  try {
    const services = await Service.find().populate("createdBy", "email");

    return res.json({
      success: true,
      message: "Services fetched successfully",
      data: services,
    });
  } catch (error) {
    console.error("Error fetching services:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch services",
      error: error.message,
    });
  }
}

export { postSerivice , getService };