import validator from "validator";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import doctormodel from "../models/doctor.model.js";
import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import AppointmentModel from "../models/appointment.model.js";
const addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      fees,
      address,
    } = req.body;

    const imageFile = req.file;

    //  Check if all required fields exist
    if (
      !name ||
      !email ||
      !password ||
      !speciality ||
      !degree ||
      !experience ||
      !about ||
      !fees ||
      !address
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Missing details" });
    }

    // Validate email
    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Please enter a valid email" });
    }

    //  Validate strong password
    if (password.length < 8) {
      return res
        .status(400)
        .json({ success: false, message: "Please enter a strong password" });
    }

    //  Check if image file exists
    if (!imageFile) {
      return res
        .status(400)
        .json({ success: false, message: "Image is required" });
    }

    // Upload image to Cloudinary
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });
    const imageUrl = imageUpload.secure_url;

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create doctor object
    const doctorData = {
      name,
      email,
      image: imageUrl,
      password: hashedPassword,
      speciality,
      degree,
      experience,
      about,
      fees,
      address,
      date: Date.now(),
    };

    //  Save to database
    await doctormodel.create(doctorData);

    res
      .status(201)
      .json({ success: true, message: "Doctor added successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "An error occurred" });
  }
};
// API for admin Login

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res
        .status(400)
        .json({ success: false, message: "wrong email or password " });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "An error occurred" });
  }
};
const getAllDoctors = async (req, res) => {
  try {
    const doctors = await doctormodel.find().select("-password");
    res.status(200).json({ success: true, doctors });
  } catch (error) {
    res.status(500).json({ success: false, message: "Command not executed " });
  }
};
const appointmentsAdmin = async (req, res) => {
  try {
    const appointments = await AppointmentModel.find({});
    res.status(200).json({ success: true, appointments });
  } catch (error) {
    res.status(500).json({ success: false, message: "Command not executed " });
  }
};
const CancelAppointmentAdmin = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const appointmentData = await AppointmentModel.findById(appointmentId);
    await AppointmentModel.findByIdAndUpdate(appointmentId, {
      cancelled: true,
    });
    const { docId, slotDate, slotTime } = appointmentData;
    const docData = await doctorModel.findById(docId);
    let slots_booked = docData.slots_booked;
    slots_booked[slotDate] = slots_booked[slotDate].filter(
      (e) => e !== slotTime
    );
    await doctorModel.findByIdAndUpdate(docId, { slots_booked });
    res.status(200).json({ success: true, message: "Appointment Cancelled" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
const adminDashboard = async (req, res) => {
  try {
    const doctors = await doctormodel.find({});
    const users = await userModel.find({});
    const appointments = await AppointmentModel.find({});
    const dashData = {
      doctors: doctors.length,
      users: users.length,
      appointments: appointments.length,
      latestAppointments: appointments.slice(0, 5).reverse(),
    };
    res.status(200).json({ success: true, dashData });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export {
  addDoctor,
  loginAdmin,
  getAllDoctors,
  appointmentsAdmin,
  CancelAppointmentAdmin,
  adminDashboard,
};
