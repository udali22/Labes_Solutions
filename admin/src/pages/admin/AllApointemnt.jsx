import React from "react";
import { useContext } from "react";
import { AdminContext } from "../../context/AdminContext";
import { useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets_admin/assets";

const AllApointemnt = () => {
  const { aToken, appointments, getAllAppointments, CancelAppointment } =
    useContext(AdminContext);
  const { calculateAge, currency } = useContext(AppContext);
  useEffect(() => {
    if (aToken) {
      getAllAppointments();
    }
  }, [aToken]);
  return (
    <div className="w-full max-w-6xl m-5">
      <h1 className="mb-3 text-lg font-medium">All Appointments</h1>
      <div className="bg-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll">
        <div className="grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] py-3 px-6 border-b bg-gray-100 text-xs sm:text-sm">
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Actions</p>
        </div>
        {appointments.map((appointment, index) => (
          <div className="flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50">
            <p className="max-sm:hidden">{index + 1}</p>
            <div className="flex items-center gap-2">
              <img
                className="w-8 rounded-full "
                src={appointment.userData.image}
                alt=""
              />
              <p>{appointment.userData.name}</p>
            </div>
            <p className="max-sm:hidden">
              {calculateAge(appointment.userData.dob)}
            </p>
            <p>
              {appointment.slotDate},{appointment.slotTime}
            </p>
            <div className="flex items-center gap-2">
              <img
                className="w-8 rounded-full "
                src={appointment.docData.image}
                alt=""
              />
              <p>{appointment.docData.name}</p>
            </div>
            <p className="max-sm:hidden">
              {appointment.docData.fees}
              {currency}
            </p>
            {appointment.cancelled ? (
              <p className="text-red-500 text-xs font-medium">Cancelled</p>
            ) : appointment.isCompleted ? (
              <p className="text-green-500 text-xs font-medium">Cancelled</p>
            ) : (
              <img
                onClick={() => CancelAppointment(appointment._id)}
                className="w-10 cursor-pointer"
                src={assets.cancel_icon}
                alt=""
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllApointemnt;
