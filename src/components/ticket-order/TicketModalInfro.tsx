"use client";

import React, { useState, useEffect } from "react";
import anime from "animejs";

export default function TicketModalInfo({ ticketData }: { ticketData: any }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    if (hoveredIndex !== null) {
      const tooltip = document.querySelector(`.tooltip-${hoveredIndex}`);
      if (tooltip) {
        tooltip.classList.remove("hidden");
        anime({
          targets: tooltip,
          opacity: [0, 1],
          translateY: [10, 0],
          easing: "easeOutQuad",
          duration: 300,
        });
      }
    }
  }, [hoveredIndex]);

  const handleMouseEnter = (index: number, value: string) => {
    if (value.length > 20) {
      setHoveredIndex(index);
    }
  };

  const handleMouseLeave = (index: number) => {
    const tooltip = document.querySelector(`.tooltip-${index}`);
    if (tooltip) {
      anime({
        targets: tooltip,
        opacity: [1, 0],
        translateY: [0, 10],
        easing: "easeInQuad",
        duration: 300,
        complete: () => {
          setHoveredIndex(null);
          tooltip.classList.add("hidden");
        },
      });
    }
  };

  const items = [
    { label: "Захиалгын дугаар", value: ticketData._id },
    { label: "Төрөл", value: ticketData.ticketType },
    { label: "Компани", value: ticketData.company },
    { label: "Гарчиг", value: ticketData.title },
    { label: "Тайлбар", value: ticketData.description },
    { label: "Үүсгэсэн хэрэглэгч", value: ticketData.username },
    { label: "Хэрэглэгчийн ID", value: "null" },
    { label: "Албан тушаал", value: ticketData.position },
    { label: "Компьютерийн дугаар", value: ticketData.domain },
    { label: "Утасны дугаар", value: ticketData.phoneNumber },
    { label: "Статус", value: ticketData.status },
    { label: "Үүсэгсэн огноо", value: ticketData.createdDate },
  ];

  return (
    <div className="w-full max-w-lg pb-4">
      <h2 className="text-2xl font-bold text-center text-gray-700 dark:text-gray-300 mb-6">
        Дэлгэрэнгүй мэдээлэл
      </h2>
      <ul className="space-y-4">
        {items.map((item, index) => (
          <li
            key={index}
            className="flex justify-between relative"
            onMouseEnter={() => handleMouseEnter(index, item.value)}
            onMouseLeave={() => handleMouseLeave(index)}
          >
            <span className="font-medium text-gray-900 dark:text-gray-300">
              {item.label}
            </span>
            <span className="text-gray-700 dark:text-gray-400 text-right text-wrap truncate block w-1/2 cursor-pointer overflow-hidden">
              {item.value}
            </span>
            {hoveredIndex === index && (
              <div
                className={`absolute left-1/2 -translate-x-1/2 top-full mt-2 bg-gray-800 text-white text-sm font-semibold p-3 rounded-lg shadow-xl tooltip-${index} opacity-0 hidden transition-opacity duration-300 w-max max-w-xs border border-gray-500 z-50 overflow-hidden break-words whitespace-normal`}
              >
                {item.value}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
