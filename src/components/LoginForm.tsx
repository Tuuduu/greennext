"use client";

import React, { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Logo from "./Logo/Logo";

interface FormData {
  email: string;
  password: string;
  remember: boolean;
}

export default function LoginForm() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    remember: false, // Сануулах төлөв
  });
  const [message, setMessage] = useState("");

  // LocalStorage-оос мэдээлэл авах
  useEffect(() => {
    const savedEmail = localStorage.getItem("savedEmail");
    const savedPassword = localStorage.getItem("savedPassword");

    if (savedEmail && savedPassword) {
      setFormData((prev) => ({
        ...prev,
        email: savedEmail,
        password: savedPassword,
        remember: true,
      }));
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (res?.error) {
        setMessage("Имэйл эсвэл нууц үг буруу байна.");
        return;
      }

      // Хэрэв хэрэглэгч "Сануулах" сонголт хийсэн бол localStorage-д хадгалах
      if (formData.remember) {
        localStorage.setItem("savedEmail", formData.email);
        localStorage.setItem("savedPassword", formData.password);
      } else {
        // Хэрэв "Сануулах" сонголт хийгээгүй бол localStorage-ийг цэвэрлэх
        localStorage.removeItem("savedEmail");
        localStorage.removeItem("savedPassword");
      }

      router.replace("/home/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 via-white to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-4">
      <div className="w-full max-w-md bg-white/50 dark:bg-gray-800 dark:text-white backdrop-blur-lg shadow-lg p-8 rounded-3xl border border-gray-300 dark:border-gray-700">
        {/* Лого хэсэг */}
        <div className="w-full flex items-center justify-center pb-6">
          <Logo />
        </div>

        {/* Form хэсэг */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Имэйл хаяг
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="name@company.com"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 dark:border-gray-700 dark:bg-gray-700 dark:text-white focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Нууц үг
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 dark:border-gray-700 dark:bg-gray-700 dark:text-white focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                name="remember"
                checked={formData.remember}
                onChange={handleChange}
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 dark:border-gray-700 dark:bg-gray-700 dark:text-white focus:ring-green-500"
              />
              <label
                htmlFor="remember"
                className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Сануулах
              </label>
            </div>
            <a
              href="#"
              className="text-sm font-medium text-green-500 hover:underline"
            >
              Нууц үгээ мартсан
            </a>
          </div>
          {message && (
            <p className="text-sm text-red-500 bg-red-100 dark:bg-red-700 py-2 px-4 rounded-lg">
              {message}
            </p>
          )}
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 focus:ring-4 focus:ring-green-300 dark:focus:ring-green-700"
          >
            Нэвтрэх
          </button>

          <p className="text-sm text-center text-gray-500 dark:text-gray-300">
            Ажлын захиалга{" "}
            <Link href="/" className="text-green-600 hover:underline">
              үүсгэх.
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
