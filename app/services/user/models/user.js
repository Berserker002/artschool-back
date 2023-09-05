const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      unique: true,
      sparse: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    phoneExtension: {
      type: String,
      enum: ["+91"],
    },
    phoneNumber: {
      type: String,
    },
    imageUrl: {
      type: String,
    },
    status: {
      type: String,
      default: "active",
      enum: ["active", "inactive"],
    },
    dateOfBirth: {
      type: Date,
    },
    role: {
      type: String,
      default: "user",
      enum: ["admin", "user"],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.index({ name: "text", email: "text", userName: "text" });

const User = mongoose.model("User", userSchema);

module.exports = User;
