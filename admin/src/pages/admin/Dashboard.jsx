import React from "react";
import { useContext } from "react";
import { AdminContext } from "../../context/AdminContext";
import { useEffect } from "react";
import { assets } from "../../assets/assets_admin/assets";

const Dashboard = () => {
  const { aToken, dashData, getDashboardData } = useContext(AdminContext);
  useEffect(() => {
    if (aToken) {
      getDashboardData();
    }
  }, [aToken]);
  return (
    dashData && (
      <div className="m-5">
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2 bg-white ">
            <img src={assets.doctor_icon} alt="" />
            <div>
              <p>{dashData.doctors}</p>
              <p>Doctors</p>
            </div>
          </div>

          <div className="m-5">
            <img src={assets.appointments_icon} className="w-10 h-10" alt="" />
            <div>
              <p>{dashData.appointments}</p>
              <p>appointments</p>
            </div>
          </div>
          <div className="m-5">
            <img src={assets.patients_icon} className="w-10 h-10" alt="" />
            <div>
              <p>{dashData.users}</p>
              <p>Patients</p>
            </div>
          </div>
        </div>
        <div>
          <div>
            <img src={assets.list_icon} alt="" />
            <p>Latest Appointments</p>
          </div>
          <div className="bg-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll">
            {dashData.latestAppointments.map((appointment, index) => (
              <div
                key={index}
                className="flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50"
              >
                <p className="max-sm:hidden">{index + 1}</p>
                <div className="flex items-center gap-2">
                  <img
                    className="w-8 rounded-full "
                    src={appointment.userData.image}
                    alt=""
                  />
                  <p>{appointment.userData.name}</p>
                </div>

                <p>
                  {appointment.slotDate},{appointment.slotTime}
                </p>
                <div className="flex items-center gap-2">
                  <p>{appointment.docData.name}</p>
                </div>
                {appointment.cancelled ? (
                  <p className="text-red-500 text-xs font-medium">Cancelled</p>
                ) : (
                  <button
                    onClick={() => CancelAppointment(appointment._id)}
                    className="bg-red-500 text-white text-xs font-medium px-2 py-1 rounded"
                  >
                    Cancel
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
};

export default Dashboard;
