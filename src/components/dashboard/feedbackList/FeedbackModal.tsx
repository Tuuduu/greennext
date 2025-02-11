import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import anime from "animejs";

export default function FeedbackModal({ feedbackData }: { feedbackData: any }) {
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
              className="modal-content w-full max-w-lg bg-white/80 dark:bg-gray-800 dark:text-white backdrop-blur-lg shadow-lg p-6 2xl:p-8 rounded-3xl border border-gray-300 dark:border-gray-700 relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Content */}
              <h2 className="text-lg 2xl:text-2xl font-bold text-center text-gray-700 dark:text-gray-300 mb-6">
                Дэлгэрэнгүй мэдээлэл
              </h2>
              <ul className="2xl:space-y-4 space-y-2 tex-[12px] 2xl:text-[14px]">
                {[
                  { label: "Компани", value: feedbackData.company },
                  { label: "Гарчиг", value: feedbackData.title },
                  { label: "Төрөл", value: feedbackData.feedbackType },
                  { label: "Тайлбар", value: feedbackData.description },
                  { label: "Үүсэгсэн огноо", value: feedbackData.createdDate },
                ].map((item, index) => (
                  <li key={index} className="flex justify-between">
                    <span className="font-medium text-gray-900 dark:text-gray-300">
                      {item.label}
                    </span>
                    <span className="text-gray-700 text-right dark:text-gray-400">
                      {item.value}
                    </span>
                  </li>
                ))}
              </ul>
              <button
                onClick={handleClose}
                className="w-full mt-4 rounded-lg bg-red-500 py-2 2xl:py-2.5 px-4 text-[12px] 2xl:text-sm font-medium text-white transition-transform hover:scale-105 hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-300"
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
