"use client";
import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import moment from "@/library/moment/moment";

interface FormData {
  feedbackType: string;
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
        alert("Санал хүсэлт амжилттай бүртгэгдлээ.");
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
    <div className="w-[500px] shadow-lg p-10 rounded-lg border-t-4 border-green-400">
      <form className="space-y-4 md:space-y-3" onSubmit={handleSubmit}>
        <label className="font-bold text-lg text-center uppercase">
          Санал хүсэлт
        </label>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-900">
            Төрөл
          </label>
          <select
            value={formData.feedbackType}
            onChange={handleChangeSelector}
            name="feedbackType"
            id="feedbackType"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg  block w-full p-2.5 dark:placeholder-gray-400  focus:ring-blue-500 dark:focus:border-blue-500"
            required
          >
            <option value={feedbackType[0]}>{feedbackType[0]}</option>
            <option value={feedbackType[1]}>{feedbackType[1]}</option>
            <option value={feedbackType[2]}>{feedbackType[2]}</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-900">
            Гарчиг
          </label>
          <input
            value={formData.title}
            onChange={handleChange}
            type="text"
            name="title"
            id="title"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg  block w-full p-2.5 dark:placeholder-gray-400  focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder=""
            required
          />
        </div>

        <div className="">
          <label className="block mb-1 text-sm font-medium text-gray-900">
            Тайлбар
          </label>
          <textarea
            value={formData.description}
            name="description"
            id="description"
            onChange={handleChangeTextArea}
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg  block w-full h-48 p-2.5 dark:placeholder-gray-400  focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder=""
            required
          />
        </div>

        <div className="w-full flex justify-center">
          {message ? (
            <p
              className={`${
                message == "Алдаа гарлаа." ? "bg-red-400" : "bg-green-400"
              } py-1 px-4 rounded-lg shadow-lg text-sm text-gray-50 text-center`}
            >
              {message}
            </p>
          ) : (
            ""
          )}
        </div>
        <button
          type="submit"
          className="w-full text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  focus-green-800"
        >
          ИЛГЭЭХ
        </button>
      </form>
    </div>
  );
}
