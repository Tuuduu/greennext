"use client";
import moment from "moment";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

interface TicketData {
  _id: string;
  status: string;
  [key: string]: any; // Нэмэлт талбарууд
}

interface FormData {
  status: string;
}

export default function TicketChangeStatus({
  ticketData,
  onStatusUpdate,
}: {
  ticketData: TicketData;
  onStatusUpdate: (updatedTicket: TicketData) => void;
}) {
  const { data: session } = useSession();
  const dataId = ticketData._id;
  const date = moment().toISOString();
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState<FormData>({
    status: ticketData.status || "шинэ",
  });
  const [userData, setUserData] = useState({
    name: "",
    userId: "",
  });

  const statusOptions = ["шинэ", "хаасан", "хүлээгдэж буй", "хоошлуулсан"];

  // Session өгөгдлийг авах
  useEffect(() => {
    if (session?.user) {
      setUserData({
        name: session.user.name || "",
        userId: session.user.userId || "",
      });
    }
  }, [session]);

  // Төлөв сонгох өөрчлөлт
  const handleChangeSelector = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Форм илгээх
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPending(true);
    setMessage(""); // Өмнөх мессежүүдийг цэвэрлэх

    try {
      const res = await fetch("/api/ticket-order/ticket-config/", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: dataId,
          updates: {
            status: formData.status,
            updatedDate: date,
            modifierUserName: userData.name,
            modifierUserId: userData.userId,
          },
        }),
      });

      if (res.ok) {
        const updatedTicket = {
          ...ticketData,
          status: formData.status,
        };
        onStatusUpdate(updatedTicket); // Шинэчлэх функц дуудна
        setMessage("Ажлын захиалга амжилттай бүртгэгдлээ.");
      } else {
        setMessage("Алдаа гарлаа. Та дахин оролдоно уу.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setMessage("Сүлжээний алдаа гарлаа.");
    } finally {
      setPending(false);
    }
  };

  return (
    <div>
      {/* Алдааны мессеж */}
      {message && (
        <p
          className={`text-sm ${
            message.includes("амжилттай") ? "text-green-600" : "text-red-500"
          }`}
        >
          {message}
        </p>
      )}

      {/* Форм */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <select
          value={formData.status}
          onChange={handleChangeSelector}
          name="status"
          id="status"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          {statusOptions.map((s, index) => (
            <option key={index} value={s}>
              {s}
            </option>
          ))}
        </select>
        <button
          type="submit"
          disabled={pending}
          className={`px-4 py-2 rounded-md text-white text-sm transition-all ${
            pending
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {pending ? "Хадгалж байна..." : "Хадгалах"}
        </button>
      </form>
    </div>
  );
}
