import React, { useContext, useState } from "react";
import { assets } from "../assets/assets_admin/assets.js";
import { AdminContext } from "../context/AdminContext.jsx";
import axios from "axios";
import { toast } from "react-toastify";
import { DoctorContext } from "../context/DoctorContext.jsx";
const Login = () => {
  const [state, setState] = useState("Admin");
  const { setAtoken, backendurl } = useContext(AdminContext);
  const [email, setEmail] = useState("");
  const [password, setPaswword] = useState("");
  const { setDToken } = useContext(DoctorContext);
  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (state === "Admin") {
        const { data } = await axios.post(backendurl + "/api/admin/login", {
          email,
          password,
        });

        if (data.success) {
          localStorage.setItem("aToken", data.token);
          setAtoken(data.token);
          toast.success("Connexion réussie !");
        } else {
          toast.error(data.message || "Erreur lors de la connexion !");
        }
      } else {
        const { data } = await axios.post(backendurl + "/api/doctor/login", {
          email,
          password,
        });
        if (data.success) {
          localStorage.setItem("dToken", data.token);
          setDToken(data.token);
          toast.success("connexion réussie ! ");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);

      // Gestion des erreurs du backend
      if (error.response) {
        toast.error(error.response.data?.message);
      } else if (error.request) {
        toast.error("Le serveur ne répond pas. Vérifie ta connexion !");
      } else {
        toast.error("Une erreur est survenue !");
      }
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="min-h-[80vh] flex items-center justify-center bg-gray-100"
    >
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">
          <span className="text-primary">{state}</span> Login
        </h2>
        <div className="mb-4">
          <p
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={email}
            type="email"
            required
          />
        </div>
        <div className="mb-6">
          <p
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </p>
          <input
            onChange={(e) => setPaswword(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            value={password}
            type="password"
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4  focus:outline-none focus:shadow-outline rounded-full"
            type="submit"
          >
            Sign In
          </button>
          {state === "Admin" ? (
            <p>
              Doctor Login ?{" "}
              <span
                className="text-blue-500 cursor-pointer underline  "
                onClick={() => setState("Doctor")}
              >
                Click here
              </span>
            </p>
          ) : (
            <p>
              Admin Login ?{" "}
              <span
                className="text-blue-500 cursor-pointer underline"
                onClick={() => setState("Admin")}
              >
                Click here
              </span>
            </p>
          )}
        </div>
      </div>
    </form>
  );
};

export default Login;
