import React from "react";

export default function TicketModalInfro(value: any) {
  const ticketModalData = value.ticketData;

  return (
    <div className="w-full max-w-lg pb-4">
      <h2 className="text-2xl font-bold text-center text-gray-700 dark:text-gray-300 mb-6">
        Дэлгэрэнгүй мэдээлэл
      </h2>
      <ul className="space-y-4">
        {[
          { label: "Захиалгын дугаар", value: ticketModalData._id },
          { label: "Төрөл", value: ticketModalData.ticketType },
          { label: "Компани", value: ticketModalData.company },
          { label: "Гарчиг", value: ticketModalData.title },
          { label: "Тайлбар", value: ticketModalData.description },
          { label: "Үүсгэсэн хэрэглэгч", value: ticketModalData.username },
          { label: "Хэрэглэгчийн ID", value: "null" },
          { label: "Албан тушаал", value: ticketModalData.position },
          { label: "Компьютерийн дугаар", value: ticketModalData.domain },
          { label: "Утасны дугаар", value: ticketModalData.phoneNumber },
          { label: "Статус", value: ticketModalData.status },
          { label: "Үүсэгсэн огноо", value: ticketModalData.createdDate },
        ].map((item, index) => (
          <li key={index} className="flex justify-between">
            <span className="font-medium text-gray-900 dark:text-gray-300">
              {item.label}
            </span>
            <span className="text-gray-700 dark:text-gray-400">
              {item.value}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

const TicketInfo = [
  "Захиалгын дугаар",
  "Төрөл",
  "Гарчиг",
  "Нэмэлт тайлбар",
  "Үйсгэсэн хэрэглэгч",
  "Хэрэглэгчийн ID",
  "Албан тушаал",
  "Компьютерийн дугаар",
  "Утасны дугаар",
  "Статус",
  "Үүсэгсэн огноо",
];
