import { sessionOptions, SessionData } from "@/library/nextauth/librarry";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

export const setSeassion = async () => {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);
  return session;
};
export const login = async () => {};
export const logout = async () => {};
