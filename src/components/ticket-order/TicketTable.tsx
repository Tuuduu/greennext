"use client";
import { fetchMtaTicket } from "@/library/mongoDB/data";
import TicketList from "./TicketList";
import { useState, useEffect } from "react";

const TicketTable = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // API дуудлага хийх
    const fetchData = async () => {
      try {
        const response = await fetch("/api/mta-ticket-order", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ someData: "example" }),
        });

        const result = await response.json();
        console.log("dataaa --->", result);
        setData(result);
      } catch (error) {
        console.error("API fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // хоосон dependency array: зөвхөн нэг удаа ажиллана

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!data) {
    return <p>No data available</p>;
  }
  return (
    <div className="w-full h-full bg-gray-50">
      <TicketList ticket={data} />
    </div>
  );
};

export default TicketTable;
