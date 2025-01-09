"use client";
import { signOut } from "next-auth/react";
import { AiOutlineLogout } from "react-icons/ai"; // Гарах товчийн икон

export default function SignoutButton() {
  return (
    <div className="w-full flex flex-col items-center pb-5">
      <button
        onClick={() => signOut({ callbackUrl: "/" })}
        className="flex items-center gap-3 text-white bg-green-600 hover:bg-green-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center w-4/5 shadow-md transition-all"
      >
        <AiOutlineLogout size={20} />
        Гарах
      </button>
    </div>
  );
}
