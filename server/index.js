import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./db.js";
import User from "./models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { postAppointment, getPatientAppointments, getDoctorAppointments, approveAppointment, rejectAppointment } from "./controllers/appointment.js";

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

app.post("/api/auth/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ error: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      email,
      password: hashedPassword,
      role: "PATIENT"
    });

    res.status(201).json({ message: "Registration successful" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ error: "Invalid password" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      role: user.role
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// api for booking appointment
app.post("/api/appointment/book", postAppointment);
// api for fetching appointments for a patient
app.get("/api/appointment/patient/:patientId", getPatientAppointments);
// api for fetching appointments for a doctor
app.get("/api/appointment/doctor/:doctorId", getDoctorAppointments);
// api for approving an appointment
app.put("/api/appointment/approve/:id", approveAppointment);
// api for rejecting an appointment
app.put("/api/appointment/reject/:id", rejectAppointment);





app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
  createDoctor();
});
