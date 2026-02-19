import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./db.js";
import User from "./models/User.js";

import bcrypt from "bcryptjs";

import { registerPatient,loginUser } from "./controllers/authController.js";
import { postAppointment, getPatientAppointments, getDoctorAppointments, approveAppointment, rejectAppointment } from "./controllers/appointment.js";
import { authenticateJWT, authorizeRole } from "./middlewares/authMiddleware.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 8080;

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

app.post("/api/auth/login",loginUser);



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


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
  createDoctor();
});
