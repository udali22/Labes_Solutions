import doctorModel from "../models/doctor.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointment.model.js";
const changeAvailability = async (req, res) => {
  try {
    const { docId } = req.body;
    const docData = await doctorModel.findById(docId);
    await doctorModel.findByIdAndUpdate(docId, {
      available: !docData.available,
    });
    res.json({ success: true, message: "availability changed !" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
const doctorList = async (req, res) => {
  try {
    const doctors = await doctorModel.find(); // Récupère tous les médecins
    if (!doctors.length) {
      return res
        .status(404)
        .json({ success: false, message: "No doctors found" });
    }

    res.status(200).json({ success: true, doctors });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;
    const doctor = await doctorModel.findOne({ email });
    if (!doctor) {
      return res
        .status(404)
        .json({ success: false, message: "Doctor not found" });
    }
    const isMatch = await bcrypt.compare(password, doctor.password);
    if (isMatch) {
      const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET);
      res.status(200).json({ success: true, token });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Wrong Password" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
const AppointmentsDoctor = async (req, res) => {
  try {
    const { docId } = req.body;
    const appointments = await appointmentModel.find({ docId });

    res.status(200).json({ success: true, appointments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
const appointmentCompleted = async (req, res) => {
  try {
    const { docId, appointmentId } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);
    if (!appointmentData) {
      res
        .status(404)
        .json({ success: false, message: "appointment not found" });
    }
    await appointmentModel.findByIdAndUpdate(appointmentId, {
      isCompleted: true,
    });
    res.status(200).json({ success: true, message: "apointment Completed" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
const appointmentCancelled = async (req, res) => {
  try {
    const { docId, appointmentId } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);
    if (!appointmentData) {
      res
        .status(404)
        .json({ success: false, message: "appointment not found" });
    }
    await appointmentModel.findByIdAndUpdate(appointmentId, {
      cancelled: true,
    });
    res.status(200).json({ success: true, message: "apointment Cancelled" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
const doctorDashboard = async (req, res) => {
  try {
    const { docId } = req.body;
    const appointment = await appointmentModel.find({ docId });
    let earnings = 0;
    appointment.map((item) => {
      if (item.isCompleted) {
        earnings += item.amount;
      }
    });
    let patients = [];
    appointment.map((item) => {
      if (!patients.includes(item.userId)) {
        patients.push(item.userId);
      }
    });
    const dashData = {
      earnings,
      appointments: appointment.length,
      patients: patients.length,
      latestAppointments: appointment.reverse().slice(0, 5),
    };
    res.status(200).json({ success: true, dashData });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
const getDoctorProfile = async (req, res) => {
  try {
    const { docId } = req.body;
    const profileData = await doctorModel.findById(docId).select("-password");
    res.status(200).json({ success: true, profileData });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
const updateDoctorProfile = async (req, res) => {
  try {
    const { docId, fees, address, available } = req.body;
    await doctorModel.findByIdAndUpdate(docId, { fees, address, available });
    res
      .status(200)
      .json({ success: true, message: "profile updated successfuly" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export {
  changeAvailability,
  doctorList,
  loginDoctor,
  AppointmentsDoctor,
  appointmentCompleted,
  appointmentCancelled,
  doctorDashboard,
  updateDoctorProfile,
  getDoctorProfile,
};
