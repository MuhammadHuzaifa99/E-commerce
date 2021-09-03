const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const signUpSchema = new mongoose.Schema(
  {
    profileName: {
      type: String,
      required: [true, "profile name is required"],
      unique: [true,"This user has been signed up"]
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: [true, "This user has been signed up"],
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
      minLength: 8,
    },
    confirmPassword: {
      type: String,
      required: [true, "please re-enter same password"],
      validate: [
        function (val) {
          return val == this.password;
        },
        "password not match",
      ],
    },
  },
  {
    timestamps: true,
  }
);

signUpSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const encryptPassword = await bcrypt.hash(this.password, 12);
  this.password = encryptPassword;
  this.confirmPassword = undefined;
  next();
});

const User = new mongoose.model("User", signUpSchema);

module.exports = User;
