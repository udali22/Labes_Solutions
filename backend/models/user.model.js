import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, "Invalid email format"], // Expression Régulier pour valider le format du email
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: Object,
  },
  gender: {
    type: String,
    default: "Not Selected",
  },
  dob: {
    type: String,
    default: "Not Selected",
  },
  phone: {
    type: String,
    default: "00000000",
  },
});

const userModel = mongoose.model("user", userSchema); // create the model when we run the project
export default userModel;
