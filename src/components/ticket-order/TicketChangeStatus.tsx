"use client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import moment from "@/library/moment/moment";

interface TicketData {
  _id: string;
  status: string;
  [key: string]: any;
}

interface FormData {
  status: string;
}

interface UserSession {
  firstName?: string;
  id?: string; // ✅ userId-г TypeScript-д зөвшөөрсөн
  email?: string;
  [key: string]: any;
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
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState<FormData>({
    status: ticketData.status || "Шинэ",
  });
  const date = moment();
  const [userData, setUserData] = useState<UserSession>({
    firstName: "",
    id: "",
  });

  const statusOptions = ["Шинэ", "Хаасан", "Хүлээгдэж байна", "Хийгдэж байна"];

  // Session өгөгдлийг авах
  useEffect(() => {
    if (session?.user) {
      setUserData((prev) => ({
        ...prev,
        firstName: session.user.firstName || "",
        id: (session.user as UserSession).id || "",
      }));
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
    setMessage("");
    console.log("date dataa", date);
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
            modifierUserName: userData.firstName || "Тодорхойгүй хэрэглэгч",
            modifierUserId: userData.id,
          },
        }),
      });

      const resJson = await res.json();
      if (!res.ok) {
        setMessage(resJson.message || "Алдаа гарлаа. Та дахин оролдоно уу.");
        return;
      }

      const updatedTicket = {
        ...ticketData,
        status: formData.status,
      };
      onStatusUpdate(updatedTicket); // Шинэчлэх функц дуудна
      setMessage("Ажлын захиалга амжилттай бүртгэгдлээ.");
    } catch (error) {
      console.error("Error submitting form:", error);
      setMessage("Сүлжээний алдаа гарлаа.");
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="w-full ">
      {message && (
        <p
          className={`text-[12px] 2xl:text-sm ${
            message.includes("амжилттай") ? "text-green-600" : "text-red-500"
          }`}
        >
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-2 2xl:gap-4">
        <select
          value={formData.status}
          onChange={handleChangeSelector}
          name="status"
          id="status"
          className="bg-gray-50 border border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 text-sm rounded-lg p-1.5 2xl:p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          className={`w-full rounded-lg bg-green-500 py-2 2xl:py-2.5 px-4 text-[12px] 2xl:text-sm font-medium text-white transition-transform hover:scale-105 hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-green-300 ${
            pending ? "cursor-not-allowed bg-gray-400" : ""
          }`}
        >
          {pending ? (
            <>
              <span className="loader"></span>
              <span>Хадгалж байна...</span>
            </>
          ) : (
            "Хадгалах"
          )}
        </button>
      </form>

      {/* Spinner CSS */}
      <style jsx>{`
        .loader {
          width: 1rem;
          height: 1rem;
          border: 2px solid transparent;
          border-top: 2px solid white;
          border-radius: 50%;
          animation: spin 0.5s linear infinite;
        }
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
