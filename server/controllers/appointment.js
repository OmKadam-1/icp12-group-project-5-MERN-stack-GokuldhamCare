import Appointment from "../models/Appointment.js";
import dotenv from "dotenv";
dotenv.config();

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

export { postAppointment };