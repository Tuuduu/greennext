"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import anime from "animejs";

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

    // Анимэйшн гарчигт нэмэх
    anime({
      targets: ".content-header h2",
      opacity: [0, 1],
      translateY: [-10, 0],
      easing: "easeOutExpo",
      duration: 500,
    });
  }, [pathname]);

  return (
    <div className="w-full h-auto bg-gradient-to-r rounded-lg from-gray-50 via-white to-gray-50">
      {/* Контентын гарчиг */}
      <div className="content-header p-4 bg-white rounded-lg shadow-md border border-gray-200">
        <h2 className="text-xl md:text-2xl font-bold text-gray-700 text-center">
          {title}
        </h2>
      </div>
    </div>
  );
}
