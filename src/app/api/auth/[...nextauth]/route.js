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
        const { email, password } = credentials;

        try {
          await connectDB();
          const user = await User.findOne({ email: email });
          if (!user) {
            return null; // Хэрэглэгч олдсонгүй
          }

          const hashedPasswordMatch = await bcrypt.compare(
            password,
            user.password
          );

          if (!hashedPasswordMatch) {
            return null; // Нууц үг буруу
          }

          const userData = {
            userId: user._id.toString(), // `ObjectId`-г `string` хэлбэрт хөрвүүлж байна
            name: user.username,
            email: user.email,
            role: user.role,
            department: user.department,
            profileImage: user.profileImage,
          };

          return userData; // Хэрэглэгчийн мэдээллийг буцаана
        } catch (error) {
          console.log("Error: ", error);
          return null; // Алдаа гарвал `null` буцаана
        }
      },
    }),
  ],
  secret: process.env.NEXTAUT_SECRET,
  pages: {
    signIn: "/register",
    signOut: "/",
  },
  callbacks: {
    async jwt({ token, user }) {
      // Хэрэв нэвтрэх үед `user` байгаа бол `token`-д мэдээллийг нэмнэ
      if (user) {
        token.userId = user.userId; // `userId`-г `token`-д нэмнэ
        token.role = user.role;
        token.department = user.department;
        token.profileImage = user.profileImage;
      }
      return token;
    },
    async session({ session, token }) {
      // `token`-оос `session` рүү мэдээллийг дамжуулна
      session.user.userId = token.userId; // `userId`-г `session`-д нэмнэ
      session.user.role = token.role;
      session.user.department = token.department;
      session.user.profileImage = token.profileImage;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
