import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const currencySymbol = "TND";
  const backendurl = import.meta.env.VITE_BACKEND_URL;
  const [doctors, setDoctors] = useState([]);
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : ""
  );
  const [userData, setUserData] = useState(false);

  const getDoctorsData = async () => {
    try {
      const { data } = await axios.get(backendurl + "/api/doctor/list");
      if (data.success) {
        setDoctors(data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  const getUserData = async () => {
    try {
      const { data } = await axios.get(backendurl + "/api/user/get-profile", {
        headers: { token },
      });
      if (data.success) {
        setUserData(data.userData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  useEffect(() => {
    getDoctorsData();
  }, []);
  useEffect(() => {
    if (token) {
      getUserData();
    }
  }, [token]);
  const value = {
    doctors,
    getDoctorsData,
    token,
    setToken,
    currencySymbol,
    backendurl,
    userData,
    setUserData,
    getUserData,
  };
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
export default AppContextProvider;
