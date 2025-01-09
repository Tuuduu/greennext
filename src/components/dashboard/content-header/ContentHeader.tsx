"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function ContentHeader() {
  const pathname = usePathname(); // Динамик замыг авах
  const [title, setTitle] = useState<string>("Ачаалж байна...");

  useEffect(() => {
    // Pathname-д тулгуурлан гарчиг шинэчлэх
    if (pathname) {
      const slug = pathname.split("/").pop() || "dashboard"; // Pathname-аас сүүлийн хэсгийг авах
      switch (slug) {
        case "dashboard":
          setTitle("Хяналтын самбар");
          break;
        case "users":
          setTitle("Хэрэглэгчид");
          break;
        case "tasks":
        case "ticket-order":
          setTitle("Ажлын захиалга");
          break;
        default:
          setTitle("Тохирох зам олдсонгүй");
      }
    }
  }, [pathname]);

  return (
    <div className="w-full h-auto p-6 bg-gray-50">
      {/* Контентын гарчиг */}
      <div className="p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-gray-700">{title}</h2>
      </div>
    </div>
  );
}
