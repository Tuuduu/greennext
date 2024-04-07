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
    profileImage: {
      type: String,
      required: [false, "Заавал оруулахгүй байж болно."],
    },
    role: {
      type: String,
      required: [true, "Заавал Оруулна."],
    },
    department: {
      type: String,
      required: [true, "Заавал Оруулна."],
    },
  },
  {
    timestamps: true,
  }
);

const user = mongoose.models[["users"]] || mongoose.model("users", userScheme);

export default user;
