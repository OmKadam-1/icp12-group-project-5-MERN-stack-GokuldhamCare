import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./db.js";
import User from "./models/User.js";
import ImageKit from "@imagekit/nodejs";


import bcrypt from "bcryptjs";

import { registerPatient, loginUser } from "./controllers/authController.js";
import { postAppointment, getPatientAppointments, getDoctorAppointments, approveAppointment, rejectAppointment } from "./controllers/appointment.js";
import { authenticateJWT, authorizeRole } from "./middlewares/authMiddleware.js";
import Service from "./models/Service.js";


dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 8080;



const client = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});


const createDoctor = async () => {
  try {
    const existingAdmin = await User.findOne({
      email: process.env.DOCTOR_EMAIL
    });

    if (existingAdmin) return;

    const hashedPassword = await bcrypt.hash(
      process.env.DOCTOR_PASSWORD,
      10
    );

    await User.create({
      email: process.env.DOCTOR_EMAIL,
      password: hashedPassword,
      role: "DOCTOR"
    });

    console.log("Doctor created successfully");
  } catch (error) {
    console.error("Doctor creation error:", error.message);
  }
};

app.get("/", (req, res) => {
  res.json({ message: "Welcome" });
});

app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

app.post("/api/auth/register", registerPatient);

app.post("/api/auth/login", loginUser);


app.get('/auth', function (req, res) {
    const { token, expire, signature } = client.helper.getAuthenticationParameters();
    res.send({ token, expire, signature, publicKey: process.env.IMAGEKIT_PUBLIC_KEY });
});

// api for booking appointment
app.post("/api/appointment/book", authenticateJWT,
  authorizeRole("PATIENT"), postAppointment);

// api for fetching appointments for a patient
app.get("/api/appointment/patient/:patientId", authenticateJWT,
  authorizeRole("PATIENT"), getPatientAppointments);

// api for fetching appointments for a doctor
app.get("/api/appointment/doctor/:doctorId", authenticateJWT,
  authorizeRole("DOCTOR"), getDoctorAppointments);

// api for approving an appointment
app.put("/api/appointment/approve/:id", authenticateJWT,
  authorizeRole("DOCTOR"), approveAppointment);

// api for rejecting an appointment
app.put("/api/appointment/reject/:id", authenticateJWT,
  authorizeRole("DOCTOR"), rejectAppointment);

// api for creating a service
app.post("/api/services", authenticateJWT, authorizeRole("DOCTOR"), async (req, res) => {

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
});

// api for fetching all services
app.get("/api/services", async (req, res) => {
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
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
  createDoctor();
});
