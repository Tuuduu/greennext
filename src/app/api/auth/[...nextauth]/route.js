import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth/next";
import { connectDB } from "@/library/mongoDB/connect";
import User from "@/models/userModel";
import bcrypt from "bcrypt";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},

      async authorize(credentials) {
        if (!credentials || !credentials.email || !credentials.password) {
          throw new Error("Э-мэйл болон нууц үг шаардлагатай."); // Validate inputs
        }

        const { email, password } = credentials;

        try {
          // Connect to MongoDB
          await connectDB();

          // Find user by email
          const user = await User.findOne({ email });
          if (!user) {
            throw new Error("Ийм хэрэглэгч олдсонгүй."); // User not found
          }

          // Compare hashed passwords
          const hashedPasswordMatch = await bcrypt.compare(
            password,
            user.password
          );
          if (!hashedPasswordMatch) {
            throw new Error("Нууц үг буруу байна."); // Incorrect password
          }

          // Return user data for session
          return {
            userId: user._id.toString(),
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
        } catch (error) {
          console.error("Authorization Error: ", error);
          throw new Error("Нэвтрэхэд алдаа гарлаа. Дахин оролдоно уу.");
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET || "default_secret", // Default secret for dev
  pages: {
    signIn: "/register",
    signOut: "/",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.userId = user.userId;
        token.firstName = user.firstName;
        token.workingPart = user.workingPart;
        token.department = user.department;
        token.profileImage = user.profileImage;
        token.role = user.role;
        token.permissions = user.permissions;
        token.employment = user.employment;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        userId: token.userId,
        firstName: token.firstName,
        workingPart: token.workingPart,
        department: token.department,
        profileImage: token.profileImage,
        role: token.role,
        permissions: token.permissions,
        employment: token.employment,
      };
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
