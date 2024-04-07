import { SessionOptions } from "iron-session";

export interface SessionData {
  userId?: string;
  username?: string;
  email?: string;
  profileImage?: string;
  role?: string;
  department?: string;
}

export const sessionOptions: SessionOptions = {
  password: process.env.NEXTAUT_SECRET!,
  cookieName: "green-session",
  cookieOptions: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  },
};
