"use client";
import { useEffect, useState } from "react";
import TicketList from "./TicketList";

const TicketTable = () => {
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetch("/api/ticketData");
        console.log("dataaa ----> ", data);
        setTicket(data);
      } catch (error) {
        console.error("Алдаа гарлаа:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <p>Уншиж байна...</p>;
  if (!ticket) return <p>No profile data</p>;

  return (
    <div className="w-full h-full bg-gray-50">
      <TicketList tickets={ticket} />
    </div>
  );
};

export default TicketTable;
