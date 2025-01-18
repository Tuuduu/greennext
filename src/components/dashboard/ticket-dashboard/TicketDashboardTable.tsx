"use client";

import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";

// Chart.js бүртгэл
ChartJS.register(ArcElement, Tooltip, Legend, Title);

const TicketDashboard = ({ data }: { data: any }) => {
  // Өгөгдлийн анхдагч утга
  const planned = data?.planned || 15;
  const inProgress = data?.inProgress || 20;
  const completed = data?.completed || 20;
  const newTicket = data?.newTicket || 25;

  const total = planned + inProgress + completed + newTicket;

  // Pie Chart-ын өгөгдөл
  const chartData = {
    labels: ["Шинэ", "Хүлээгдэж буй", "Хийгдэж байгаа", "Хаасан"],
    datasets: [
      {
        label: "Ажлын захиалгууд",
        data: [newTicket, planned, inProgress, completed],
        backgroundColor: [
          "#4BC0C0", // Шинэ
          "#FFCD56", // Хүлээгдэж буй
          "#36A2EB", // Хийгдэж байгаа
          "#FF6384", // Хаасан
        ],
        hoverBackgroundColor: ["#5AD3D1", "#FFD685", "#4BC8FF", "#FF809B"],
        borderColor: "#ffffff", // Илүү тод харагдуулах
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Aspect ratio тохируулахгүй
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem: any) => {
            const value = tooltipItem.raw;
            const percentage = ((value / total) * 100).toFixed(1);
            return `${tooltipItem.label}: ${value} (${percentage}%)`;
          },
        },
      },
      title: {
        display: true,
        text: "Ажлын захиалгын хуваарилалт",
        font: {
          size: 16,
        },
      },
    },
    animation: {
      animateScale: true,
    },
  };

  return (
    <div className="w-full bg-white flex flex-col items-center p-6 rounded-lg shadow">
      <h2 className="text-lg text-gray-600 font-bold">Ажлын захиалга</h2>
      <div className="w-full h-auto flex flex-row items-center justify-center">
        {/* Pie Chart */}
        <div className="w-[400px] h-[400px]">
          <Pie data={chartData} options={options} />
        </div>
        {/* Нэмэлт тайлбар */}
        <div className="ml-8">
          <p className="text-gray-600 font-bold mb-4">Нийт дуудлага: {total}</p>
          <p className="text-gray-600">Шинэ: {newTicket}</p>
          <p className="text-gray-600">Хүлээгдэж буй: {planned}</p>
          <p className="text-gray-600">Хийгдэж байгаа: {inProgress}</p>
          <p className="text-gray-600">Хаасан: {completed}</p>
        </div>
      </div>
    </div>
  );
};

export default TicketDashboard;
