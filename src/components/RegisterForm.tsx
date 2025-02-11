"use client";

import React, { useState } from "react";
import anime from "animejs";
import UserModal from "@/components/UserModal";

const UsersPage = ({
  buttonName,
  onRegisterSuccess,
}: {
  buttonName: string;
  onRegisterSuccess: any;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const showSuccessNotification = (message: string) => {
    setSuccessMessage(message);
    const notification = document.getElementById("success-notification");

    anime({
      targets: notification,
      translateX: [200, 0],
      opacity: [0, 1],
      easing: "easeOutExpo",
      duration: 800,
    });

    setTimeout(() => {
      anime({
        targets: notification,
        translateX: [0, 200],
        opacity: [1, 0],
        easing: "easeInExpo",
        duration: 800,
        complete: () => setSuccessMessage(null),
      });
    }, 3000); // 3 секундын дараа алга болно
  };

  const handleAddUser = async (data: any) => {
    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        showSuccessNotification("Хэрэглэгч амжилттай нэмэгдлээ!");
        setIsModalOpen(false);
        onRegisterSuccess();
        setError(null);
      } else {
        const errorData = await res.json();
        setError(errorData.message || "Тодорхойгүй алдаа гарлаа.");
      }
    } catch (error: any) {
      setError(error.message || "Серверийн алдаа гарлаа.");
    }
  };

  return (
    <div className="p-6 relative">
      <button
        onClick={() => {
          setIsModalOpen(true);
          setError(null);
        }}
        className="bg-blue-500 text-white text-[12px] 2xl:text-base px-4 py-2 rounded hover:bg-blue-600"
      >
        {buttonName}
      </button>

      {/* Амжилтын мэдэгдэл */}
      {successMessage && (
        <div
          id="success-notification"
          className="fixed bottom-4 right-4 w-72 h-auto bg-green-500 text-white px-4 py-3 rounded-lg shadow-lg opacity-0 flex items-center gap-2"
          style={{ zIndex: 1000 }}
        >
          <span>✅</span>
          <span>{successMessage}</span>
        </div>
      )}

      {/* Алдааны мессеж */}
      {error && (
        <div className="mt-4 p-4 text-red-700 bg-red-100 border border-red-300 rounded">
          {error}
        </div>
      )}

      <UserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddUser}
      />
    </div>
  );
};

export default UsersPage;
