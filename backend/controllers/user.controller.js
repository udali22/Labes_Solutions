import userModel from "../models/user.model.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import doctorModel from "../models/doctor.model.js";
import AppointmentModel from "../models/appointment.model.js";
import razorpay from "razorpay";

// API to register user
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Vérifier si l'email est valide
    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Email is not valid" });
    }

    // Vérifier si le mot de passe est suffisamment sécurisé
    if (password.length < 8) {
      return res
        .status(400)
        .json({ success: false, message: "Password is too weak" });
    }

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    // Chiffrer le mot de passe
    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt);

    // Enregistrer l'utilisateur en base de données
    const newUser = new userModel({ name, email, password: encryptedPassword });
    const user = await newUser.save();

    // Générer un token JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(201).json({ success: true, token });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// API for login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Vérifier si l'utilisateur existe
    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User doesn't exist!" });
    }

    // Vérifier si le mot de passe est correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    // Générer un token JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({ success: true, token });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
const getProfile = async (req, res) => {
  try {
    const { userId } = req.body;
    const userData = await userModel.findById(userId).select("-password");
    res.status(200).json({ success: true, userData });
  } catch (error) {
    res.status(500).json({ success: false, message: "An error occurred" });
  }
};
// API to update user profile
const UpdateProfile = async (req, res) => {
  try {
    const { userId, name, phone, address, dob, gender } = req.body;
    if (!name || !phone || !address || !dob || !gender) {
      return res.status(400).json({ success: false, message: "Missing  Data" });
    }
    await userModel.findByIdAndUpdate(userId, {
      name,
      phone,
      address: JSON.parse(address),
      dob,
      gender,
    });
    res
      .status(200)
      .json({ success: true, message: "Profile Updated Successfuly" });
  } catch (error) {
    res.status(500).json({ success: false, message: "An error occurred" });
  }
};
// API for booking appointment
const bookAppointment = async (req, res) => {
  try {
    const { userId, docId, slotDate, slotTime } = req.body;

    // Récupérer les informations du médecin
    const docData = await doctorModel.findById(docId).select("-password");
    if (!docData) {
      return res
        .status(404)
        .json({ success: false, message: "Doctor not found" });
    }

    if (!docData.available) {
      return res
        .status(400)
        .json({ success: false, message: "Doctor not available" });
    }

    let slots_booked = docData.slots_booked;

    if (slots_booked[slotDate]) {
      if (slots_booked[slotDate].includes(slotTime)) {
        return res.json({ success: false, message: "Slot not available" });
      } else {
        slots_booked[slotDate].push(slotTime);
      }
    } else {
      slots_booked[slotDate] = [];
      slots_booked[slotDate].push(slotTime);
    }

    const userData = await userModel.findById(userId).select("-password");
    delete docData.slots_booked;

    const appointmentData = {
      userId,
      docId,
      userData,
      docData,
      amount: docData.fees,
      slotTime,
      slotDate,
      date: new Date(),
    };

    const newAppointment = new AppointmentModel(appointmentData);
    await newAppointment.save();
    //save new slots data in docData
    await doctorModel.findByIdAndUpdate(docId, { slots_booked });

    res
      .status(200)
      .json({ success: true, message: "Appointment booked successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
const getUserAppointment = async (req, res) => {
  try {
    const { userId } = req.body;
    const appointments = await AppointmentModel.find({ userId });
    res.status(200).json({ success: true, appointments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
const CancelAppointment = async (req, res) => {
  try {
    const { userId, appointmentId } = req.body;
    const appointmentData = await AppointmentModel.findById(appointmentId);
    if (appointmentData.userId !== userId) {
      return res
        .status(400)
        .json({ success: false, message: "Unauthorized Access" });
    }
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
// Export functions
export {
  register,
  loginUser,
  getProfile,
  UpdateProfile,
  bookAppointment,
  getUserAppointment,
  CancelAppointment,
};
