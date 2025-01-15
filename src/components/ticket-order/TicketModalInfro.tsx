import React from "react";

export default function TicketModalInfro(value: any) {
  const ticketModalData = value.ticketData;

  return (
    <div className="p-6">
      <h1>Дэлгэрэнгүй</h1>
      <ul className="grid grid-cols-1 divide-y gap-1 list-decimal">
        <li className="grid grid-cols-2 gap-x-6">
          <li>Захиалгын дугаар</li>
          <div>{ticketModalData._id}</div>
        </li>
        <li className="grid grid-cols-2 gap-x-6">
          <li>Төрөл</li>
          <div>{ticketModalData.ticketType}</div>
        </li>
        <li className="grid grid-cols-2 gap-x-6">
          <li>Компани</li>
          <div>{ticketModalData.company}</div>
        </li>
        <li className="grid grid-cols-2 gap-x-6">
          <li>Гарчиг</li>
          <div>{ticketModalData.title}</div>
        </li>
        <li className="grid grid-cols-2 gap-x-6">
          <li>Тайлбар</li>
          <div>{ticketModalData.description}</div>
        </li>
        <li className="grid grid-cols-2 gap-x-6">
          <li>Үйсгэсэн хэрэглэгч</li>
          <div>{ticketModalData.username}</div>
        </li>
        <li className="grid grid-cols-2 gap-x-6">
          <li>Хэрэглэгчийн ID</li>
          <div>null</div>
        </li>
        <li className="grid grid-cols-2 gap-x-6">
          <li>Албан тушаал</li>
          <div>{ticketModalData.position}</div>
        </li>
        <li className="grid grid-cols-2 gap-x-6">
          <li>Компьютерийн дугаар</li>
          <div>{ticketModalData.domain}</div>
        </li>
        <li className="grid grid-cols-2 gap-x-6">
          <li>Утасны дугаар</li>
          <div>{ticketModalData.phoneNumber}</div>
        </li>
        <li className="grid grid-cols-2 gap-x-6">
          <li>Статус</li>
          <div>{ticketModalData.status}</div>
        </li>
        <li className="grid grid-cols-2 gap-x-6">
          <li>Үүсэгсэн огноо</li>
          <div>{ticketModalData.createdDate}</div>
        </li>
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
