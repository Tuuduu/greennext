import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import { connectDB } from "@/library/mongoDB/connect";
import User from "@/models/userModel";
import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "user@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Э-мэйл болон нууц үг шаардлагатай.");
        }

        await connectDB();

        const user = (await User.findOne({ email: credentials.email })) as {
          _id: string;
          firstName: string;
          lastName: string;
          email: string;
          workingPart: string;
          department: string;
          profileImage: string;
          role: string;
          permissions: string[];
          employment: string;
          password: string;
        };
        if (!user) {
          throw new Error("Ийм хэрэглэгч олдсонгүй.");
        }

        const isPasswordCorrect = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isPasswordCorrect) {
          throw new Error("Нууц үг буруу байна.");
        }

        return {
          id: user._id.toString(),
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          workingPart: user.workingPart,
          department: user.department,
          profileImage: user.profileImage,
          role: user.role,
          permissions: user.permissions,
          employment: user.employment,
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET || "default_secret",
  pages: {
    signIn: "/register",
    signOut: "/",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token = { ...token, ...user };
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token as any;
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  debug: process.env.NEXTAUTH_DEBUG === "true",
};
