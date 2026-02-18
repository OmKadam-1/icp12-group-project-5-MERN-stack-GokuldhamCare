import Appointment from "../models/Appointments.js";
import User from "../models/User.js";

import dotenv from "dotenv";
dotenv.config();

const postAppointment = async (req, res) => {
  try {
    const doctor = await User.findOne({ role: "DOCTOR" });

    if (!doctor)
      return res.status(404).json({ message: "Doctor not found" });

    const newAppointment = new Appointment({
      patientName: req.body.patientName,
      patientId: req.user.id,   // ✅ from JWT
      doctorId: doctor._id,     
      email: req.body.email,
      phone: req.body.phone,
      problem: req.body.problem,
      address: req.body.address,
      status: "pending",
    });

    const savedAppointment = await newAppointment.save();

    return res.json({
      success: true,
      message: "Appointment requested successfully",
      data: savedAppointment,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getPatientAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({
      patientId: req.user.id
    }).populate("doctorId", "email");

    return res.json({
      success: true,
      message: "Patient appointments fetched successfully",
      data: appointments,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getDoctorAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({
      doctorId: req.user.id
    }).populate("patientId", "email");

    return res.json({
      success: true,
      message: "Doctor appointments fetched successfully",
      data: appointments,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const approveAppointment = async (req, res) => {
  const { appointmentDate, appointmentTime } = req.body;

  try {
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      {
        status: "approved",
        appointmentDate,
        appointmentTime,
      },
      { new: true }
    );

    return res.json({
      success: true,
      message: "Appointment approved successfully",
      data: updatedAppointment,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: `Appointment approval failed: ${error.message}`,
      data: null,
    });
  }
};

const rejectAppointment = async (req, res) => {
  try {
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status: "rejected" },
      { new: true }
    );

    return res.json({
      success: true,
      message: "Appointment rejected successfully",
      data: updatedAppointment,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: `Appointment rejection failed: ${error.message}`,
      data: null,
    });
  }
};



export { postAppointment, getPatientAppointments, getDoctorAppointments, approveAppointment, rejectAppointment };