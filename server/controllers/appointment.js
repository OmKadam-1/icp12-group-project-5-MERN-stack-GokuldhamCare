import Appointment from "../models/Appointment.js";
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
export const getPatientAppointments = async (req, res) => {
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


export { postAppointment , getPatientAppointments };