import mongoose from "mongoose";
const Schema = mongoose.Schema;
import Bcrypt from "bcryptjs";

const UserSchema = new Schema({
  name: {
    type: String,
    validate: {
      validator: (v) => {
        return /^[a-z]+$/i.test(v);
      },
      message: '"{VALUE}" is not a valid name!',
    },
    min: 3,
    required: [true, "Username is required"],
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

UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await Bcrypt.hashSync(this.password, 10);
  }

  next();
});

UserSchema.methods.comparePassword = function (plaintext, callback) {
  return callback(null, Bcrypt.compareSync(plaintext, this.password));
};

const User = mongoose.model("User", UserSchema);
export default User;
