import mongoose from "mongoose";
const Schema = mongoose.Schema;

const User = new Schema({
  name: {
    first_name: {
      type: String,
      validate: {
        validator: (v) => {
          return /^[a-z]+$/i.test(v);
        },
        message: '"{VALUE}" is not a valid name!',
      },
      min: 3,
      required: [true, "Firstname is required"],
    },
    last_name: {
      type: String,
      validate: {
        validator: (v) => {
          return /^[a-z]+$/i.test(v);
        },
        message: '"{VALUE}" is not a valid name!',
      },
      min: 3,
      required: [true, "Lastname is required"],
    },
  },
  email: {
    type: String,
    validate: {
      validator: (v) => {
        return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
      },
      message: '"{VALUE}" is not a valid email address!',
    },
    required: [true, "Email is required"],
  },
  password: { type: String, max: 100 },
});

const UserSchema = mongoose.model("User", User);
export default UserSchema;
