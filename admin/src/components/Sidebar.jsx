import React from "react";
import { AdminContext } from "../context/AdminContext";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets_admin/assets";
import { useContext } from "react";
import { DoctorContext } from "../context/DoctorContext";

const Sidebar = () => {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);

  return (
    <div className="min-h-screen bg-white border-r shadow-md p-4">
      {aToken && (
        <ul className="space-y-6">
          <li>
            <NavLink
              className="flex items-center space-x-4 text-gray-700 hover:bg-gray-100 p-2 rounded-lg transition duration-200 ease-in-out"
              to="/admin-dashboard"
            >
              <img src={assets.home_icon} alt="Home" className="w-6 h-6" />
              <p className="text-lg font-medium">Dashboard</p>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/all-apointment"
              className="flex items-center space-x-4 text-gray-700 hover:bg-gray-100 p-2 rounded-lg transition duration-200 ease-in-out"
            >
              <img
                src={assets.appointment_icon}
                alt="Appointments"
                className="w-6 h-6"
              />
              <p className="text-lg font-medium">Appointments</p>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/add-doctor"
              className="flex items-center space-x-4 text-gray-700 hover:bg-gray-100 p-2 rounded-lg transition duration-200 ease-in-out"
            >
              <img src={assets.add_icon} alt="Add Doctor" className="w-6 h-6" />
              <p className="text-lg font-medium">Add Doctor</p>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/doctor-list"
              className="flex items-center space-x-4 text-gray-700 hover:bg-gray-100 p-2 rounded-lg transition duration-200 ease-in-out"
            >
              <img
                src={assets.people_icon}
                alt="Doctors List"
                className="w-6 h-6"
              />
              <p className="text-lg font-medium">Doctors List</p>
            </NavLink>
          </li>
        </ul>
      )}
      {dToken && (
        <ul className="space-y-6">
          <li>
            <NavLink
              className="flex items-center space-x-4 text-gray-700 hover:bg-gray-100 p-2 rounded-lg transition duration-200 ease-in-out"
              to="/doctor-dashboard"
            >
              <img src={assets.home_icon} alt="Home" className="w-6 h-6" />
              <p className="text-lg font-medium">Dashboard</p>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/doctor-appointments"
              className="flex items-center space-x-4 text-gray-700 hover:bg-gray-100 p-2 rounded-lg transition duration-200 ease-in-out"
            >
              <img
                src={assets.appointment_icon}
                alt="Appointments"
                className="w-6 h-6"
              />
              <p className="text-lg font-medium">Appointments</p>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/doctor-Profile"
              className="flex items-center space-x-4 text-gray-700 hover:bg-gray-100 p-2 rounded-lg transition duration-200 ease-in-out"
            >
              <img
                src={assets.doctor_icon}
                alt="Doctors Profile"
                className="w-6 h-6"
              />
              <p className="text-lg font-medium">My Profile</p>
            </NavLink>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
