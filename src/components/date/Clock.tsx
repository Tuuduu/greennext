"use client";
import { useState, useEffect } from "react";

const months = [
  "Нэгдүгээр сар",
  "Хоёрдугаар сар",
  "Гуравдугаар сар",
  "Дөрөвдүгээр сар",
  "Тавдугаар сар",
  "Зургаадугаар сар",
  "Долоодугаар сар",
  "Наймдугаар сар",
  "Есдүгээр сар",
  "Аравдугаар сар",
  "Арваннэгдүгээр сар",
  "Арванхоёрдугаар сар",
];

const weekdays = [
  "Ням",
  "Даваа",
  "Мягмар",
  "Лхагва",
  "Пүрэв",
  "Баасан",
  "Бямба",
];

const Clock = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // 1 секунд тутам шинэчилнэ

    return () => clearInterval(timer); // Цэвэрлэх
  }, []);

  const year = currentTime.getFullYear();
  const month = months[currentTime.getMonth()];
  const date = currentTime.getDate();
  const weekday = weekdays[currentTime.getDay()];
  const time = currentTime.toLocaleTimeString("mn-MN", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="flex flex-row items-start ">
      <p className="text-[10px] font-light text-gray-900 dark:text-gray-100">
        {weekday}, {month} сарын {date}-ны өдөр
      </p>
      <p className="text-sm font-bold text-gray-900 dark:text-gray-100">
        {time}
      </p>
    </div>
  );
};

export default Clock;
