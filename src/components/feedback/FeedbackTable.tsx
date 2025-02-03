"use client";
import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import moment from "@/library/moment/moment";
import companyData from "@/data/data";

interface FormData {
  feedbackType: string;
  company: string;
  title: string;
  description: string;
  createdDate: string;
}

export default function FeedbackTable() {
  const date = moment();
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState<FormData>({
    feedbackType: "Бусад",
    company: "Грийн Интернэшнл ХХК",
    title: "",
    description: "",
    createdDate: date,
  });

  const feedbackType = ["компаний үйл ажиллагаа", "Програм хангамж", "Бусад"];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("form data: ", formData);
    try {
      setPending(true);
      const res = await fetch("/api/feedback/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setPending(false);
        const form = e.target as HTMLFormElement;
        form.reset();
        setMessage("Санал хүсэлт амжилттай бүртгэгдлээ.");
        router.push("/");
      } else {
        setMessage("Алдаа гарлаа.");
        setPending(false);
      }
    } catch (error) {
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
      [name]:
        value === "feedbacktType" && name === "feedbacktType"
          ? e.target.value
          : value,
    }));
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 via-white to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-4">
      <div className="w-full max-w-lg bg-white/50 dark:bg-gray-800 dark:text-white backdrop-blur-lg shadow-lg p-8 rounded-3xl border border-gray-300 dark:border-gray-700">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold text-center text-gray-700 dark:text-gray-300">
            Санал хүсэлт
          </h2>
          <div>
            <label className="block text-sm font-medium text-gray-900 dark:text-gray-300">
              Компани
            </label>
            <select
              value={formData.company}
              onChange={handleChangeSelector}
              name="company"
              className="mt-1 w-full rounded-lg border border-gray-300 bg-gray-50 text-gray-900 dark:border-gray-700 dark:bg-gray-700 dark:text-white p-2.5 text-sm focus:ring-blue-500 focus:border-blue-500"
              required
            >
              {companyData.map((company: any, index: number) => (
                <option key={index} value={company}>
                  {company}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-900 dark:text-gray-300">
              Төрөл
            </label>
            <select
              value={formData.feedbackType}
              onChange={handleChangeSelector}
              name="feedbackType"
              className="mt-1 w-full rounded-lg border border-gray-300 bg-gray-50 text-gray-900 dark:border-gray-700 dark:bg-gray-700 dark:text-white p-2.5 text-sm focus:ring-blue-500 focus:border-blue-500"
              required
            >
              {feedbackType.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-900 dark:text-gray-300">
              Гарчиг
            </label>
            <input
              value={formData.title}
              onChange={handleChange}
              type="text"
              name="title"
              placeholder="Гарчиг оруулах"
              className="mt-1 w-full rounded-lg border border-gray-300 bg-gray-50 text-gray-900 dark:border-gray-700 dark:bg-gray-700 dark:text-white p-2.5 text-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-900 dark:text-gray-300">
              Тайлбар
            </label>
            <textarea
              value={formData.description}
              onChange={handleChangeTextArea}
              name="description"
              placeholder="Тайлбар оруулах"
              className="mt-1 w-full rounded-lg border border-gray-300 bg-gray-50 text-gray-900 dark:border-gray-700 dark:bg-gray-700 dark:text-white p-2.5 text-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          {message && (
            <p
              className={` rounded-lg text-center text-sm ${
                message === "Алдаа гарлаа." ? "text-red-400" : "text-green-400"
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
