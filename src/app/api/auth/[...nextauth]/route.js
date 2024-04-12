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
            return null;
          }
          const hashedPasswordMatch = await bcrypt.compare(
            password,
            user.password
          );

          if (!hashedPasswordMatch) {
            return null;
          }

          const userData = {
            name: user.username,
            email: user.email,
            role: user.role,
            department: user.department,
            profileImage: user.profileImage,
          };

          return userData; // Return the user object if authentication succeeds
        } catch (error) {
          console.log("Error: ", error);
          return null; // Return null in case of any error
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
    async session({ session, token }) {
      // Assuming `token` has the additional user properties
      // You might need to adjust based on how your token is structured
      session.user.role = token.role;
      session.user.department = token.department;
      session.user.profileImage = token.profileImage;
      return session;
    },
    // You might also need to customize the `jwt` callback to include `role` and `department` in the token if they are not already there
    async jwt({ token, user }) {
      // On sign in, add the properties to the token
      if (user) {
        token.role = user.role;
        token.department = user.department;
        token.profileImage = user.profileImage;
      }
      return token;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
