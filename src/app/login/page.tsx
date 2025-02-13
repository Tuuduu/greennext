import React from "react";
import LoginForm from "@/components/login/LoginForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/library/nextauth/AuthOptions";

export default async function page() {
  const session = await getServerSession(authOptions);

  if (session) {
    // redirect("/home");
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 grid place-items-center h-screen">
      <LoginForm />
    </div>
  );
}
