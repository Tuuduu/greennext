import { Session } from "next-auth";

// Extend the User type within the Session type
declare module "next-auth" {
  // This technique is called module augmentation
  interface Session {
    user: {
      userId: string;
      // Include the default properties
      name?: string | null;
      email?: string | null;
      image?: string | null;
      // Add your custom properties
      role?: string;
      department?: string;
    };
  }
}
