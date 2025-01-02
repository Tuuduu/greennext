import mongoose, { Document, Model, Schema } from "mongoose";

// Хэрэглэгчийн интерфэйс тодорхойлох
interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  profileImage?: string;
  role: string;
  department: string;
}

// Хэрэглэгчийн схем тодорхойлох
const userSchema: Schema<IUser> = new Schema(
  {
    username: {
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

// Хэрэглэгчийн загвар үүсгэх эсвэл байгаа бол ашиглах
const User: Model<IUser> =
  mongoose.models.users || mongoose.model<IUser>("users", userSchema);

export default User;
