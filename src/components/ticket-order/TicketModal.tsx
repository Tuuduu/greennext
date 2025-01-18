import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import anime from "animejs";
import TicketModalInfro from "./TicketModalInfro";
import TicketChangeStatus from "./TicketChangeStatus";

export default function TicketModal({
  ticketData,
  onStatusUpdate,
}: {
  ticketData: any;
  onStatusUpdate: (updatedTicket: any) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
    anime({
      targets: e.currentTarget,
      scale: [1, 0.95, 1],
      duration: 200,
      easing: "easeOutQuad",
      complete: () => {
        setIsOpen(true);
      },
    });
  };

  const handleClose = () => {
    anime({
      targets: ".modal-content",
      translateY: [0, -50],
      opacity: [1, 0],
      duration: 300,
      easing: "easeInQuad",
      complete: () => setIsOpen(false),
    });

    // Fade out overlay
    anime({
      targets: ".modal-overlay",
      opacity: [1, 0],
      duration: 300,
      easing: "easeInQuad",
    });
  };

  useEffect(() => {
    if (isOpen) {
      // Fade in overlay
      anime({
        targets: ".modal-overlay",
        opacity: [0, 1],
        duration: 300,
        easing: "easeOutQuad",
      });

      // Animate modal content
      anime({
        targets: ".modal-content",
        translateY: [-50, 0],
        opacity: [0, 1],
        duration: 300,
        easing: "easeOutQuad",
      });
    }
  }, [isOpen]);

  return (
    <>
      {/* Open Modal Button */}
      <button
        onClick={handleOpen}
        className="bg-green-600 text-white text-[10px] px-4 py-2 rounded hover:shadow-md transition-shadow duration-200"
        style={{
          transformOrigin: "center",
        }}
      >
        Дэлгэрэнгүй
      </button>

      {/* Modal Portal */}
      {isOpen &&
        ReactDOM.createPortal(
          <div
            className="modal-overlay fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            onClick={handleClose}
          >
            <div
              className="modal-content bg-white p-6 max-w-lg w-full md:w-2/3 rounded-lg shadow-lg relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Content */}
              <TicketModalInfro ticketData={ticketData} />
              <TicketChangeStatus
                ticketData={ticketData}
                onStatusUpdate={onStatusUpdate}
              />
              <button
                onClick={handleClose}
                className="bg-red-500 text-white mt-4 px-4 py-2 rounded w-full hover:shadow-md transition-shadow duration-200"
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
