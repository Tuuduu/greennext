"use client";
import TicketList from "./TicketList";
import { useState, useEffect } from "react";

const TicketTable = () => {
  const [data, setData] = useState(null); // Анхны өгөгдөл
  const [loading, setLoading] = useState(true); // Ачаалж эхлэх төлөв
  const [error, setError] = useState(null); // Алдааны төлөв

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/ticket-order", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ someData: "example" }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();

        if (result.tickets) {
          // Хэрэв массив бол шууд, объект бол массив болгоно
          const ticketsArray = Array.isArray(result.tickets)
            ? result.tickets
            : Object.values(result.tickets);

          setData(ticketsArray); // Зөвхөн массив өгөгдлийг хадгалах
        } else {
          throw new Error("Unexpected data format: tickets not found");
        }
      } catch (err) {
        console.error("API fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Хоосон dependency array: зөвхөн нэг удаа ажиллана

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  // Хоосон өгөгдөлд зориулсан UI
  if (!data || (typeof data === "object" && Object.keys(data).length === 0)) {
    return;
  }
  // Амжилттай өгөгдлийг харуулах
  return (
    <div className="w-full h-full">
      <TicketList ticket={data} />
    </div>
  );
};

export default TicketTable;
