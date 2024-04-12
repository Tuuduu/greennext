"use server";
import {
  sessionOptions,
  SessionData,
  defaultSession,
} from "@/library/nextauth/librarry";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

export const setSeassion = async () => {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  if (!session.isLoggedIn) {
    session.isLoggedIn = defaultSession.isLoggedIn;
  }

  return session;
};
export const login = async () => {};
export const logout = async () => {};
