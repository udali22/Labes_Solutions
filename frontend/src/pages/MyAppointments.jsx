import React, { use, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";
import { useState, useEffect } from "react";

const MyAppointments = () => {
  const { backendurl, token } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);
  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(
        backendurl + "/api/user/get-appointment",
        { headers: { token } }
      );
      if (data.success) {
        setAppointments(data.appointments.reverse());
        console.log(data.appointments);
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };
  const cancelAppointment = async (appointmentId) => {
    console.log(appointmentId);
    try {
      const { data } = await axios.post(
        backendurl + "/api/user/cancel-appointment",
        { appointmentId },
        { headers: { token } }
      );
      if (data.success) {
        toast.success(data.message);
        getUserAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };
  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, [token]);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <p className="pb-3 mt-12 text-lg font-semibold text-zinc-700 border-b">
        My Appointments
      </p>

      <div className="space-y-4 mt-4">
        {appointments.map((item, index) => (
          <div
            key={index}
            className="flex flex-col sm:flex-row items-center sm:items-start gap-4 p-4 border rounded-lg shadow-sm bg-white"
          >
            <img
              className="w-24 h-24 object-cover rounded-md bg-indigo-50"
              src={item.docData.image}
            />

            <div className="flex-1 text-sm text-zinc-600">
              <p className="text-lg font-semibold text-neutral-800">
                {item.docData.name}
              </p>
              <p className="text-indigo-600 font-medium">
                {item.docData.speciality}
              </p>

              <div className="mt-2 text-sm">
                <p className="text-zinc-700 font-medium">Address:</p>
                <p>{item.docData.address.line1}</p>
                <p>{item.docData.address.line2}</p>
              </div>

              <p className="mt-2 text-sm">
                Date & Time:{" "}
                <span className="font-medium text-neutral-700">
                  {item.slotDate}| {item.slotTime}
                </span>
              </p>
            </div>

            <div className="flex flex-col gap-2 sm:w-48">
              {!item.cancelled &&
                !item.isCompleted(
                  <button
                    onClick={() => {
                      alert("Feature is not available right now");
                    }}
                    className="py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md"
                  >
                    Pay Online
                  </button>
                )}
              {!item.cancelled &&
                !item.isCompleted(
                  <button
                    onClick={() => cancelAppointment(item._id)}
                    className="py-2 text-sm font-medium text-gray-500 border rounded-md hover:bg-red-500 transition-all"
                  >
                    Cancel Appointment
                  </button>
                )}
              {item.cancelled &&
                !item.isCompleted(
                  <p className="text-sm text-red-500 font-medium">
                    Appointment Cancelled
                  </p>
                )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointments;
