"use client";
import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import anime from "animejs/lib/anime.es.js";
import moment from "@/library/moment/moment";

interface FormData {
  ticketType: string;
  username: string;
  company: string;
  position: string;
  title: string;
  domain: string;
  description: string;
  phoneNumber: string;
  status: string;
  modifierUserName: string;
  modifierUserId: string;
  updatedDate: string;
  createdDate: string;
}

export default function MtaTicket() {
  const date = moment();
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState<FormData>({
    ticketType: "Компьютер",
    username: "",
    company: "Грийн Групп",
    position: "",
    title: "",
    domain: "",
    description: "",
    phoneNumber: "",
    status: "Шинэ",
    modifierUserName: "",
    modifierUserId: "",
    updatedDate: "",
    createdDate: date,
  });

  const formRef = useRef<HTMLDivElement>(null); // Ref for the form container

  const ticketType = [
    "Компьютер",
    "Принтер",
    "Имэйл",
    "Сүлжээ",
    "Камер",
    "Дотоод утас",
    "Цаг бүртгэл",
    "WiFi утасгүй сүлжээ",
    "Бусад",
  ];

  const company = [
    "Грийн Групп",
    "Грийн ХХК",
    "Грийн Интернэшнл",
    "Грийн Фактори",
    "Грийн Трейд",
    "Грийн Импекс",
    "Грийн Индастри",
    "Грийн Дистрбьюшн",
    "Грийн Форжект",
    "Грийн Финтек",
    "Актив Гарден",
  ];

  // Submit animation
  const handleSubmitAnimation = () => {
    if (formRef.current) {
      anime({
        targets: formRef.current,
        scale: [1, 1.05, 1],
        easing: "easeInOutQuad",
        duration: 500,
      });
    }
  };

  const handleBackAnimation = () => {
    if (formRef.current) {
      router.back();
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmitAnimation();
    console.log("form data: ", formData);
    try {
      setPending(true);
      const res = await fetch("/api/create-ticket/mta", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setPending(false);
        setFormData({
          ticketType: "Компьютер",
          username: "",
          company: "Грийн Групп",
          position: "",
          title: "",
          domain: "",
          description: "",
          phoneNumber: "",
          status: "Шинэ",
          modifierUserName: "",
          modifierUserId: "",
          updatedDate: "",
          createdDate: date,
        });
        setMessage("Ажлын захиалга амжилттай бүртгэгдлээ.");
        // alert("Ажлын захиалга амжилттай бүртгэгдлээ.");
        router.push("/");
      } else {
        setMessage("Алдаа гарлаа.");
        setPending(false);
      }
    } catch (error) {
      setMessage("Алдаа гарлаа.");
      setPending(false);
      console.log(error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleChangeSelector = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 via-white to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-4">
      <div
        ref={formRef}
        className="w-[500px] backdrop-blur-lg bg-white/40 dark:bg-gray-800/40 shadow-2xl p-10 rounded-3xl border border-gray-300 dark:border-gray-700"
      >
        <form
          className="space-y-4 md:space-y-3 relative"
          onSubmit={handleSubmit}
        >
          <h2 className="font-bold text-xl text-center text-gray-700 dark:text-gray-300">
            МТА АЖЛЫН ДУУДЛАГА
          </h2>
          <div className="grid grid-cols-2 gap-x-4">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-gray-300">
                Дуудлагын төрөл
              </label>
              <select
                value={formData.ticketType}
                onChange={handleChangeSelector}
                name="ticketType"
                className="bg-gray-50 border border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 sm:text-sm rounded-lg block w-full p-2.5 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              >
                {ticketType.map((type, index) => (
                  <option key={index} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-gray-300">
                Овог, нэр
              </label>
              <input
                value={formData.username}
                onChange={handleChange}
                type="text"
                name="username"
                className="bg-gray-50 border border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 sm:text-sm rounded-lg block w-full p-2.5 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Овог, нэр оруулах"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-4">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-gray-300">
                Ажилладаг компани
              </label>
              <select
                value={formData.company}
                onChange={handleChangeSelector}
                name="company"
                className="bg-gray-50 border border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 sm:text-sm rounded-lg block w-full p-2.5 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              >
                {company.map((comp, index) => (
                  <option key={index} value={comp}>
                    {comp}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-gray-300">
                Албан тушаал
              </label>
              <input
                value={formData.position}
                onChange={handleChange}
                type="text"
                name="position"
                className="bg-gray-50 border border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 sm:text-sm rounded-lg block w-full p-2.5 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Албан тушаал оруулах"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-4">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-gray-300">
                Гарчиг
              </label>
              <input
                value={formData.title}
                onChange={handleChange}
                type="text"
                name="title"
                className="bg-gray-50 border border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 sm:text-sm rounded-lg block w-full p-2.5 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Гарчиг оруулах"
                required
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-gray-300">
                Компьютерын дугаар
              </label>
              <input
                value={formData.domain}
                onChange={handleChange}
                type="text"
                name="domain"
                className="bg-gray-50 border border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 sm:text-sm rounded-lg block w-full p-2.5 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="INT01 гэх мэт"
                required
              />
            </div>
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-gray-300">
              Нэмэлт тайлбар
            </label>
            <textarea
              value={formData.description}
              name="description"
              onChange={handleChangeTextArea}
              className="bg-gray-50 border border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 sm:text-sm rounded-lg block w-full p-2.5 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder=""
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-gray-300">
              Утасны дугаар
            </label>
            <input
              value={formData.phoneNumber}
              onChange={handleChange}
              type="number"
              name="phoneNumber"
              className="bg-gray-50 border border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 sm:text-sm rounded-lg block w-full p-2.5 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Утасны дугаар оруулах"
              required
            />
          </div>

          <div className="w-full flex justify-center">
            {message && (
              <p
                className={`${
                  message === "Алдаа гарлаа." ? "bg-red-400" : "bg-green-400"
                } py-1 px-4 rounded-lg shadow-lg text-sm text-gray-50 text-center`}
              >
                {message}
              </p>
            )}
          </div>

          <div className="w-full flex justify-between">
            <button
              type="button"
              onClick={handleBackAnimation}
              className="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-transform transform hover:scale-105"
            >
              Буцах
            </button>
            <button
              type="submit"
              className="text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-transform transform hover:scale-105"
            >
              ИЛГЭЭХ
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
