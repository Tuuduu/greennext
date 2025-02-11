"use client";
import React from "react";
import { useRouter } from "next/navigation";
import {
  AiOutlineHome,
  AiOutlineUser,
  AiOutlineOrderedList,
  AiOutlineMail,
} from "react-icons/ai"; // Икон ашигласан

const menuItems = [
  { icon: AiOutlineHome, label: "Dashboard", path: "/home/dashboard" },
  { icon: AiOutlineUser, label: "Хэрэглэгчид", path: "/home/users" },
  {
    icon: AiOutlineOrderedList,
    label: "Ажлын захиалга",
    path: "/home/ticket-order",
  },
  { icon: AiOutlineMail, label: "Санал хүсэлт", path: "/home/feedback" },
];

export default function Menu() {
  const router = useRouter();

  return (
    <div className="w-full flex flex-col items-center mt-2 2xl:mt-8 gap-2 lg:gap-2 2xl:gap-4">
      {menuItems.map((item, index) => (
        <button
          key={index}
          onClick={() => router.push(item.path)}
          className="flex items-center gap-3 text-gray-800 bg-gray-100 dark:text-gray-300 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 font-medium rounded-lg text-[12px] 2xl:text-sm px-5 py-2.5 text-left w-4/5 shadow-sm border border-gray-200 dark:border-gray-600 transition-all duration-200 transform hover:-translate-y-1"
        >
          <item.icon
            size={20}
            className="text-green-600 text-[12px] 2xl:text-sm"
          />
          {item.label}
        </button>
      ))}
    </div>
  );
}
