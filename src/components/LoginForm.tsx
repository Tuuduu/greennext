"use client";

import React from "react";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Logo from "./Logo/Logo";

interface FormData {
  email: string;
  password: string;
}

export default function LoginForm() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

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
      router.replace("/home/dashboard");
    } catch (error) {
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

  return (
    <div className="max-w-md mx-auto p-6 w-auto sm:w-1/3 bg-white shadow-lg rounded-lg">
      <div className="w-full flex items-center justify-center pb-5">
        <Logo />
      </div>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Имэйл хаяг
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
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="remember"
              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-green-500"
            />
            <label
              htmlFor="remember"
              className="ml-2 text-sm font-medium text-gray-700"
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
          <p className="text-sm text-red-500 bg-red-100 py-2 px-4 rounded-lg">
            {message}
          </p>
        )}
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 focus:ring-4 focus:ring-green-300"
        >
          Нэвтрэх
        </button>
        <p className="text-sm text-center text-gray-500 mt-4">
          Та бүртгэлгүй юу?{" "}
          <Link href="/register" className="text-green-600 hover:underline">
            Бүртгүүлэх
          </Link>
        </p>
      </form>
    </div>
  );
}
