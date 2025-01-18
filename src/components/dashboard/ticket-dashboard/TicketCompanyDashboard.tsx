"use client";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Tooltip,
  Legend,
  Title,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

// Chart.js бүртгэл
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  Title
);

const TicketCompanyDashboard = () => {
  const company = [
    "Грийн групп ХХК",
    "Грийн трейд ХХК",
    "Грийн импекс ХХК",
    "Грийн индастри ХХК",
    "Грийн интернэшнл ХХК",
    "Грийн Фастори ХХК",
    "Грийн Финтек ХХК",
    "Актив гарден ХХК",
    "Грийн форжект ХХК",
    "Грийн ХХК",
  ];

  // Random дуудлагын тоо
  const callData = company.map(() => Math.floor(Math.random() * 100) + 10);

  // Horizontal Bar Chart-ийн дата
  const barChartData = {
    labels: company,
    datasets: [
      {
        label: "Дуудлагын тоо",
        data: callData,
        backgroundColor: [
          "#4BC0C0",
          "#FFCD56",
          "#36A2EB",
          "#FF6384",
          "#9966FF",
          "#FF9F40",
          "#C9CBCF",
          "#6B7280",
          "#A3E635",
          "#22D3EE",
        ],
        borderColor: "#ffffff",
        borderWidth: 1,
      },
    ],
  };

  // Chart тохиргоо
  const options = {
    responsive: true,
    maintainAspectRatio: false, // Диаграмын хэмжээг чөлөөтэй болгоно
    indexAxis: "y" as const, // Horizontal диаграмд зориулсан тохиргоо
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          font: {
            size: 14,
          },
        },
      },
      title: {
        display: true,
        text: "Компанийн дуудлагын тоо",
        font: {
          size: 16,
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true, // X тэнхлэгт 0-ээс эхэлнэ
        ticks: {
          font: {
            size: 12,
          },
        },
      },
      y: {
        ticks: {
          font: {
            size: 12,
          },
        },
      },
    },
  };

  return (
    <div className="w-full flex flex-col gap-8 p-6 bg-white rounded-lg shadow">
      <h2 className="text-lg text-center text-gray-600 font-bold">
        Компанийн дуудлагын тоо
      </h2>

      <div className="w-full h-[600px]">
        <Bar data={barChartData} options={options} />
      </div>

      {/* Нийт дуудлагын тоо */}
      <p className="text-gray-600 font-medium mt-6">
        Нийт дуудлагын тоо:{" "}
        <span className="font-bold">{callData.reduce((a, b) => a + b, 0)}</span>
      </p>
    </div>
  );
};

export default TicketCompanyDashboard;
