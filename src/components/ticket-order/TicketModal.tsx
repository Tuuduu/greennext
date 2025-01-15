import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import anime from "animejs";
import TicketModalInfro from "./TicketModalInfro";
import TicketChangeStatus from "./TicketChangeStatus";

export default function TicketModal({ ticketData }: any) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    anime({
      targets: ".modal-content",
      translateY: [0, -50],
      opacity: [1, 0],
      duration: 500,
      easing: "easeInExpo",
      complete: () => setIsOpen(false),
    });
  };

  useEffect(() => {
    if (isOpen) {
      anime({
        targets: ".modal-content",
        translateY: [-50, 0],
        opacity: [0, 1],
        duration: 500,
        easing: "easeOutExpo",
      });
    }
  }, [isOpen]);

  return (
    <>
      {/* Open Modal Button */}
      <button
        onClick={handleOpen}
        className="bg-green-600 text-white text-[10px] px-4 py-2 rounded"
      >
        Дэлгэрэнгүй
      </button>

      {/* Modal Portal */}
      {isOpen &&
        ReactDOM.createPortal(
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            onClick={handleClose} // Modal гадна дархад хаагдана
          >
            <div
              className="modal-content bg-white p-6 max-w-lg w-full md:w-2/3 rounded-lg shadow-lg relative"
              onClick={(e) => e.stopPropagation()} // Modal дотор дарвал хаагдахгүй
            >
              {/* Modal Content */}
              <TicketModalInfro ticketData={ticketData} />
              <TicketChangeStatus ticketData={ticketData} />
              <button
                onClick={handleClose}
                className="bg-red-500 text-white mt-4 px-4 py-2 rounded w-full"
              >
                Гарах
              </button>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
