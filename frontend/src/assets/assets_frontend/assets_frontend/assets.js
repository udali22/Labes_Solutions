import appointment_img from "./appointment_img.png";
import header_img from "./header_img.png";
import group_profiles from "./group_profiles.png";
import profile_pic from "./profile_pic.png";
import contact_image from "./contact_image.png";
import about_image from "./about_image.png";
import logo from "./logo.svg";
import dropdown_icon from "./dropdown_icon.svg";
import menu_icon from "./menu_icon.svg";
import cross_icon from "./cross_icon.png";
import chats_icon from "./chats_icon.svg";
import verified_icon from "./verified_icon.svg";
import arrow_icon from "./arrow_icon.svg";
import info_icon from "./info_icon.svg";
import upload_icon from "./upload_icon.png";
import stripe_logo from "./stripe_logo.png";
import razorpay_logo from "./razorpay_logo.png";
import doc1 from "./doc1.png";
import doc2 from "./doc2.png";
import doc3 from "./doc3.png";
import doc4 from "./doc4.png";
import doc5 from "./doc5.png";
import doc6 from "./doc6.png";
import doc7 from "./doc7.png";
import doc8 from "./doc8.png";
import doc9 from "./doc9.png";
import doc10 from "./doc10.png";
import doc11 from "./doc11.png";
import doc12 from "./doc12.png";
import doc13 from "./doc13.png";
import doc14 from "./doc14.png";
import doc15 from "./doc15.png";
import Dermatologist from "./Dermatologist.svg";
import Gastroenterologist from "./Gastroenterologist.svg";
import General_physician from "./General_physician.svg";
import Gynecologist from "./Gynecologist.svg";
import Neurologist from "./Neurologist.svg";
import Pediatricians from "./Pediatricians.svg";

export const assets = {
  appointment_img,
  header_img,
  group_profiles,
  logo,
  chats_icon,
  verified_icon,
  info_icon,
  profile_pic,
  arrow_icon,
  contact_image,
  about_image,
  menu_icon,
  cross_icon,
  dropdown_icon,
  upload_icon,
  stripe_logo,
  razorpay_logo,
};

export const specialityData = [
  {
    speciality: "General physician",
    image: General_physician,
  },
  {
    speciality: "Gynecologist",
    image: Gynecologist,
  },
  {
    speciality: "Dermatologist",
    image: Dermatologist,
  },
  {
    speciality: "Pediatricians",
    image: Pediatricians,
  },
  {
    speciality: "Neurologist",
    image: Neurologist,
  },
  {
    speciality: "Gastroenterologist",
    image: Gastroenterologist,
  },
];

