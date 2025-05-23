import mongoose from "mongoose";

export const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    passowrd: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const Users = mongoose.model("Users", UserSchema);
