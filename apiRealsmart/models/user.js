const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: {
      type: String,
      required: [true, "Please provide your email"],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    phoneNumber: {
      type: String,
      required: [true, "Please provide your phoneNumber"],
      unique: true,
      validate: [validator.isMobilePhone, "Please provide a valid phoneNumber"],
    },
    password: {
      type: String,
      required: [false, "Please provide a password"],
      minlength: 4,
      maxlength: 60,
      select: false,
      validate: {
        validator: function (v) {
          return /^(?=.*[a-z])(?=.*[A-Z])/.test(v);
        },
        message: "Password must contain both uppercase and lowercase letters",
      },
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

UserSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("User", UserSchema);
module.exports = User;
