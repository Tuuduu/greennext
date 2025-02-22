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
  ticketTitle: string;
  description: string;
  phoneNumber: string;
  status: string;
  modifier: string;
  createdDate: string;
}

export default function ItaTicket() {
  const date = moment();
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState<FormData>({
    ticketType: "Цахилгаан",
    username: "",
    company: "Грийн Групп",
    position: "",
    ticketTitle: "",
    description: "",
    phoneNumber: "",
    status: "шинэ",
    modifier: "",
    createdDate: date,
  });

  const formRef = useRef<HTMLDivElement>(null); // Ref for the form container

  const ticketTypes = ["Цахилгаан", "Бусад"];

  const companies = [
    "Грийн Групп",
    "Грийн ХХК",
    "Грийн Интернэшнл",
    "Грийн Фактори",
    "Грийн Трейд",
    "Грийн Импекс",
    "Грийн Индастри",
    "Грийн Дистрбьюшн",
    "Грийн Прожект",
    "Грийн Финтек",
    "Актив Гарден",
  ];

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
    try {
      const res = await fetch("/api/create-ticket/ita", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setFormData({
          ticketType: "Цахилгаан",
          username: "",
          company: "Грийн Групп",
          position: "",
          ticketTitle: "",
          description: "",
          phoneNumber: "",
          status: "шинэ",
          modifier: "",
          createdDate: date,
        });
        setMessage("Ажлын захиалга амжилттай бүртгэгдлээ.");
        // alert("Ажлын захиалга амжилттай бүртгэгдлээ.");
        router.push("/");
      } else {
        setMessage("Алдаа гарлаа.");
      }
    } catch (error) {
      setMessage("Алдаа гарлаа.");
      console.error(error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
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
        className="w-full max-w-lg bg-white/50 dark:bg-gray-800/40 shadow-2xl p-10 rounded-3xl border border-gray-300 dark:border-gray-700 backdrop-blur-lg"
      >
        <form
          className="space-y-4 md:space-y-3 relative"
          onSubmit={handleSubmit}
        >
          <h2 className="font-bold text-xl text-center text-gray-700 dark:text-gray-300">
            ИТА АЖЛЫН ДУУДЛАГА
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-gray-300">
                Дуудлагын төрөл
              </label>
              <select
                value={formData.ticketType}
                onChange={handleChange}
                name="ticketType"
                className="bg-gray-50 border border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 sm:text-sm rounded-lg block w-full p-2.5 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              >
                {ticketTypes.map((type, index) => (
                  <option key={index} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-gray-300">
                Ажилладаг компани
              </label>
              <select
                value={formData.company}
                onChange={handleChange}
                name="company"
                className="bg-gray-50 border border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 sm:text-sm rounded-lg block w-full p-2.5 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              >
                {companies.map((company, index) => (
                  <option key={index} value={company}>
                    {company}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              {
                label: "Овог, нэр",
                name: "username",
                placeholder: "Овог, нэр оруулах",
              },
              {
                label: "Албан тушаал",
                name: "position",
                placeholder: "Албан тушаал оруулах",
              },
              {
                label: "Гарчиг",
                name: "ticketTitle",
                placeholder: "Гарчиг оруулах",
              },
              {
                label: "Утасны дугаар",
                name: "phoneNumber",
                placeholder: "Утасны дугаар оруулах",
                type: "number",
              },
            ].map((field, index) => (
              <div key={index}>
                <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-gray-300">
                  {field.label}
                </label>
                <input
                  value={(formData as any)[field.name]}
                  onChange={handleChange}
                  type={field.type || "text"}
                  name={field.name}
                  placeholder={field.placeholder}
                  className="bg-gray-50 border border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 sm:text-sm rounded-lg block w-full p-2.5 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
            ))}
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-gray-300">
              Нэмэлт тайлбар
            </label>
            <textarea
              value={formData.description}
              onChange={handleChange}
              name="description"
              placeholder="Нэмэлт тайлбар оруулах"
              className="bg-gray-50 border border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 sm:text-sm rounded-lg block w-full p-2.5 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>

          {message && (
            <p
              className={`py-2 px-4 rounded-lg text-center text-sm ${
                message === "Алдаа гарлаа."
                  ? "bg-red-400 text-white"
                  : "bg-green-400 text-white"
              }`}
            >
              {message}
            </p>
          )}

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
