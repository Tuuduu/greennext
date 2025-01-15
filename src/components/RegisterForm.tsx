"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import companyData from "@/data/data";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  confirmPassword: string;
  department: string;
  workingPart: string;
  birthday: string;
  sex: string;
}

export default function Login() {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "",
    confirmPassword: "",
    department: "Грийн интернэшнл ХХК",
    workingPart: "Мэдээлэл технологийн алба",
    birthday: "",
    sex: "",
  });

  const workingPartList = [
    "Мэдээлэл технологийн алба",
    "Инженер техникийн алба",
    "Үйл ажиллагааны алба",
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("form data: ", formData);
    if (formData.password != formData.confirmPassword) {
      setMessage("Нууц үг таарахгүй байна.");
    } else {
      try {
        const resUserExists = await fetch("api/userExists", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData.email),
        });
        const { user } = await resUserExists.json();
        if (user) {
          setPending(false);
          setMessage("Бүртгэлтэй хэрэглэгч байна");
        } else {
        }
      } catch (error) {}
      try {
        setPending(true);
        const res = await fetch("/api/register", {
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
          setMessage("Амжилттай бүртгэгдлээ.");
          alert("Амжилттай бүртгэгдлээ");
          router.push("/login");
        } else {
          setMessage("Бүртгэлтэй хэрэглэгч байна.");
          setPending(false);
        }
      } catch (error) {
        setPending(false);
        console.log(error);
      }
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold text-center text-green-600 mb-6">
        GREEN OFFICE
      </h1>
      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Ерөнхий мэдээлэл */}
        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Ерөнхий мэдээлэл
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Хэрэглэгчийн нэр
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Нэр"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Хэрэглэгчийн овог
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Овог"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">
              Имэйл
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="name@company.com"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Төрсөн өдөр
              </label>
              <input
                type="date"
                name="birthday"
                value={formData.birthday}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Хүйс
              </label>
              <select
                name="sex"
                value={formData.sex}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                required
              >
                <option value="">Сонгох</option>
                <option value="male">Эрэгтэй</option>
                <option value="female">Эмэгтэй</option>
              </select>
            </div>
          </div>
        </div>

        {/* Алба болон Компани */}
        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Ажлын мэдээлэл
          </h2>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">
              Компани
            </label>
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
              required
            >
              {companyData.map((part, index) => (
                <option key={index} value={part}>
                  {part}
                </option>
              ))}
            </select>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">
              Алба
            </label>
            <select
              name="workingPart"
              value={formData.workingPart}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
              required
            >
              {workingPartList.map((part, index) => (
                <option key={index} value={part}>
                  {part}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Нууцлалын мэдээлэл */}
        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Нууцлалын мэдээлэл
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Нууц үг
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Нууц үгээ баталгаажуулах
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>
          </div>
        </div>

        {/* Зурвас */}
        {message && (
          <p className="text-red-600 text-sm text-center">{message}</p>
        )}

        {/* Бүртгүүлэх товч */}
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 focus:ring-4 focus:ring-green-300"
        >
          Бүртгүүлэх
        </button>

        {/* Нэвтрэх линк */}
        <p className="text-sm text-center text-gray-500 mt-4">
          Та бүртгэлтэй юу?{" "}
          <Link href="/login" className="text-green-600 hover:underline">
            Нэвтрэх
          </Link>
        </p>
      </form>
    </div>
  );
}
