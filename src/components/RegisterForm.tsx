"use client";

import React, { useState } from "react";
import UserModal from "@/components/UserModal";

const UsersPage = ({ buttonName }: { buttonName: any }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddUser = async (data: any) => {
    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        alert("Хэрэглэгч амжилттай нэмэгдлээ!");
        setIsModalOpen(false);
      } else {
        const errorData = await res.json();
        alert(`Алдаа гарлаа: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error adding user:", error);
      alert("Серверийн алдаа гарлаа.");
    }
  };

  return (
    <div className="p-6">
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        {buttonName}
      </button>

      <UserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddUser}
      />
    </div>
  );
};

export default UsersPage;
