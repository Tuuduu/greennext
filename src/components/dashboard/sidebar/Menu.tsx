"use client";
import React from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  AiOutlineHome,
  AiOutlineUser,
  AiOutlineOrderedList,
  AiOutlineMail,
} from "react-icons/ai"; // Икон ашигласан

const menuItems = [
  { icon: AiOutlineHome, label: "Хяналтын самбар", path: "/home/dashboard" },
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
  const pathname = usePathname(); // 🔥 Одоогийн хуудсыг авах

  return (
    <div className="w-full flex flex-col items-center mt-2 2xl:mt-8 gap-2 lg:gap-2 2xl:gap-4">
      {menuItems.map((item, index) => {
        const isActive = pathname === item.path; // 🔥 Одоогийн хуудастай таарч байгаа эсэхийг шалгах

        return (
          <button
            key={index}
            onClick={() => router.push(item.path)}
            className={`flex items-center gap-3 text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-700 
              font-medium rounded-lg text-[12px] 2xl:text-sm px-5 py-2.5 text-left w-4/5 shadow-sm border 
              transition-all duration-200 transform hover:-translate-y-1
              ${
                isActive
                  ? "bg-green-600 text-white dark:bg-green-500 font-bold shadow-lg border-green-600"
                  : "hover:bg-gray-200 dark:hover:bg-gray-600 border-gray-200 dark:border-gray-600"
              }`}
          >
            <item.icon
              size={20}
              className={`text-[12px] 2xl:text-sm ${
                isActive ? "text-white" : "text-green-600"
              }`}
            />
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
