import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Doctors from "./pages/Doctors";
import Login from "./pages/Login";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Myprofile from "./pages/Myprofile";
import MyAppointments from "./pages/Myappointments";
import Appointments from "./pages/Appointments";
import Navbar from "./components/Navbar";
import { ToastContainer, toast } from "react-toastify";
const App = () => {
  return (
    <div className="mx-4 s:mx-[10%]">
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/doctors/:speciality" element={<Doctors />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/myprofile" element={<Myprofile />} />
        <Route path="/myappointment" element={<MyAppointments />} />
        <Route path="/appointment/:id" element={<Appointments />} />
      </Routes>
    </div>
  );
};

export default App;
