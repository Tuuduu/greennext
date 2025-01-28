import React, { useState, useEffect } from "react";
import anime from "animejs";
import Search from "../dashboard/content-header/Search";
import PaginationTicket from "@/components/ticket-order/PaginationTicket";
import TicketModal from "./TicketModal";

export default function TicketList({ ticket }: { ticket: any[] }) {
  const [tickets, setTickets] = useState(ticket || []);
  const [filteredTickets, setFilteredTickets] = useState(ticket || []);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("шинэ");

  // Тасалбар шүүх
  useEffect(() => {
    const filtered = tickets.filter((ticket) => {
      const matchesSearchTerm =
        (ticket.title || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (ticket.username || "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        (ticket.company || "").toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        selectedStatus === "Бүгд" || ticket.status === selectedStatus;

      return matchesSearchTerm && matchesStatus;
    });
    setFilteredTickets(filtered);
    setCurrentPage(1);
  }, [searchTerm, tickets, selectedStatus]);

  // Анимэйшн
  useEffect(() => {
    anime({
      targets: "tbody tr",
      translateY: [-10, 0],
      opacity: [0, 1],
      easing: "easeOutExpo",
      duration: 500,
      delay: anime.stagger(50),
    });
  }, [filteredTickets, currentPage]);

  const startIndex = (currentPage - 1) * pageSize;
  const currentTickets = filteredTickets.slice(
    startIndex,
    startIndex + pageSize
  );
  const totalPages = Math.ceil(filteredTickets.length / pageSize);

  // Хуудас солих
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  // Төлөв шинэчлэх функц
  const handleStatusUpdate = (updatedTicket: any) => {
    setTickets((prev) =>
      prev.map((ticket) =>
        ticket._id === updatedTicket._id ? updatedTicket : ticket
      )
    );
    setFilteredTickets((prev) =>
      prev.map((ticket) =>
        ticket._id === updatedTicket._id ? updatedTicket : ticket
      )
    );
  };

  return (
    <div className="w-full h-full">
      <div className="transition duration-150 ease-in-out w-full flex flex-col gap-y-6 p-6 bg-white rounded-lg shadow hover:shadow-lg">
        {/* Хайлтын хэсэг */}
        <div className="w-full flex justify-between items-center mb-4">
          <Search
            placeholder="Захиалга хайх..."
            onSearch={(term: string) => setSearchTerm(term)}
          />
          <div className="flex gap-2 md:gap-4">
            {["шинэ", "хаасан", "Бүгд"].map((status) => (
              <button
                key={status}
                className={`px-3 md:px-4 py-2 text-sm md:text-base ${
                  selectedStatus === status
                    ? "bg-green-600 text-white"
                    : "bg-white text-gray-700"
                } border border-gray-300 rounded-md shadow-sm focus:outline-none hover:bg-gray-100`}
                onClick={() => setSelectedStatus(status)}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Хүснэгт */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse divide-y divide-gray-200 text-sm md:text-base">
            <thead className="bg-gray-200 text-gray-700 font-semibold">
              <tr>
                <th className="text-gray-700 px-2 md:px-4 py-2 text-left">№</th>
                <th className="text-gray-700 px-2 md:px-4 py-2 text-left">
                  Төрөл
                </th>
                <th className="text-gray-700 px-2 md:px-4 py-2 text-left">
                  Гарчиг
                </th>
                <th className="text-gray-700 px-2 md:px-4 py-2 text-left">
                  Нэр
                </th>
                <th className="text-gray-700 px-2 md:px-4 py-2 text-left">
                  Компани
                </th>
                <th className="text-gray-700 px-2 md:px-4 py-2 text-left">
                  Албан тушаал
                </th>
                <th className="text-gray-700 px-2 md:px-4 py-2 text-left">
                  Үүсгэсэн огно
                </th>
                <th className="text-gray-700 px-2 md:px-4 py-2 text-left">
                  Статус
                </th>
                <th className="px-2 md:px-4 py-2 text-center">Дэлгэрэнгүй</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentTickets.map((item, index) => (
                <tr key={item._id} className="hover:bg-gray-50">
                  <td className="px-2 md:px-4 py-4 text-gray-700">
                    {startIndex + index + 1}
                  </td>
                  <td className="px-2 md:px-4 py-4 text-gray-700">
                    {item.ticketType}
                  </td>
                  <td className="px-2 md:px-4 py-4 text-gray-700">
                    {item.title || "Хоосон"}
                  </td>
                  <td className="px-2 md:px-4 py-4 text-gray-700">
                    {item.username}
                  </td>
                  <td className="px-2 md:px-4 py-4 text-gray-700">
                    {item.company}
                  </td>
                  <td className="px-2 md:px-4 py-4 text-gray-700">
                    {item.position}
                  </td>
                  <td className="px-2 md:px-4 py-4 text-gray-700">
                    {item.createdDate}
                  </td>
                  <td className="px-2 md:px-4 py-4 text-gray-700">
                    <span
                      className={`px-2 py-1 rounded-md text-sm ${
                        item.status === "шинэ"
                          ? "bg-green-100 text-green-800"
                          : item.status === "хаасан"
                          ? "bg-red-100 text-red-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="px-2 md:px-4 py-4 text-center">
                    {/* Modal Component */}
                    <TicketModal
                      ticketData={item}
                      onStatusUpdate={handleStatusUpdate}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Хуудаслалт */}
        {filteredTickets.length > pageSize && (
          <PaginationTicket
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
}
