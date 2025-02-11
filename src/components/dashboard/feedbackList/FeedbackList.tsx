"use client";
import React, { useState, useEffect } from "react";
import anime from "animejs";
import Search from "../content-header/Search";
import PaginationTicket from "@/components/ticket-order/PaginationTicket";
import FeedbackModal from "./FeedbackModal";

export default function FeedbackList() {
  const [feedbacks, setFeedbacks] = useState<any[]>([]);
  const [filteredFeedbacks, setFilteredFeedbacks] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await fetch("/api/feedback");
        if (!response.ok) {
          throw new Error("Failed to fetch feedbacks");
        }
        const data = await response.json();
        setFeedbacks(data);
        setFilteredFeedbacks(data);
      } catch (error) {
        console.error("Error fetching feedbacks:", error);
      }
    };

    fetchFeedbacks();
  }, []);

  // Feedback шүүх
  useEffect(() => {
    const filtered = feedbacks.filter((feedback) => {
      return (
        (feedback.title || "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        (feedback.company || "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
    });
    setFilteredFeedbacks(filtered);
    setCurrentPage(1);
  }, [searchTerm, feedbacks]);

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
  }, [filteredFeedbacks, currentPage]);

  const startIndex = (currentPage - 1) * pageSize;
  const currentFeedbacks = filteredFeedbacks.slice(
    startIndex,
    startIndex + pageSize
  );
  const totalPages = Math.ceil(filteredFeedbacks.length / pageSize);

  // Хуудас солих
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div className="w-full h-full">
      <div className="transition duration-150 ease-in-out w-full flex flex-col gap-y-6 p-6 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg">
        <div className="w-full flex justify-between items-center mb-4">
          <Search
            placeholder="Санал хүсэлт хайх..."
            onSearch={(term: string) => setSearchTerm(term)}
          />
        </div>
        <div className="overflow-x-auto"></div>
        <table className="w-full border-collapse divide-y divide-gray-200 dark:divide-gray-700 text-[12px] 2xl:text-base">
          <thead className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold">
            <tr>
              <th className="text-gray-700 dark:text-gray-300 px-2 md:px-4 py-2 text-left">
                №
              </th>
              <th className="text-gray-700 dark:text-gray-300 px-2 md:px-4 py-2 text-left">
                Компани
              </th>
              <th className="text-gray-700 dark:text-gray-300 px-2 md:px-4 py-2 text-left">
                Гарчиг
              </th>
              <th className="text-gray-700 dark:text-gray-300 px-2 md:px-4 py-2 text-left">
                Төрөл
              </th>
              <th className="text-gray-700 dark:text-gray-300 px-2 md:px-4 py-2 text-left">
                Үүсгэсэн огно
              </th>
              <th className="px-2 md:px-4 py-2 text-center">Дэлгэрэнгүй</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {currentFeedbacks.map((item, index) => (
              <tr
                key={item._id}
                className="hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="px-2 md:px-4 py-4 text-gray-700 dark:text-gray-300">
                  {startIndex + index + 1}
                </td>
                <td className="px-2 md:px-4 py-4 text-gray-700 dark:text-gray-300">
                  {item.company}
                </td>
                <td className="px-2 md:px-4 py-4 text-gray-700 dark:text-gray-300">
                  {item.title || "Хоосон"}
                </td>
                <td className="px-2 md:px-4 py-4 text-gray-700 dark:text-gray-300">
                  {item.feedbackType}
                </td>
                <td className="px-2 md:px-4 py-4 text-gray-700 dark:text-gray-300">
                  {item.createdDate}
                </td>
                <td className="px-2 md:px-4 py-4 text-center">
                  {/* Modal Component */}
                  <FeedbackModal feedbackData={item} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Хуудаслалт */}
      {filteredFeedbacks.length > pageSize && (
        <PaginationTicket
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}
