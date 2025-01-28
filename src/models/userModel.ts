import mongoose, { Document, Model, Schema } from "mongoose";

// Хэрэглэгчийн интерфэйс тодорхойлох
interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  employment: string;
  password: string;
  profileImage?: string;
  department: string;
  workingPart: string;
  birthday: string;
  sex: string;
  role: string; // Default: "user"
  permissions: string[];
}

// Хэрэглэгчийн схем тодорхойлох
const userSchema: Schema<IUser> = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "Хэрэглэгчийн нэрийг заавал оруулна."],
    },
    lastName: {
      type: String,
      required: [true, "Хэрэглэгчийн нэрийг заавал оруулна."],
    },
    email: {
      type: String,
      required: [true, "Хэрэглэгчийн имэйл заавал оруулна."],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Хэрэглэгчийн нууц үг заавал оруулна."],
    },
    profileImage: {
      type: String,
      required: false,
    },
    birthday: {
      type: String,
      required: false,
    },
    sex: {
      type: String,
      required: false,
    },
    department: {
      type: String,
      required: [true, "Заавал Оруулна."],
    },
    workingPart: {
      type: String,
      required: [true, "Заавал Оруулна."],
    },
    employment: {
      type: String,
      required: [true, "Заавал Оруулна."],
    },
    role: { type: String, default: "user" }, // Default role: "user"
    permissions: { type: [String], default: [] }, // Default: empty array
  },
  {
    timestamps: true,
  }
);

// Хэрэглэгчийн загвар үүсгэх эсвэл байгаа бол ашиглах
const User: Model<IUser> =
  mongoose.models.users || mongoose.model<IUser>("users", userSchema);

export default User;
