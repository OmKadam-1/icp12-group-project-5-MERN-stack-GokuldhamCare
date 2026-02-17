import Appointment from "../models/Appointments.js";
import dotenv from "dotenv";
dotenv.config();

// Controller for handling appointment-related operations
const postAppointment = async (req, res) => {
    const { patientName, patientId, doctorId, problem } = req.body;

    const newAppointment = new Appointment({
        patientName,
        patientId,
        doctorId,
        problem,
        status: "pending",
    });

    try {
        const savedAppointment = await newAppointment.save();

        return res.json({
            success: true,
            message: "Appointment requested successfully",
            data: savedAppointment,
        });
    } catch (error) {
        return res.json({
            success: false,
            message: `Appointment request failed: ${error.message}`,
            data: null,
        });
    }
};

// Controller to fetch appointments for a specific patient
const getPatientAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({
      patientId: req.params.patientId,
    });

    return res.json({
      success: true,
      message: "Patient appointments fetched successfully",
      data: appointments,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: `Failed to fetch appointments: ${error.message}`,
      data: null,
    });
  }
};


const getDoctorAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({
      doctorId: req.params.doctorId,
    });

    return res.json({
      success: true,
      message: "Doctor appointments fetched successfully",
      data: appointments,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: `Failed to fetch doctor appointments: ${error.message}`,
      data: null,
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



export { postAppointment , getPatientAppointments , getDoctorAppointments , approveAppointment , rejectAppointment };