import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
    serviceName: {
        type: String,
        required: true
    },

    department: { type: String, required: true },

    description: { type: String, required: true },

    serviceImg: { type: String, required: true },
    // image URL
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });

const Service = model("Service", serviceSchema);

export default Service;