"use client";

import React, { useState, useEffect } from "react";
import anime from "animejs";

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
    employment: "Мэдээлэл технологийн инженер",
    workingPart: "Мэдээлэл технологийн алба",
    department: "Грийн Интернэшнл ХХК",
    permissions: [],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    onSubmit(formData);
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      role: "user",
      employment: "Мэдээлэл технологийн инженер",
      workingPart: "Мэдээлэл технологийн алба",
      department: "Грийн Интернэшнл ХХК",
      permissions: [],
    });
    setIsSubmitting(false);
  };

  useEffect(() => {
    if (isOpen) {
      anime({
        targets: ".modal-overlay",
        opacity: [0, 1],
        duration: 500,
        easing: "easeOutQuad",
      });
      anime({
        targets: ".modal-content",
        opacity: [0, 1],
        scale: [0.8, 1],
        duration: 500,
        easing: "easeOutQuad",
      });
    }
  }, [isOpen]);

  const closeModal = () => {
    anime({
      targets: ".modal-overlay",
      opacity: [1, 0],
      duration: 500,
      easing: "easeInQuad",
    });
    anime({
      targets: ".modal-content",
      opacity: [1, 0],
      scale: [1, 0.8],
      duration: 500,
      easing: "easeInQuad",
      complete: () => onClose(),
    });
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          onClick={closeModal} // Close modal when clicking outside
        >
          <div className="modal-overlay fixed inset-0 bg-black/50"></div>
          <div
            className="modal-content bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative"
            onClick={(e) => e.stopPropagation()} // Prevent modal from closing on content click
          >
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
            >
              ✕
            </button>
            <h2 className="text-lg font-semibold mb-4">Хэрэглэгч нэмэх</h2>
            <form className="space-y-4" onSubmit={handleFormSubmit}>
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
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Нэр"
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
                <option value="SuperAdmin">SuperAdmin</option>
              </select>
              <select
                name="workingPart"
                value={formData.workingPart}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              >
                <option value="Мэдээлэл технологийн алба">
                  Мэдээлэл технологийн алба
                </option>
                <option value="Инженер техникийн алба">
                  Инженер техникийн алба
                </option>
                <option value="Үйл ажиллагааны алба">
                  Үйл ажиллагааны алба
                </option>
              </select>
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              >
                <option value="Грийн Интернэшнл ХХК">
                  Грийн Интернэшнл ХХК
                </option>
                <option value="Грийн Трейд ХХК">Грийн Трейд ХХК</option>
                <option value="Грийн Импекс ХХК">Грийн Импекс ХХК</option>
                <option value="Грийн Индастри ХХК">Грийн Индастри ХХК</option>
                <option value="Грийн Фактори ХХК">Грийн Фактори ХХК</option>
              </select>
              <select
                name="employment"
                value={formData.employment}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              >
                <option value="Мэдээлэл технологийн инженер">
                  Мэдээлэл технологийн инженер
                </option>
                <option value="Холбоо дохиоллын инженер">
                  Холбоо дохиоллын инженер
                </option>
                <option value="Сүлжээний инженер">Сүлжээний инженер</option>
                <option value="Электроникийн инженер">
                  Электроникийн инженер
                </option>
                <option value="Систем администратор">
                  Систем администратор
                </option>
              </select>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 flex items-center justify-center gap-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Илгээж байна..." : "Хэрэглэгч нэмэх"}{" "}
                <span>🚀</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default UserModal;
