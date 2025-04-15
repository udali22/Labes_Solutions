import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets_admin/assets";

const DoctorAppointment = () => {
  const {
    dToken,
    appointments,
    getAppointments,
    completeAppointment,
    cancelAppointment,
  } = useContext(DoctorContext);
  const { calculateAge, currency } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      getAppointments();
    }
  }, [dToken]);

  return (
    <div className="w-full max-w-6xl mx-auto p-5">
      <p className="mb-4 text-2xl font-semibold text-gray-800">
        All Appointments
      </p>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="hidden sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] py-3 bg-gray-100 text-sm font-medium text-gray-700 border-b">
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Action</p>
        </div>
        {appointments.reverse().map((appointment, index) => (
          <div
            className="flex items-center justify-between p-4 border-b border-gray-200 mr-5"
            key={index}
          >
            <p className="text-gray-700">{index + 1}</p>
            <div className="flex items-center">
              <p className="text-gray-800 font-medium">
                {appointment.userData.name}
              </p>
            </div>
            <p className="text-gray-500">CASH</p>
            <p className="text-gray-600">
              {calculateAge(appointment.userData.dob)}
            </p>
            <p className="text-gray-600">
              {appointment.slotDate}, {appointment.slotTime}
            </p>
            <p className="text-gray-800">
              {currency}
              {appointment.amount}
            </p>

            {appointment.cancelled ? (
              <p className="text-red-500 font-medium">Cancelled</p>
            ) : appointment.completed ? (
              <p className="text-green-500 font-medium">Completed</p>
            ) : (
              <div className="flex space-x-4">
                <img
                  onClick={() => cancelAppointment(appointment._id)}
                  className="cursor-pointer"
                  src={assets.cancel_icon}
                  alt="Cancel"
                />
                <img
                  onClick={() => completeAppointment(appointment._id)}
                  className="cursor-pointer"
                  src={assets.tick_icon}
                  alt="Confirm"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorAppointment;
