import React, { useState, useEffect } from "react";
import anime from "animejs";
import Search from "../dashboard/content-header/Search";
import PaginationTicket from "@/components/ticket-order/PaginationTicket";
import TicketModal from "./TicketModal";

export default function TicketList(ticket: any) {
  const TecketsData = ticket.ticket;
  const [tickets, setTickets] = useState<any[]>([]);
  const [filteredTickets, setFilteredTickets] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("шинэ");

  useEffect(() => {
    if (Array.isArray(TecketsData)) {
      setTickets(TecketsData);
      setFilteredTickets(TecketsData);
    } else if (TecketsData && typeof TecketsData === "object") {
      setTickets([TecketsData]);
      setFilteredTickets([TecketsData]);
    } else {
      console.error("Invalid data format:", TecketsData);
    }
  }, [TecketsData]);

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

  useEffect(() => {
    const filtered = tickets.filter((ticket: any) => {
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

  const startIndex = (currentPage - 1) * pageSize;
  const currentTickets = filteredTickets.slice(
    startIndex,
    startIndex + pageSize
  );
  const totalPages = Math.ceil(filteredTickets.length / pageSize);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div className="w-full h-full px-4 md:px-6 bg-gray-50">
      <div className="transition duration-150 ease-in-out w-full flex flex-col gap-y-6 p-6 bg-white rounded-lg shadow hover:shadow-lg">
        <div className="w-full flex justify-between items-center mb-4">
          <Search
            placeholder="Search for a ticket..."
            onSearch={(term: string) => setSearchTerm(term)}
          />
          <div className="flex gap-2 md:gap-4">
            {["шинэ", "хаасан", "Бүгд"].map((status) => (
              <button
                key={status}
                className={`px-3 md:px-4 py-2 text-sm md:text-base ${
                  selectedStatus === status
                    ? "bg-green-600 text-white"
                    : "bg-white"
                } border border-gray-300 rounded-md shadow-sm focus:outline-none`}
                onClick={() => setSelectedStatus(status)}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse divide-y divide-gray-200 text-sm md:text-base">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-2 md:px-4 py-2 text-left">№</th>
                <th className="px-2 md:px-4 py-2 text-left">Төрөл</th>
                <th className="px-2 md:px-4 py-2 text-left">Гарчиг</th>
                <th className="px-2 md:px-4 py-2 text-left">Нэр</th>
                <th className="px-2 md:px-4 py-2 text-left">Компани</th>
                <th className="px-2 md:px-4 py-2 text-left">Албан тушаал</th>
                <th className="px-2 md:px-4 py-2 text-left">Үүсгэсэн огно</th>
                <th className="px-2 md:px-4 py-2 text-left">Статус</th>
                <th className="px-2 md:px-4 py-2 text-center">Дэлгэрэнгүй</th>
              </tr>
            </thead>
            <tbody>
              {currentTickets.map((item: any, index: number) => (
                <tr key={item._id} className="hover:bg-gray-50">
                  <td className="px-2 md:px-4 py-4">
                    {startIndex + index + 1}
                  </td>
                  <td className="px-2 md:px-4 py-4">{item.ticketType}</td>
                  <td className="px-2 md:px-4 py-4">
                    {item.title || "Хоосон"}
                  </td>
                  <td className="px-2 md:px-4 py-4">{item.username}</td>
                  <td className="px-2 md:px-4 py-4">{item.company}</td>
                  <td className="px-2 md:px-4 py-4">{item.position}</td>
                  <td className="px-2 md:px-4 py-4">{item.createdDate}</td>
                  <td className="px-2 md:px-4 py-4">{item.status}</td>
                  <td className="px-2 md:px-4 py-4 text-center">
                    {/* Modal Component */}
                    <TicketModal ticketData={item} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

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
