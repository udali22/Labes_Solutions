import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets_frontend/assets";
import RelatedDoctors from "../components/RelatedDoctors";
import { toast } from "react-toastify";
import axios from "axios";
const Appointments = () => {
  const { id } = useParams();
  const { doctors, currencySymbol, backendurl, token, getDoctorsData } =
    useContext(AppContext);
  const navigate = useNavigate();
  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const bookAppointment = async () => {
    if (!token) {
      toast.warn("Login to book apointment");
      return navigate("/login");
    }
    try {
      const date = docSlots[slotIndex][0].datetime;
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      const slotDate = day + "_" + month + "_" + year;
      const { data } = await axios.post(
        backendurl + "/api/user/book-appointment",
        { docId: id, slotDate, slotTime },
        { headers: { token } }
      );
      if (data.success) {
        toast.success(data.message);
        getDoctorsData();
        navigate("/myappointment");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  useEffect(() => {
    if (doctors.length > 0) {
      const foundDoc = doctors.find((doctor) => doctor._id === id);
      setDocInfo(foundDoc);
    }
  }, [doctors, id]);
  useEffect(() => {
    const getAvailableSlots = () => {
      let today = new Date();
      let slots = [];

      for (let i = 0; i < 7; i++) {
        let currentDate = new Date(today);
        currentDate.setDate(today.getDate() + i);
        let endTime = new Date(currentDate);
        endTime.setHours(21, 0, 0, 0);

        if (today.getDate() === currentDate.getDate()) {
          currentDate.setHours(Math.max(currentDate.getHours() + 1, 10));
          currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
        } else {
          currentDate.setHours(10);
          currentDate.setMinutes(0);
        }

        let timeSlots = [];
        while (currentDate < endTime) {
          timeSlots.push({
            datetime: new Date(currentDate),
            time: currentDate.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          });
          currentDate.setMinutes(currentDate.getMinutes() + 30);
        }
        slots.push(timeSlots);
      }
      setDocSlots(slots);
    };

    getAvailableSlots();
  }, [docInfo]);
  if (!docInfo) return <div>Doctor not found!</div>;
  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-4">
        <div>
          <img className="bg-primary w-full rounded-lg" src={docInfo.image} />
        </div>

        <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
          <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
            {docInfo.name}
            <img className="w-5" src={assets.verified_icon} alt="Verified" />
          </p>
          <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
            <p>
              {docInfo.degree} - {docInfo.speciality}
            </p>
            <button className="py-0.5 px-2 border text-xs rounded-full">
              {docInfo.experience}
            </button>
          </div>
          <div>
            <p className="flex items-center gap-1 text-sm font-medium text-gray-900 mt-3">
              About <img src={assets.info_icon} alt="" />
            </p>
            <p className="text-sm text-gray-500 max-w-[700px] mt-1">
              {docInfo.about}
            </p>
          </div>
          <p className="text-gray-500 font-medium mt-4">
            Appointment fee:
            <span>
              {docInfo.fees} {currencySymbol}
            </span>
          </p>
        </div>
      </div>

      <div className="sm:px-16 mt-6 font-medium text-gray-700">
        <p className="text-lg">Booking Slot</p>

        {/* Days Selector */}
        <div className="flex gap-4 items-center w-full overflow-x-auto snap-x snap-mandatory mt-4 scrollbar-hide">
          {docSlots.map((item, index) => (
            <div
              key={index}
              onClick={() => setSlotIndex(index)}
              className={`w-20 h-20 flex flex-col items-center justify-center rounded-full cursor-pointer text-sm transition-all duration-200 ease-in-out shadow-md ${
                slotIndex === index
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-700 hover:scale-105"
              }`}
            >
              {item.length > 0 ? (
                <>
                  <p className="font-semibold">
                    {daysOfWeek[item[0].datetime.getDay()]}
                  </p>
                  <p className="text-lg">{item[0].datetime.getDate()}</p>
                </>
              ) : (
                <p className="text-xs text-gray-500">No slots</p>
              )}
            </div>
          ))}
        </div>

        {/* Time Slots */}
        <div className="flex items-center gap-3 w-full overflow-x-auto whitespace-nowrap mt-4 scrollbar-hide">
          {docSlots[slotIndex] &&
            docSlots[slotIndex].map((item, index) => (
              <p
                key={index}
                className={`text-sm font-medium flex-shrink-0 px-4 py-2 border border-gray-300 rounded-full cursor-pointer transition-all duration-200 ease-in-out hover:bg-gray-200 active:bg-gray-300 text-gray-600 shadow-md ${
                  slotTime === item.time ? "bg-blue-500 text-white" : ""
                }`}
                onClick={() => setSlotTime(item.time)}
              >
                {item.time.toLowerCase()}
              </p>
            ))}
        </div>

        {/* Bouton de réservation */}
        <button
          onClick={bookAppointment}
          className="bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6"
        >
          Book an Appointment
        </button>
      </div>
      <RelatedDoctors id={id} speciality={docInfo.speciality} />
    </div>
  );
};

export default Appointments;
