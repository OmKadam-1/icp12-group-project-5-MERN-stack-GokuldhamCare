import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    address: String,
    message: String,

    dateRequested: { type: Date, default: Date.now },

});

const Contact = mongoose.model("Contact", contactSchema);
export default Contact;