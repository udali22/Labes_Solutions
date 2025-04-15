import React, { useContext } from "react";
import { assets } from "../assets/assets_admin/assets";
import { AdminContext } from "../context/AdminContext";
import { useNavigate } from "react-router-dom";
import { DoctorContext } from "../context/DoctorContext";
const Navbar = () => {
  const navigate = useNavigate();
  const { aToken, setAtoken } = useContext(AdminContext);
  const { dToken, setDToken } = useContext(DoctorContext);
  const Logout = () => {
    navigate("/");
    aToken && setAtoken("");
    aToken && localStorage.removeItem("aToken");
    dToken && setDToken("");
    dToken && localStorage.removeItem("dToken");
  };
  return (
    <div className="flex items-center justify-between bg-amber-50 text-white p-4 shadow-md">
      <div className="flex items-center gap-3">
        <p className="text-indigo-800 text-2xl  font-medium">
          Labes Solutions{" "}
          <span className="text-sm  ml-auto flex flex-col">Dashboard</span>
        </p>
        <p className="text-lg font-semibold text-primary">
          {aToken ? "Admin" : "Doctor"}
        </p>
      </div>
      <button
        onClick={Logout}
        className="bg-blue-800 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition duration-300"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
