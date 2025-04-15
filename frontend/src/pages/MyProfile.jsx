import React, { useState, useContext } from "react";
import { assets } from "../assets/assets_frontend/assets";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const MyProfile = () => {
  const { userData, setUserData, backendurl, token, getUserData } =
    useContext(AppContext);

  const [isEdit, setIsEdit] = useState(false);

  const updateUserProfile = async () => {
    try {
      const formData = new FormData();
      formData.append("name", userData.name),
        formData.append("phone", userData.phone),
        formData.append("address", JSON.stringify(userData.address)),
        formData.append("gender", userData.gender),
        formData.append("dob", userData.dob);

      const { data } = await axios.put(
        backendurl + "/api/user/update-profile",
        formData,
        {
          headers: { token },
        }
      );
      console.log("API Response:", data);
      if (data.success) {
        toast.success(data.message);
        await getUserData();
        setIsEdit(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  return (
    userData && (
      <div className="max-w-lg flex flex-col gap-2 text-sm">
        {isEdit ? (
          <input
            className="bg-gray-50 text-3xl font-medium max-w-60 mt-4 "
            type="text"
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, name: e.target.value }))
            }
            value={userData.name}
          />
        ) : (
          <p className="font-medium text-3xl text-neutral-800 mt-4">
            {userData.name}
          </p>
        )}
        <hr className="bg-zinc-400 h-[1px] border-none" />
        <div>
          <div>
            <p className="text-gray-600 text-xl ">CONTACT INFORMATION </p>
            <b>Email :</b>
            <p>{userData.email}</p>
          </div>
          <div>
            <b>Phone : </b>
            {isEdit ? (
              <input
                className="border border-b-black rounded-full ml-2 text-center mt-2"
                type="text"
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, phone: e.target.value }))
                }
                value={userData.phone}
              />
            ) : (
              <p>{userData.phone}</p>
            )}
          </div>
          <div>
            <b>Address : </b>
            {isEdit ? (
              <>
                <input
                  className="border border-b-black rounded-full ml-2 text-center mt-2 mr-2"
                  type="text"
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line1: e.target.value },
                    }))
                  }
                  value={userData.address?.line1 ?? ""}
                />
                <input
                  type="text"
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line2: e.target.value },
                    }))
                  }
                  value={userData.address?.line2 ?? ""}
                  className="border border-b-black rounded-full ml-2 text-center mt-2 mr-2"
                />
              </>
            ) : (
              <>
                <p>{userData.address?.line1 ?? "No address available"}</p>
                <p>{userData.address?.line2 ?? ""}</p>
              </>
            )}
          </div>
        </div>

        <div>
          <p className="text-gray-600 text-xl ">BASIC INFORMATION : </p>
        </div>
        <b>Gender : </b>
        {isEdit ? (
          <select
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, gender: e.target.value }))
            }
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        ) : (
          <p>{userData.gender}</p>
        )}
        <b>Birthday : </b>
        {isEdit ? (
          <input
            className="border border-b-black rounded-full ml-2 text-center mt-2 mr-2"
            type="date"
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, dob: e.target.value }))
            }
            value={userData.dob}
          />
        ) : (
          <p>{userData.dob}</p>
        )}
        <div>
          {isEdit ? (
            <button
              className="bg-primary rounded-full hover:scale-110 transition-all duration-300 mb-4 mt-3 w-full text-white py-2 px-8 border"
              onClick={() => {
                setIsEdit(false), updateUserProfile();
              }}
            >
              {" "}
              Save Information{" "}
            </button>
          ) : (
            <button
              className="bg-primary rounded-full hover:scale-110 transition-all duration-300 mb-4 mt-3 w-full text-white py-2 px-8 border"
              onClick={() => setIsEdit(true)}
            >
              Edit
            </button>
          )}
        </div>
      </div>
    )
  );
};

export default MyProfile;
