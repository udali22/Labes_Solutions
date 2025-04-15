import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets_admin/assets";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";
const AddDoctor = () => {
  const [docImg, setDocImg] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [experience, setExperience] = useState("1 Year");
  const [fees, setFees] = useState("");
  const [speciality, setSpeciality] = useState("General Physician");
  const [degree, setDegree] = useState("");
  const [about, setAbout] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const { backendurl, aToken } = useContext(AdminContext);

  const onSubmiHandler = async (event) => {
    event.preventDefault();
    try {
      if (!docImg) {
        return toast.error("image not selected !");
      }
      const formData = new FormData();

      formData.append("image", docImg); // Assurez-vous que docImg est un fichier
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("experience", experience);
      formData.append("fees", Number(fees)); // Correction de la faute de frappe
      formData.append("about", about);
      formData.append("speciality", speciality);
      formData.append("degree", degree); // Correction de la duplication
      formData.append(
        "address",
        JSON.stringify({ line1: address1, line2: address2 })
      );

      // Vérification des données avant l'envoi
      formData.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });
      const { data } = await axios.post(
        backendurl + "/api/admin/add-doctor",
        formData,
        {
          headers: { aToken },
        }
      );
      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {}
  };
  return (
    <form onSubmit={onSubmiHandler} className="m-5 w-full">
      <h2 className="text-2xl font-semibold text-center mb-6">Add Doctor</h2>

      {/* Upload Doctor Image */}
      <div className="mb-6 flex flex-col items-center">
        <label htmlFor="doc-img" className="cursor-pointer text-center mb-2">
          <img
            src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
            alt="Upload Icon"
            className="w-24 h-24"
          />
        </label>
        <input
          onChange={(e) => setDocImg(e.target.files[0])}
          type="file"
          id="doc-img"
          hidden
        />
        <p className="text-gray-600">Upload doctor picture</p>
      </div>

      {/* Form Fields */}
      <div className="space-y-6">
        {/* Doctor Name */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Doctor Name
          </label>
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Name"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Doctor Email */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Doctor Email
          </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Doctor Password */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Doctor Password
          </label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Experience */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Experience
          </label>
          <select className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <option
              onChange={(e) => setExperience(e.target.value)}
              value="1 Year"
            >
              1 Year
            </option>
            <option
              onChange={(e) => setExperience(e.target.value)}
              value="2 Year"
            >
              2 Year
            </option>
            <option
              onChange={(e) => setExperience(e.target.value)}
              value="3 Year"
            >
              3 Year
            </option>
            <option
              onChange={(e) => setExperience(e.target.value)}
              value="4 Year"
            >
              4 Year
            </option>
            <option
              onChange={(e) => setExperience(e.target.value)}
              value="5 Year"
            >
              5 Year
            </option>
            <option
              onChange={(e) => setExperience(e.target.value)}
              value="6 Year"
            >
              6 Year
            </option>
            <option
              onChange={(e) => setExperience(e.target.value)}
              value="7 Year"
            >
              7 Year
            </option>
            <option
              onChange={(e) => setExperience(e.target.value)}
              value="8 Year"
            >
              8 Year
            </option>
            <option
              onChange={(e) => setExperience(e.target.value)}
              value="9 Year"
            >
              9 Year
            </option>
          </select>
        </div>

        {/* Fees */}
        <div>
          <label className="text-sm font-medium text-gray-700">Fees</label>
          <input
            onChange={(e) => setFees(e.target.value)}
            type="number"
            placeholder="Fees"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Speciality */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Speciality
          </label>
          <select className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <option
              onChange={(e) => setSpeciality(e.target.value)}
              value="General physician"
            >
              General physician
            </option>
            <option
              onChange={(e) => setSpeciality(e.target.value)}
              value="Gynecologist"
            >
              Gynecologist
            </option>
            <option
              onChange={(e) => setSpeciality(e.target.value)}
              value="Dermatologist"
            >
              Dermatologist
            </option>
            <option
              onChange={(e) => setSpeciality(e.target.value)}
              value="Pediatrician"
            >
              Pediatrician
            </option>
            <option
              onChange={(e) => setSpeciality(e.target.value)}
              value="Neurologist"
            >
              Neurologist
            </option>
            <option
              onChange={(e) => setSpeciality(e.target.value)}
              value="Gastroenterologist"
            >
              Gastroenterologist
            </option>
          </select>
        </div>

        {/* Degree */}
        <div>
          <label className="text-sm font-medium text-gray-700">Degree</label>
          <input
            onChange={(e) => setDegree(e.target.value)}
            type="text"
            placeholder="Education"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Address */}
        <div>
          <label className="text-sm font-medium text-gray-700">Address</label>
          <input
            onChange={(e) => setAddress1(e.target.value)}
            type="text"
            placeholder="Address Line 1"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            onChange={(e) => setAddress2(e.target.value)}
            type="text"
            placeholder="Address Line 2"
            required
            className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* About Doctor */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            About Doctor
          </label>
          <textarea
            onChange={(e) => setAbout(e.target.value)}
            placeholder="About Doctor"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="mt-6 flex justify-center">
        <button
          type="submit"
          className="w-full py-3 px-6 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition duration-300"
        >
          Add Doctor
        </button>
      </div>
    </form>
  );
};

export default AddDoctor;
