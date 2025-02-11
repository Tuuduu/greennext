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
  const [selectedStatus, setSelectedStatus] = useState("Шинэ");

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
      <div className="transition duration-150 ease-in-out w-full flex flex-col gap-y-6 p-4 2xl:p-6 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg">
        {/* Хайлтын хэсэг */}
        <div className="w-full flex justify-between items-center mb-0 2xl:mb-4">
          <Search
            placeholder="Захиалга хайх..."
            onSearch={(term: string) => setSearchTerm(term)}
          />
          <div className="flex gap-2 md:gap-4 ">
            {["Шинэ", "Хаасан", "Бүгд"].map((status) => (
              <button
                key={status}
                className={`px-3 md:px-4 py-2 text-[12px] 2xl:text-base ${
                  selectedStatus === status
                    ? "bg-green-600 text-white"
                    : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                } border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none hover:bg-gray-100 dark:hover:bg-gray-600`}
                onClick={() => setSelectedStatus(status)}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Хүснэгт */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse divide-y divide-gray-200 dark:divide-gray-700 text-[12px] 2xl:text-base">
            <thead className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold">
              <tr>
                <th className="text-gray-700 dark:text-gray-300 px-2 md:px-4 py-2 text-left">
                  №
                </th>
                <th className="text-gray-700 dark:text-gray-300 px-2 md:px-4 py-2 text-left">
                  Төрөл
                </th>
                <th className="text-gray-700 dark:text-gray-300 px-2 md:px-4 py-2 text-left">
                  Гарчиг
                </th>
                <th className="text-gray-700 dark:text-gray-300 px-2 md:px-4 py-2 text-left">
                  Нэр
                </th>
                <th className="text-gray-700 dark:text-gray-300 px-2 md:px-4 py-2 text-left">
                  Компани
                </th>
                <th className="text-gray-700 dark:text-gray-300 px-2 md:px-4 py-2 text-left">
                  Албан тушаал
                </th>
                <th className="text-gray-700 dark:text-gray-300 px-2 md:px-4 py-2 text-left">
                  Үүсгэсэн огно
                </th>
                <th className="text-gray-700 dark:text-gray-300 px-2 md:px-4 py-2 text-left">
                  Статус
                </th>
                <th className="px-2 md:px-4 py-2 text-center">Дэлгэрэнгүй</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {currentTickets.map((item, index) => (
                <tr
                  key={item._id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="px-2 md:px-4 py-4 text-gray-700 dark:text-gray-300">
                    {startIndex + index + 1}
                  </td>
                  <td className="px-2 md:px-4 py-4 text-gray-700 dark:text-gray-300">
                    {item.ticketType}
                  </td>
                  <td className="px-2 md:px-4 py-4 text-gray-700 dark:text-gray-300">
                    {item.title || "Хоосон"}
                  </td>
                  <td className="px-2 md:px-4 py-4 text-gray-700 dark:text-gray-300">
                    {item.username}
                  </td>
                  <td className="px-2 md:px-4 py-4 text-gray-700 dark:text-gray-300">
                    {item.company}
                  </td>
                  <td className="px-2 md:px-4 py-4 text-gray-700 dark:text-gray-300">
                    {item.position}
                  </td>
                  <td className="px-2 md:px-4 py-4 text-gray-700 dark:text-gray-300">
                    {item.createdDate}
                  </td>
                  <td className="px-2 md:px-4 py-4 text-gray-700 dark:text-gray-300">
                    <span
                      className={`px-2 py-1 rounded-md text-[12px] 2xl:text-sm ${
                        item.status === "Шинэ"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                          : item.status === "Хаасан"
                          ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                          : "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
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
