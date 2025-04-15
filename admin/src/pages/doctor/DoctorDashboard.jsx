import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { assets } from "../../assets/assets_admin/assets";
const DoctorDashboard = () => {
  const { dashData, setDashData, dashboardAPI, dToken } =
    useContext(DoctorContext);

  useEffect(() => {
    if (dToken) {
      dashboardAPI(); // Fetch the dashboard data when the token is available
    }
  }, [dToken]);

  return (
    <div className="w-full max-w-6xl mx-auto p-5">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">
        Doctor Dashboard
      </h1>

      <div className="bg-white rounded-lg shadow-md p-5 mb-5 justify-between">
        {dashData ? (
          <div className="p-5">
            <div className="flex  items-between  ">
              <div className="flex mr-5">
                <img className="w-11" src={assets.earning_icon} alt="" />
                <div className="mb-4">
                  <p className="text-xl font-semibold text-primary">Earnings</p>
                  <p className="text-lg text-gray-700">
                    {dashData.earnings} TND
                  </p>
                </div>
              </div>
              <div className="flex mr-5">
                <img className="w-11" src={assets.appointments_icon} alt="" />
                <div className="mb-4">
                  <p className="text-xl font-semibold text-primary">
                    Appointments
                  </p>
                  <p className="text-lg text-gray-700">
                    {dashData.appointments}
                  </p>
                </div>
              </div>
              <div className="flex mr-5 ">
                <img className="w-11" src={assets.patients_icon} alt="" />
                <div className="mb-4">
                  <p className="text-xl font-semibold text-primary">Patients</p>
                  <p className="text-lg text-gray-700">{dashData.patients}</p>
                </div>
              </div>
            </div>

            <div>
              <p className="text-xl font-semibold text-primary mt-7">
                Latest Appointments
              </p>
              {dashData.latestAppointments ? (
                <ul className="space-y-2">
                  {dashData.latestAppointments.map((appointment, index) => (
                    <li key={index} className="text-lg text-gray-700">
                      {appointment.slotDate}, {appointment.slotTime} -{" "}
                      {appointment.userData.name}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-lg text-gray-500">No recent appointments</p>
              )}
            </div>
          </div>
        ) : (
          <p className="text-lg text-gray-500">Loading dashboard data...</p>
        )}
      </div>
    </div>
  );
};

export default DoctorDashboard;
