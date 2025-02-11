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
        case "feedback":
          setTitle("Санал хүсэлт");
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
    <div className="w-full h-auto bg-gradient-to-r rounded-lg from-gray-50 via-white to-gray-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800">
      {/* Контентын гарчиг */}
      <div className="content-header p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl 2xl:text-2xl font-bold text-gray-700 dark:text-gray-300 text-center">
          {title}
        </h2>
      </div>
    </div>
  );
}
