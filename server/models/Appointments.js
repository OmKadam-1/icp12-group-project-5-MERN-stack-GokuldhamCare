import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
    patientName: String,

    patientId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    email: String,
    phone: String,

    problem: String,
    address: String,

    dateRequested: { type: Date, default: Date.now },

    status: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending",
    },

    appointmentDate: Date,
    appointmentTime: String,
});

const Appointment = mongoose.model("Appointment", appointmentSchema);
export default Appointment;
