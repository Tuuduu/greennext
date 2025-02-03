"use client";

import { useRouter } from "next/navigation";
import anime from "animejs/lib/anime.es.js";
import { AiOutlineArrowRight } from "react-icons/ai";
import { useRef } from "react";
import Logo from "@/components/Logo/Logo";
import ThemeToggle from "@/components/ThemeToggle";

export default function HomePage() {
  const router = useRouter();
  const buttonRefs = useRef<HTMLDivElement[]>([]); // Ref for buttons with their wrapper divs

  // Hover animation for buttons
  const handleMouseEnter = (index: number) => {
    const button = buttonRefs.current[index];
    if (button) {
      anime({
        targets: button,
        scale: 1.05, // Илүү мэдэгдэхүйц өсгөлт
        duration: 100, // Smooth animation duration
        easing: "easeOutQuad", // Илүү smooth easing
      });
    }
  };

  const handleMouseLeave = (index: number) => {
    const button = buttonRefs.current[index];
    if (button) {
      anime({
        targets: button,
        scale: 1,
        duration: 150, // Илүү удаан хугацаа
        easing: "easeOutQuad", // Ижил easing
      });
    }
  };

  // Click animation for buttons
  const handleClick = (index: number, link: string) => {
    const button = buttonRefs.current[index];
    if (button) {
      // Fade-out animation for the clicked button
      anime({
        targets: button,
        opacity: [1, 0], // Сарниж алга болох
        translateX: [-20, 20],
        easing: "easeInOutQuad",
        duration: 500, // Анимацийн үргэлжлэх хугацаа
        complete: () => {
          router.push(link); // Шинэ хуудас руу шилжих
        },
      });
    }
  };

  const buttonStyle =
    "w-full flex items-center justify-center gap-2 text-white bg-gradient-to-r from-blue-400 to-green-500 font-medium rounded-lg text-sm px-5 py-2.5 shadow-md transition-transform transform";

  return (

    <div className="w-full min-h-screen h-screen flex flex-col bg-gradient-to-r from-blue-100 via-white to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-4">
          <div className="w-full h-full flex items-center justify-center">
      {/* Login button for admin */}
      <div className="absolute top-5 right-5 flex gap-x-4">
      <button
          type="button"
          onClick={() => router.push("/feedback")}
          className="focus:outline-none flex gap-x-2 text-white bg-green-700 hover:bg-green-500 font-medium rounded-lg text-sm px-5 py-2.5 shadow-lg transform transition-transform hover:scale-105"
        >
          🌟 Санал хүсэлт 📝
        </button>
        <button
          type="button"
          onClick={() => router.push("/login")}
          className="focus:outline-none flex gap-x-2 text-white bg-green-700 hover:bg-green-500 font-medium rounded-lg text-sm px-5 py-2.5 shadow-lg transform transition-transform hover:scale-105"
        >
          нэвтрэх
          <AiOutlineArrowRight size={20} />
        </button>
      </div>
      <div className="absolute top-5 left-5">
        <ThemeToggle />
      </div>
      {/* Main Content */}
      <div className="w-full max-w-lg bg-white/50 backdrop-blur-lg shadow-lg p-8 rounded-3xl border border-gray-300 dark:bg-gray-700/50 dark:border-gray-600">
        {/* Logo Section */}
        <Logo />
        {/* Order Buttons */}
        <h2 className="pb-6 text-center font-bold text-lg text-gray-700 dark:text-gray-200">
          Ажлын захиалга үүсгэх
        </h2>
        <div className="flex flex-col gap-y-4">
          {[
            { text: "Мэдээлэл технологийн алба", link: "/ticket/mta" },
            { text: "Инженер техникийн алба", link: "/ticket/ita" },
            { text: "Үйл ажиллагааны алба", link: "/ticket/ata" },
          ].map((item, index) => (
            <div
              key={index}
              ref={(el) => {
                if (el) buttonRefs.current[index] = el;
              }} // Assign ref dynamically
              className="relative"
            >
              <button
                type="button"
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={() => handleMouseLeave(index)}
                onClick={() => handleClick(index, item.link)}
                className={`${buttonStyle} dark:from-blue-600 dark:to-green-700`}
              >
                {item.text}
                <AiOutlineArrowRight size={20} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
    {/* footer */}
    <div className="w-full grid grid-cols-3 py-4">
    <p className="font-light text-sm text-gray-700 dark:text-gray-300 text-left">2025/02/03</p>
      <p className="font-light text-sm text-gray-700 dark:text-gray-300 text-center">© 2025 Грийн Групп ХХК</p>
      <p className="font-light text-sm text-gray-700 dark:text-gray-300 text-right">v1.0.0</p>
    </div>
    </div>
  );
}
