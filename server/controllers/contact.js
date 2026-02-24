import Contact from "../models/Contact.js";
import User from "../models/User.js";

import dotenv from "dotenv";
dotenv.config();

const postContact =   async (req, res) => {
    const { name, email, phone, address, message } = req.body;

    const newContact = new Contact({
      name,
      email,
      phone,
      address,
      message,
      createdBy: req.body.id,
    });

    try {
      const saveContact = await newContact.save();
      return res.json({
        success: true,
        message: " Your response send  successfully",
        data: saveContact,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to send your response",
        error: error.message,
      });
    }
  }
  const getContact = async (req, res) => {
    try {
      const contct = await Contact.find().populate("createdBy", "email");
  
      return res.json({
        success: true,
        message: "Contact fetched successfully",
        data: contct,
      });
    } catch (error) {
      console.error("Error fetching contct:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to fetch contct",
        error: error.message,
      });
    }
  }

  export { postContact , getContact  };