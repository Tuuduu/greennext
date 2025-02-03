import NextAuth from "next-auth";
import { authOptions } from "@/library/nextauth/AuthOptions";

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
