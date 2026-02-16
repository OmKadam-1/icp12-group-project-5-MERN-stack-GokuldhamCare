import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./db";
import User from "./models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 8080;

const createAdmin = async () => {
  try {
    const existingAdmin = await User.findOne({
      email: process.env.ADMIN_EMAIL
    });

    if (existingAdmin) return;

    const hashedPassword = await bcrypt.hash(
      process.env.ADMIN_PASSWORD,
      10
    );

    await User.create({
      email: process.env.ADMIN_EMAIL,
      password: hashedPassword,
      role: "ADMIN"
    });

    console.log("Admin created successfully");
  } catch (error) {
    console.error("Admin creation error:", error.message);
  }
};



app.get("/", (req, res) => {
  res.json({ message: "Welcome" });
});

app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
