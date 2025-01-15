"use client";

import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, Title);

const TicketDashboard = ({ data }: { data: any }) => {
  // Default values to avoid undefined issues
  const planned = data?.planned || 15;
  const inProgress = data?.inProgress || 20;
  const completed = data?.completed || 20;
  const newticket = data?.newticket || 25;

  const total = planned + inProgress + completed + newticket;

  // Chart data for Pie chart
  const chartData = {
    labels: ["Шинэ", "Хүлээгдэж буй", "Хийгдэж байгаа", "Хаасан"],
    datasets: [
      {
        label: "Ажлын захиалгууд",
        data: [planned, inProgress, completed, newticket],
        backgroundColor: [
          "#4BC0C0", // Төлөвлөсөн
          "#FFCD56", // Хүлээгдэж буй
          "#36A2EB", // Хийгдэж байгаа
          "#FF6384", // Цуцлагдсан
        ],
        hoverBackgroundColor: [
          "#5AD3D1", // Hover төлөвлөсөн
          "#FFD685", // Hover хүлээгдэж буй
          "#4BC8FF", // Hover хийгдэж байгаа
          "#FF809B", // Hover цуцлагдсан
        ],
        borderColor: "#ffffff", // White border for better visibility
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Disable aspect ratio maintenance
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
        text: "",
        font: {
          size: 14,
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
      <div className="w-full h-auto flex flex-row">
        <div className="w-[600px] h-[500px]">
          <Pie data={chartData} options={options} />
        </div>
        <div className="mb-4 pt-10">
          <p className="text-gray-600 font-bold pb-4">Нийт дуудлага: {total}</p>
          <p className="text-gray-600">Шинэ: {newticket}</p>
          <p className="text-gray-600">Хийгдэж байгаа: {inProgress}</p>
          <p className="text-gray-600">Хүлээгдэж буй: {planned}</p>
          <p className="text-gray-600">Хаасан: {completed}</p>
        </div>
      </div>
    </div>
  );
};

export default TicketDashboard;
