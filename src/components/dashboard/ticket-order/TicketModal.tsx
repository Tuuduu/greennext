import { useState } from "react";
import TicketModalInfro from "./TicketModalInfro";
import TicketChangeStatus from "./TicketChangeStatus";

export default function TicketModal(ticketData: any) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {/* Open Modal Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="bg-green-600 text-white text-[10px] px-4 py-2 rounded"
      >
        Дэлгэрэнгүй
      </button>

      {/* Modal Overlay & Content */}
      {isOpen && (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          {/* Modal Box */}
          <div
            className="bg-white p-6 flex flex-col rounded shadow-lg transition-transform transform scale-95 opacity-0 animate-fade-in"
            style={{
              animation: "fadeIn 0.3s ease-out forwards",
            }}
          >
            <TicketModalInfro value={ticketData}/>
            <TicketChangeStatus value={ticketData}/>
            <button
              onClick={() => setIsOpen(false)}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Гарах
            </button>
          </div>

          {/* Animation CSS */}
          <style jsx>{`
            @keyframes fadeIn {
              from {
                opacity: 0;
                transform: scale(0.95);
              }
              to {
                opacity: 1;
                transform: scale(1);
              }
            }
          `}</style>
        </div>
      )}
    </div>
  );
}
