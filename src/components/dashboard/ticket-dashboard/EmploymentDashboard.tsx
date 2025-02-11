"use client";

import { useEffect, useRef } from "react";
import anime from "animejs";
import Image from "next/image";
import profileImage from "@/picture/profile_av.jpg";

const EmploymentDashboard = ({ employment }: { employment: any[] }) => {
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log("📌 EmploymentDashboard received employment:", employment);

    if (listRef.current) {
      anime({
        targets: listRef.current.children,
        opacity: [0, 1],
        scale: [0.9, 1],
        translateY: [20, 0],
        easing: "easeOutQuad",
        duration: 600,
        delay: anime.stagger(100),
      });
    }
  }, [employment]);

  return (
    <div className="w-full h-auto p-4">
      <h2 className="text-md 2xl:text-xl text-center 2xl:text-left font-semibold text-gray-800 dark:text-gray-200 mb-4">
        Инженерүүдийн жагсаалт
      </h2>

      <div
        ref={listRef}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 xl:grid-cols-3 2xl:grid-cols-4 gap-4 h-[400px] 2xl:h-auto overflow-y-auto"
      >
        {employment.map((engineer: any, index: number) => (
          <div
            key={index}
            className="flex flex-col items-center justify-between bg-white dark:bg-gray-700 p-4 rounded-xl shadow-md hover:shadow-lg transition-transform hover:scale-[1.02] border dark:border-gray-700"
          >
            {/* Profile Image */}
            <div className="w-16 h-16 2xl:w-20 2xl:h-20 rounded-full overflow-hidden border border-gray-300 dark:border-gray-600 shadow-md">
              <Image
                src={engineer.profileImage || profileImage}
                alt={engineer.firstName}
                width={80}
                height={80}
                className="object-cover w-full h-full"
              />
            </div>

            {/* Name & Job */}
            <h3 className="mt-3 text-[12px] 2xl:text-sm font-semibold text-gray-900 dark:text-gray-100 text-center">
              {engineer.firstName}
            </h3>
            <p className="text-[10px] 2xl:text-[10px] text-gray-500 dark:text-gray-400 text-center">
              {engineer.employment}
            </p>

            {/* Ticket Count */}
            <div className="mt-3 px-1 bg-blue-500 text-white text-center rounded-md text-[10px] 2xl:text-[12px] font-medium shadow">
              Хаасан дуудлага: {engineer.ticketCount}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmploymentDashboard;
