"use client";

import React, { useState, useEffect } from "react";
import anime from "animejs";

interface UserActionsModalProps {
  user: any;
  onClose: () => void;
  onSaveSuccess: () => void;
}

const UserActionsModal: React.FC<UserActionsModalProps> = ({
  user,
  onClose,
  onSaveSuccess,
}) => {
  const [formData, setFormData] = useState(user);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      setFormData(user);
      anime({
        targets: ".modal-overlay",
        opacity: [0, 1],
        duration: 500,
        easing: "easeOutQuad",
      });
      anime({
        targets: ".modal-content",
        opacity: [0, 1],
        scale: [0.9, 1],
        duration: 500,
        easing: "easeOutQuad",
      });
    }
  }, [user]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    setError(null); // Reset error before starting
    try {
      const response = await fetch(`/api/users`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        onSaveSuccess();
        onClose();
      } else {
        const errorData = await response.json();
        throw new Error(
          errorData.message ||
            "Хэрэглэгчийн мэдээллийг хадгалахад алдаа гарлаа."
        );
      }
    } catch (err: any) {
      console.error(err);
      setError(
        err.message || "Хэрэглэгчийн мэдээллийг хадгалахад алдаа гарлаа."
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteUser = async () => {
    if (!formData._id) return console.error("Хэрэглэгчийн ID олдсонгүй.");

    try {
      const response = await fetch(`/api/users?id=${formData._id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        console.log("Хэрэглэгч амжилттай устгагдлаа.");
        onSaveSuccess();
        onClose();
      } else {
        const errorData = await response.json();
        console.error("Устгах үед алдаа гарлаа: ", errorData.message);
        setError(errorData.message || "Хэрэглэгч устгах үед алдаа гарлаа.");
      }
    } catch (err: any) {
      console.error("Хэрэглэгч устгах үед алдаа: ", err);
      setError(err.message || "Хэрэглэгч устгах үед алдаа гарлаа.");
    }
  };

  const handleClose = () => {
    anime({
      targets: ".modal-overlay",
      opacity: [1, 0],
      duration: 500,
      easing: "easeInQuad",
    });
    anime({
      targets: ".modal-content",
      opacity: [1, 0],
      scale: [1, 0.9],
      duration: 500,
      easing: "easeInQuad",
      complete: () => onClose(),
    });
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      onClick={handleClose}
    >
      <div className="modal-overlay fixed inset-0 bg-black/50"></div>
      <div
        className="modal-content bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-lg relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 text-gray-600 dark:text-gray-300 hover:text-gray-800"
        >
          ✕
        </button>
        <h2 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">
          Хэрэглэгч засах
        </h2>
        <form className="space-y-4">
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Нэр"
            className="w-full border p-2 rounded bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
            required
          />
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Овог"
            className="w-full border p-2 rounded bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Имэйл"
            className="w-full border p-2 rounded bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
            required
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Нууц үг"
            className="w-full border p-2 rounded bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
            required
          />
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full border p-2 rounded bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
            <option value="SuperAdmin">SuperAdmin</option>
          </select>
          <select
            name="workingPart"
            value={formData.workingPart}
            onChange={handleChange}
            className="w-full border p-2 rounded bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
          >
            <option value="Мэдээлэл технологийн алба">
              Мэдээлэл технологийн алба
            </option>
            <option value="Инженер техникийн алба">
              Инженер техникийн алба
            </option>
            <option value="Үйл ажиллагааны алба">Үйл ажиллагааны алба</option>
          </select>
          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="w-full border p-2 rounded bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
          >
            <option value="Грийн Интернэшнл ХХК">Грийн Интернэшнл ХХК</option>
            <option value="Грийн Трейд ХХК">Грийн Трейд ХХК</option>
            <option value="Грийн Импекс ХХК">Грийн Импекс ХХК</option>
            <option value="Грийн Индастри ХХК">Грийн Индастри ХХК</option>
            <option value="Грийн Фактори ХХК">Грийн Фактори ХХК</option>
          </select>
          <select
            name="employment"
            value={formData.employment}
            onChange={handleChange}
            className="w-full border p-2 rounded bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
          >
            <option value="Мэдээлэл технологийн инженер">
              Мэдээлэл технологийн инженер
            </option>
            <option value="Холбоо дохиоллын инженер">
              Холбоо дохиоллын инженер
            </option>
            <option value="Сүлжээний инженер">Сүлжээний инженер</option>
            <option value="Электроникийн инженер">Электроникийн инженер</option>
            <option value="Систем администратор">Систем администратор</option>
          </select>
          {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
          <button
            type="button"
            onClick={handleSave}
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            disabled={isSaving}
          >
            {isSaving ? "Хадгалж байна..." : "Хадгалах"}
          </button>
          <button
            type="button"
            onClick={handleDeleteUser}
            className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 mt-2"
            disabled={isSaving}
          >
            Устгах
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserActionsModal;
