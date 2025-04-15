import React from "react";
import { assets } from "../assets/assets_frontend/assets";

const Footer = () => {
  return (
    <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
      {/* ------ Left Section ------ */}
      <div>
        <p className="text-indigo-800 text-2xl font-medium text-left  mb-5 ">
          Labes Solutions
        </p>
        <p className="w-full md:w-2/3 text-gray-600 leading-6">
          Book your appointment effortlessly with our trusted network of
          experienced doctors. Whether you need a routine check-up or
          specialized medical care, our platform ensures a seamless booking
          experience. Stay informed, manage your schedules with ease, and
          receive quality healthcare at your convenience. Your health, our
          priority!
        </p>
      </div>

      {/* ------ Center Section ------ */}
      <div>
        <p className="text-xl font-medium mb-5">COMPANY</p>
        <ul className="flex flex-col gap-2 text-gray-600">
          <li>Home</li>
          <li>About us</li>
          <li>Contact us</li>
          <li>Privacy Policy</li>
        </ul>
      </div>

      {/* ------ Right Section ------ */}
      <div>
        <p className="text-xl font-medium mb-5">CONTACT US</p>
        <ul className="flex flex-col gap-2 text-gray-600">
          <li>labes.solutions@labes.com</li>
          <li>+91-1234567890</li>
        </ul>
      </div>

      {/* ------ Bottom Section (Copyright) ------ */}
      <div className="col-span-3">
        <hr />
        <p className="py-5 text-sm text-center">
          © 2025 Labes Solutions . All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
