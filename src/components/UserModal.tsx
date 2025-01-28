"use client";

import React, { useState } from "react";
import anime from "animejs";
import companyList from "@/data/data";

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

const UserModal: React.FC<UserModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "user", // Default role
    workingPart: "",
    department: "",
    permissions: [],
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  // Модал гарч ирэхэд анимаци хийх
  if (isOpen) {
    anime({
      targets: ".modal-content",
      opacity: [0, 1],
      scale: [0.9, 1],
      duration: 500,
      easing: "easeOutQuad",
    });
  }

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="modal-content bg-white p-6 rounded-lg shadow-lg w-full max-w-lg relative">
            <button
              onClick={() => {
                anime({
                  targets: ".modal-content",
                  opacity: [1, 0],
                  scale: [1, 0.9],
                  duration: 500,
                  easing: "easeInQuad",
                  complete: () => onClose(),
                });
              }}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
            >
              ✕
            </button>
            <h2 className="text-lg font-semibold mb-4">Хэрэглэгч нэмэх</h2>
            <form className="space-y-4" onSubmit={handleFormSubmit}>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Нэр"
                className="w-full border p-2 rounded"
                required
              />
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Овог"
                className="w-full border p-2 rounded"
                required
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Имэйл"
                className="w-full border p-2 rounded"
                required
              />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Нууц үг"
                className="w-full border p-2 rounded"
                required
              />
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
                <option value="manager">Manager</option>
              </select>
              <input
                type="text"
                name="workingPart"
                value={formData.workingPart}
                onChange={handleChange}
                placeholder="Ажиллах хэсэг"
                className="w-full border p-2 rounded"
                required
              />
              <select
                name="department"
                value={formData.role}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
                <option value="manager">Manager</option>
              </select>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
                placeholder="Хэлтэс"
                className="w-full border p-2 rounded"
                required
              />
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
              >
                Хэрэглэгч нэмэх
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default UserModal;
