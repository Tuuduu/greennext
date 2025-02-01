"use client";

import { useState, useEffect } from "react";
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
  const [ticketData, setTicketData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/ticket-order");
        if (!response.ok) throw new Error("API-с өгөгдөл татахад алдаа гарлаа");

        const data = await response.json();
        setTicketData(data.tickets);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <p>Өгөгдөл ачааллаж байна...</p>;
  if (error) return <p className="text-red-500">Алдаа: {error}</p>;

  // Компаниудын жагсаалт
  const companyNames = [
    "Грийн Групп",
    "Грийн ХХК",
    "Грийн Интернэшнл",
    "Грийн Фактори",
    "Грийн Трейд",
    "Грийн Импекс",
    "Грийн Индастри",
    "Грийн Дистрбьюшн",
    "Грийн Форжект",
    "Грийн Финтек",
    "Актив Гарден",
  ];

  console.log("Ticket dataaaa ---> ", ticketData);
  // Компани бүрийн тасалбарын тоог тоолох
  const companyTicketCounts = companyNames.map((company) => {
    return ticketData.filter((ticket: any) => ticket.company === company)
      .length;
  });

  // Horizontal Bar Chart-ийн дата
  const barChartData = {
    labels: companyNames,
    datasets: [
      {
        label: "Дуудлагын тоо",
        data: companyTicketCounts,
        backgroundColor: [
          "#4BC0C0",
          "#f48771",
          "#36A2EB",
          "#FF6384",
          "#9966FF",
          "#FF9F40",
          "#C9CBCF",
          "#6B7280",
          "#A3E635",
          "#22D3EE",
          "#FFCD56",
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
    <div className="w-full flex flex-col gap-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
      <h2 className="text-lg text-center text-gray-600 dark:text-gray-300 font-bold">
        Компанийн дуудлагын тоо
      </h2>

      <div className="w-full h-[600px]">
        <Bar data={barChartData} options={options} />
      </div>

      {/* Нийт дуудлагын тоо */}
      <p className="text-gray-600 dark:text-gray-300 font-medium mt-6">
        Нийт дуудлагын тоо:{" "}
        <span className="font-bold">
          {companyTicketCounts.reduce((a, b) => a + b, 0)}
        </span>
      </p>
    </div>
  );
};

export default TicketCompanyDashboard;
