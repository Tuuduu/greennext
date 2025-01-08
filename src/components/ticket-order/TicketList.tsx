"use client";

import React, { useState, useEffect } from "react";
import Search from "../dashboard/content-header/Search";
import PaginationTicket from "@/components/ticket-order/PaginationTicket";
import TicketModal from "./TicketModal";

export default function TicketList(ticket: any) {
  const TecketsData = ticket.ticket;
  const [tickets, setTickets] = useState<any>([]); // Бүх өгөгдөл хадгалах
  const [filteredTickets, setFilteredTickets] = useState<any>([]); // Хайлтын дараах өгөгдөл
  const [currentPage, setCurrentPage] = useState(1); // Одоогийн хуудас
  const [pageSize] = useState(10); // Хуудас бүрийн өгөгдлийн тоо
  const [searchTerm, setSearchTerm] = useState(""); // Хайлтын утга
  const [selectedStatus, setSelectedStatus] = useState("шинэ");
  const style1 = "text-gray-700 px-4 py-2 text-[14px] text-left";
  const style2 = "px-4 py-5 text-gray-700 text-[14px]";


  useEffect(() => {
    // Анхны өгөгдөл хадгалах
    if (Array.isArray(TecketsData)) {
      setTickets(TecketsData);
      setFilteredTickets(TecketsData); // Эхлэх үед бүх өгөгдлийг харуулах
    }
  }, [TecketsData]);

  // useEffect(() => {
  //   // Хайлтын утгаар өгөгдөл шүүх
  //   const filtered = tickets.filter((ticket: any) => {
  //     return (
  //       ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //       ticket.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //       ticket.company.toLowerCase().includes(searchTerm.toLowerCase())
  //     );
  //   });
   


  //   setFilteredTickets(filtered);
  //   setCurrentPage(1); // Шинэ хайлтаар эхний хуудсанд шилжих
  // }, [searchTerm, tickets]);


  useEffect(() => {
    // Хайлтын утгаар болон статусаар өгөгдөл шүүх
    const filtered = tickets.filter((ticket: any) => {
      const matchesSearchTerm =
        ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.company.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = selectedStatus === "Бүгд" || ticket.status === selectedStatus;
      
      return matchesSearchTerm && matchesStatus;
    });
    setFilteredTickets(filtered);
    setCurrentPage(1); // Шинэ хайлтаар эхний хуудсанд шилжих
  }, [searchTerm, tickets, selectedStatus]);

  

  // Хуудасны өгөгдлийг тооцоолох
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentTickets = filteredTickets.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredTickets.length / pageSize); // Нийт хуудасны тоо
  console.log("dataaa tickets ", TecketsData)

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="w-full h-full px-10 bg-gray-50">
      <div className="transition duration-150 ease-in-out w-full flex flex-col items-center gap-y-6 p-5 bg-white rounded-lg shadow hover:shadow-lg">
        {/* Хайлтын талбар */}
        <div className="w-full flex justify-between items-start">
          <Search
            placeholder="Search for a ticket..."
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearchTerm(e.target.value) // Хайлтын утга өөрчлөгдөх бүрт `searchTerm`-ийг шинэчилнэ
            }
          />
          
          <div className="flex flex-row gap-4">
          <button
    className={`px-4 py-2 ${selectedStatus === "шинэ" ? "bg-green-600 text-white" : "bg-white"} border border-gray-300 rounded-md shadow-sm focus:outline-none`}
    onClick={() => setSelectedStatus("шинэ")}
  >
    Шинэ
  </button>
  <button
    className={`px-4 py-2 ${selectedStatus === "хаасан" ? "bg-green-600 text-white" : "bg-white"} border border-gray-300 rounded-md shadow-sm focus:outline-none`}
    onClick={() => setSelectedStatus("хаасан")}
  >
    Хаасан
  </button>
  <button
    className={`px-4 py-2 ${selectedStatus === "Бүгд" ? "bg-green-600 text-white" : "bg-white"} border border-gray-300 rounded-md shadow-sm focus:outline-none`}
    onClick={() => setSelectedStatus("Бүгд")}
  >
    Бүгд
  </button>
          </div>
          
        </div>
        <table className="w-full border-collapse divide-y divide-white">
          <thead className="border-b-2 border-gray-200">
            <tr>
              <th className={style1}>№</th>
              <th className={style1}>Төрөл</th>
              <th className={style1}>Гарчиг</th>
              <th className={style1}>Нэр</th>
              <th className={style1}>Компани</th>
              <th className={style1}>Албан тушаал</th>
              <th className={style1}>Үүсгэсэн огно</th>
              <th className={style1}>Статус</th>
              <th className="text-gray-700 px-4 py-2 text-[14px] text-center">Дэлгэрэнгүй</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentTickets.map((item: any, index: number) => (
              <tr key={item._id}>
                <td className={style2}>{startIndex + index + 1}</td>
                <td className={style2}>{item.ticketType}</td>
                <td className={style2}>{item.title}</td>
                <td className={style2}>{item.username}</td>
                <td className={style2}>{item.company}</td>
                <td className={style2}>{item.position}</td>
                <td className={style2}>{item.createdDate}</td>
                <td className={style2}>{item.status}</td>
                <td className="px-4 py-5 text-center">
                  <TicketModal ticketData={item} />
                </td>
              </tr>
              
            ))}
          </tbody>
        </table>

        {/* Pagination */}
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
