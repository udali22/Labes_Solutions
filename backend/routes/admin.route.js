import express from "express";
import {
  addDoctor,
  loginAdmin,
  getAllDoctors,
  appointmentsAdmin,
  CancelAppointmentAdmin,
  adminDashboard,
} from "../controllers/admin.controller.js";
import { changeAvailability } from "../controllers/doctor.controller.js";
import upload from "../middlewares/multer.js";
import authAdmin from "../middlewares/authAdmin.js";

const adminRouter = express.Router();
adminRouter.post("/add-doctor", authAdmin, upload.single("image"), addDoctor);
adminRouter.get("/doctor-list", authAdmin, getAllDoctors);
adminRouter.post("/login", loginAdmin);
adminRouter.post("/change-availability", authAdmin, changeAvailability);
adminRouter.get("/appointments", authAdmin, appointmentsAdmin);
adminRouter.post("/cancel-appointment", authAdmin, CancelAppointmentAdmin);
adminRouter.get("/dashboard", authAdmin, adminDashboard);
export default adminRouter;