export const doctors = [
  {
    _id: "doc1",
    name: "Dr. Mohamed Ben Ali",
    image: doc1,
    speciality: "General physician",
    degree: "MBBS",
    experience: "4 Years",
    about:
      "Dr. Mohamed Ben Ali is dedicated to providing comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.",
    fees: 50,
    address: {
      line1: "17th Cross, Habib Bourguiba Avenue",
      line2: "Tunis, Tunisia",
    },
  },
  {
    _id: "doc2",
    name: "Dr. Nadine Maali",
    image: doc2,
    speciality: "Gynecologist",
    degree: "MBBS",
    experience: "3 Years",
    about:
      "Dr. Nadine Maali is passionate about women's health and provides expert care in gynecology and obstetrics.",
    fees: 60,
    address: {
      line1: "27th Cross, Bourguiba Street",
      line2: "Sousse, Tunisia",
    },
  },
  {
    _id: "doc3",
    name: "Dr. Salem Jebali",
    image: doc3,
    speciality: "Dermatologist",
    degree: "MBBS",
    experience: "1 Year",
    about:
      "Dr. Salem Jebali specializes in diagnosing and treating skin conditions, helping patients achieve healthy skin.",
    fees: 30,
    address: {
      line1: "37th Cross, Hédi Chaker Avenue",
      line2: "Sfax, Tunisia",
    },
  },
  {
    _id: "doc4",
    name: "Dr. Youssef Mansouri",
    image: doc4,
    speciality: "Pediatrician",
    degree: "MBBS",
    experience: "2 Years",
    about:
      "Dr. Youssef Mansouri is dedicated to providing excellent pediatric care, ensuring the well-being of children.",
    fees: 40,
    address: {
      line1: "47th Cross, Ibn Khaldoun Street",
      line2: "Nabeul, Tunisia",
    },
  },
  {
    _id: "doc5",
    name: "Dr. Leila Gharbi",
    image: doc5,
    speciality: "Neurologist",
    degree: "MBBS",
    experience: "4 Years",
    about:
      "Dr. Leila Gharbi specializes in treating neurological disorders with a patient-centered approach.",
    fees: 50,
    address: {
      line1: "57th Cross, Farhat Hached Road",
      line2: "Monastir, Tunisia",
    },
  },
  {
    _id: "doc6",
    name: "Dr. Ahmed Bouzid",
    image: doc6,
    speciality: "Neurologist",
    degree: "MBBS",
    experience: "4 Years",
    about:
      "Dr. Ahmed Bouzid is an experienced neurologist dedicated to treating brain and nervous system disorders.",
    fees: 50,
    address: {
      line1: "57th Cross, Hédi Nouira Avenue",
      line2: "Gabès, Tunisia",
    },
  },
  {
    _id: "doc7",
    name: "Dr. Amin Mrabet",
    image: doc7,
    speciality: "General physician",
    degree: "MBBS",
    experience: "4 Years",
    about:
      "Dr. Amin Mrabet provides comprehensive healthcare services with a focus on preventive medicine.",
    fees: 50,
    address: {
      line1: "17th Cross, Mohamed V Street",
      line2: "Tunis, Tunisia",
    },
  },
  {
    _id: "doc8",
    name: "Dr. Rami Mzoughi",
    image: doc8,
    speciality: "Gynecologist",
    degree: "MBBS",
    experience: "3 Years",
    about:
      "Dr. Rami Mzoughi specializes in gynecology and ensures the best care for women’s health.",
    fees: 40,
    address: {
      line1: "27th Cross, Bourguiba Avenue",
      line2: "Sfax, Tunisia",
    },
  },
  {
    _id: "doc9",
    name: "Dr. Nourhan Ben Said",
    image: doc9,
    speciality: "Dermatologist",
    degree: "MBBS",
    experience: "1 Year",
    about:
      "Dr. Nourhan Ben Said is a dermatologist helping patients with skin concerns and cosmetic treatments.",
    fees: 30,
    address: {
      line1: "37th Cross, Al Manar Street",
      line2: "Bizerte, Tunisia",
    },
  },
  {
    _id: "doc10",
    name: "Dr. Sami Khelil",
    image: doc10,
    speciality: "Pediatrician",
    degree: "MBBS",
    experience: "2 Years",
    about:
      "Dr. Sami Khelil provides excellent pediatric care, ensuring children’s health and wellness.",
    fees: 40,
    address: {
      line1: "47th Cross, Ibn Sina Avenue",
      line2: "Kairouan, Tunisia",
    },
  },
  {
    _id: "doc11",
    name: "Dr. Mariem Gharsalli",
    image: doc11,
    speciality: "Neurologist",
    degree: "MBBS",
    experience: "4 Years",
    about:
      "Dr. Mariem Gharsalli is a neurologist committed to diagnosing and treating nervous system disorders.",
    fees: 50,
    address: {
      line1: "57th Cross, Kasbah Street",
      line2: "Gafsa, Tunisia",
    },
  },
  {
    _id: "doc12",
    name: "Dr. Anis Jaziri",
    image: doc12,
    speciality: "Neurologist",
    degree: "MBBS",
    experience: "4 Years",
    about:
      "Dr. Anis Jaziri is dedicated to providing high-quality neurological care and treatments.",
    fees: 50,
    address: {
      line1: "57th Cross, Hédi Chaker Avenue",
      line2: "Tozeur, Tunisia",
    },
  },
  {
    _id: "doc13",
    name: "Dr. Sana Kacem",
    image: doc13,
    speciality: "General physician",
    degree: "MBBS",
    experience: "4 Years",
    about:
      "Dr. Sana Kacem provides primary healthcare services with a focus on preventive medicine.",
    fees: 50,
    address: {
      line1: "17th Cross, Avenue de France",
      line2: "Tunis, Tunisia",
    },
  },
  {
    _id: "doc14",
    name: "Dr. Hatem Ferjani",
    image: doc14,
    speciality: "Gynecologist",
    degree: "MBBS",
    experience: "3 Years",
    about:
      "Dr. Hatem Ferjani is a specialist in gynecology, providing top-quality women’s healthcare.",
    fees: 40,
    address: {
      line1: "27th Cross, Hédi Nouira Street",
      line2: "Sfax, Tunisia",
    },
  },
  {
    _id: "doc15",
    name: "Dr. Ines Hamza",
    image: doc15,
    speciality: "Dermatologist",
    degree: "MBBS",
    experience: "1 Year",
    about:
      "Dr. Ines Hamza specializes in dermatology, helping patients achieve healthy and radiant skin.",
    fees: 30,
    address: {
      line1: "37th Cross, Ibn Khaldoun Avenue",
      line2: "Nabeul, Tunisia",
    },
  },
];
