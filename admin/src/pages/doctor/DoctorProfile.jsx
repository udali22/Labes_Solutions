import React, { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
const DoctorProfile = () => {
  const { dToken, getProfile, profileData, setProfileData, backendurl } =
    useContext(DoctorContext);
  const { currency } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);
  const parsedAddress = profileData.address
    ? JSON.parse(profileData.address)
    : { line1: "", line2: "" };
  const updateProfile = async () => {
    try {
      const updateData = {
        address: profileData.address,
        fees: profileData.fees,
        available: profileData.available,
      };
      const { data } = await axios.post(
        backendurl + "/api/doctor/update-profile",
        updateData,
        { headers: { dToken } }
      );
      if (data.success) {
        toast.success(data.message);
        setIsEdit(false);
        getProfile();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };
  useEffect(() => {
    if (dToken) {
      getProfile();
    }
  }, [dToken]);

  return (
    profileData && (
      <div>
        <div className="flex flex-col gap-4 m-5">
          <div>
            <img
              className="bg-primary w-full sm:max-w-64 rounded-lg"
              src={profileData.image}
              alt=""
            />
          </div>
          <div className="flex-1 border borer-stone-100 rounded-lg p-8 py-7 bg-white ">
            {/* DocInfo */}
            <p className="flex items-center gap-2 text-3xl font-medium text-gray-700">
              {isEdit ? (
                <input
                  type="text"
                  value={profileData.name}
                  onChange={(e) =>
                    setProfileData((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                />
              ) : (
                profileData.name
              )}
            </p>
            <div className="flex items-center gap-2 mt-1 text-gray-600">
              <p>
                {profileData.degree} - {profileData.speciality}
              </p>

              <button className="py-0.5 px-2 border text-xs rounded-full">
                {profileData.experience}
              </button>
            </div>

            {/* Doc About */}
            <div>
              <p className="flex items-center gap-1 text-sm font-medium text-neutral-800 mt-3">
                About:
              </p>
              {isEdit ? (
                <textarea
                  value={profileData.about}
                  onChange={(e) =>
                    setProfileData((prev) => ({
                      ...prev,
                      about: e.target.value,
                    }))
                  }
                  className="text-sm text-gray-500 max-w-[700px] mt-1"
                />
              ) : (
                <p className="text-sm text-gray-500 max-w-[700px] mt-1">
                  {profileData.about}
                </p>
              )}
            </div>
            <p className="text-gray-600 font-medium mt-4 ">
              Appointment fee :{" "}
              <span className="text-gray-800">
                {isEdit ? (
                  <input
                    type="number"
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        fees: e.target.value,
                      }))
                    }
                  />
                ) : (
                  profileData.fees
                )}
                {currency}
              </span>
            </p>
            <div className="flex gap-2 py-2">
              <p>Address : </p>
              <p className="text-sm">
                {isEdit ? (
                  <>
                    <input
                      type="text"
                      value={parsedAddress.line1} // bind to parsed line1
                      onChange={(e) =>
                        setProfileData((prev) => ({
                          ...prev,
                          address: JSON.stringify({
                            ...JSON.parse(prev.address), // parse current address
                            line1: e.target.value, // update line1
                          }),
                        }))
                      }
                    />
                    <input
                      type="text"
                      value={parsedAddress.line2} // bind to parsed line2
                      onChange={(e) =>
                        setProfileData((prev) => ({
                          ...prev,
                          address: JSON.stringify({
                            ...JSON.parse(prev.address), // parse current address
                            line2: e.target.value, // update line2
                          }),
                        }))
                      }
                    />
                  </>
                ) : (
                  <>
                    <p>{parsedAddress.line1}</p>
                    <p>{parsedAddress.line2}</p>
                  </>
                )}
              </p>
            </div>
            <div className="flex gap-1 pt-2">
              <input
                checked={profileData.available}
                type="checkbox"
                name=""
                id=""
                onChange={(e) =>
                  setProfileData((prev) => ({
                    ...prev,
                    available: e.target.checked,
                  }))
                }
              />
              <label htmlFor="">Available</label>
            </div>
            <button
              onClick={updateProfile}
              className="px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-teal-50 transition-all mr-5"
            >
              save
            </button>
            <button
              onClick={() => setIsEdit(true)}
              className="px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-teal-50 transition-all"
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default DoctorProfile;
