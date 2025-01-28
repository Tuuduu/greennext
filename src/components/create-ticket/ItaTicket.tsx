"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
        alert("Ажлын захиалга амжилттай бүртгэгдлээ.");
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
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 via-white to-blue-100 px-4">
      <div className="w-full max-w-lg bg-white/50 backdrop-blur-lg shadow-lg p-8 rounded-3xl border border-gray-300">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold text-center text-gray-700">
            ИТА АЖЛЫН ДУУДЛАГА
          </h2>

          <div>
            <label className="block text-sm font-medium text-gray-900">
              Дуудлагын төрөл
            </label>
            <select
              value={formData.ticketType}
              onChange={handleChange}
              name="ticketType"
              className="mt-1 w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              {ticketTypes.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

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
              <label className="block text-sm font-medium text-gray-900">
                {field.label}
              </label>
              <input
                value={(formData as any)[field.name]}
                onChange={handleChange}
                type={field.type || "text"}
                name={field.name}
                placeholder={field.placeholder}
                className="mt-1 w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          ))}

          <div>
            <label className="block text-sm font-medium text-gray-900">
              Ажилладаг компани
            </label>
            <select
              value={formData.company}
              onChange={handleChange}
              name="company"
              className="mt-1 w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              {companies.map((company, index) => (
                <option key={index} value={company}>
                  {company}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900">
              Нэмэлт тайлбар
            </label>
            <textarea
              value={formData.description}
              onChange={handleChange}
              name="description"
              placeholder="Нэмэлт тайлбар оруулах"
              className="mt-1 w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:ring-blue-500 focus:border-blue-500"
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

          <button
            type="submit"
            className="w-full rounded-lg bg-green-500 py-2.5 px-4 text-sm font-medium text-white transition-transform hover:scale-105 hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-green-300"
          >
            ИЛГЭЭХ
          </button>
        </form>
      </div>
    </div>
  );
}
