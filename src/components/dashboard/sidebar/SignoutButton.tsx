"use client";
import { signOut } from "next-auth/react";
import { AiOutlineLogout } from "react-icons/ai";

export default function SignoutButton() {
  const handleSignOut = async () => {
    try {
      await signOut({
        callbackUrl: "/",
        redirect: true,
      });
    } catch (error) {
      console.error("Гарах үед алдаа гарлаа:", error);
    }
  };

  return (
    <div className="w-full flex items-center justify-center pb-6">
      <button
        onClick={handleSignOut}
        className="flex items-center gap-3 text-white bg-red-600 hover:bg-red-500 font-medium rounded-lg text-sm px-6 py-3 text-center w-3/4 shadow-md transition-transform duration-200 transform hover:scale-105 focus:ring-4 focus:ring-red-300"
      >
        <AiOutlineLogout size={20} className="text-white" />
        Гарах
      </button>
    </div>
  );
}
