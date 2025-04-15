import express from "express";
import {
  getProfile,
  loginUser,
  register,
  UpdateProfile,
  bookAppointment,
  getUserAppointment,
  CancelAppointment,
} from "../controllers/user.controller.js";
import authUser from "../middlewares/authUser.js";
import upload from "../middlewares/multer.js";

const userRouter = express.Router();
userRouter.post("/register", register);
userRouter.post("/login", loginUser);
userRouter.get("/get-profile", authUser, getProfile);
userRouter.put(
  "/update-profile",
  upload.single("image"),
  authUser,
  UpdateProfile
);
userRouter.post("/book-appointment", authUser, bookAppointment);
userRouter.get("/get-appointment", authUser, getUserAppointment);
userRouter.post("/cancel-appointment", authUser, CancelAppointment);
export default userRouter;
