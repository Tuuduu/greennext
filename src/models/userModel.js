import mongoose from "mongoose";

const userScheme = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Хэрэглэгчийн нэрийг заавал оруулна."],
    },
    email: {
      type: String,
      required: [true, "Хэрэглэгчийн имэйл заавал оруулна."],
      unique: [true, "Must be unique"],
    },
    password: {
      type: String,
      required: [true, "Хэрэглэгчийн нууц үг заавал оруулна."],
    },
  },
  {
    timestamps: true,
  }
);

const user = mongoose.models.user || mongoose.model("user", userScheme);

export default user;
