"use client";
import React from "react";
import { useRouter } from "next/navigation";
import {
  AiOutlineHome,
  AiOutlineUser,
  AiOutlineOrderedList,
} from "react-icons/ai"; // Икон ашигласан

export default function Menu() {
  const router = useRouter();

  const buttonStyle =
    "flex items-center gap-3 text-white bg-green-600 hover:bg-green-500 font-medium rounded-lg text-sm px-5 py-2.5 text-left w-4/5 transition-all";

  return (
    <div className="w-full flex flex-col items-center mt-8 gap-5">
      {/* Dashboard товч */}
      <button
        onClick={() => router.push("/home/dashboard")}
        className={buttonStyle}
      >
        <AiOutlineHome size={20} />
        Dashboard
      </button>

      {/* Хэрэглэгчид товч */}
      <button
        onClick={() => router.push("/home/users")}
        className={buttonStyle}
      >
        <AiOutlineUser size={20} />
        Хэрэглэгчид
      </button>

      {/* Ажлын захиалга товч */}
      <button
        onClick={() => router.push("/home/ticket-order")}
        className={buttonStyle}
      >
        <AiOutlineOrderedList size={20} />
        Ажлын захиалга
      </button>
      <button
        onClick={() => router.push("/home/ticket-order")}
        className={buttonStyle}
      >
        <AiOutlineOrderedList size={20} />
        Санал хүсэлт
      </button>
    </div>
  );
}
