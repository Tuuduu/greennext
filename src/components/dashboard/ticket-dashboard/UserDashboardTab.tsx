"use client";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  Tooltip,
  Legend,
  Title,
  CategoryScale,
  LinearScale,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  BarElement,
  Tooltip,
  Legend,
  Title,
  CategoryScale,
  LinearScale
);

const UsersDashboard = ({ data }: { data: any }) => {
  // Default values to avoid undefined issues
  const totalUsers = data?.totalUsers || 100;
  const companyUsers = data?.companyUsers || 40;
  const departmentUsers = data?.departmentUsers || 30;
  const positionUsers = data?.positionUsers || 20;

  // Chart data for Bar chart
  const chartData = {
    labels: [
      "Нийт хэрэглэгч",
      "Компанийн хэрэглэгч",
      "Албаны хэрэглэгч",
      "Албан тушаалтай хэрэглэгч",
    ],
    datasets: [
      {
        label: "Хэрэглэгчдийн ангилал",
        data: [totalUsers, companyUsers, departmentUsers, positionUsers],
        backgroundColor: [
          "#4BC0C0", // Нийт хэрэглэгч
          "#FFCD56", // Компанийн хэрэглэгч
          "#36A2EB", // Албаны хэрэглэгч
          "#FF6384", // Албан тушаалтай хэрэглэгч
        ],
        hoverBackgroundColor: [
          "#5AD3D1", // Hover Нийт хэрэглэгч
          "#FFD685", // Hover Компанийн хэрэглэгч
          "#4BC8FF", // Hover Албаны хэрэглэгч
          "#FF809B", // Hover Албан тушаалтай хэрэглэгч
        ],
        borderColor: "#ffffff", // White border for better visibility
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
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
            return `${tooltipItem.label}: ${value}`;
          },
        },
      },
      title: {
        display: true,
        text: "Хэрэглэгчдийн ангилал",
        font: {
          size: 18,
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Ангилал",
          font: {
            size: 16,
          },
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Хэрэглэгчдийн тоо",
          font: {
            size: 16,
          },
        },
      },
    },
    animation: {
      animateScale: true,
    },
  };

  return (
    <div className="w-full bg-white p-6 rounded-lg shadow">
      <div className="mb-4 text-center">
        <h2 className="text-lg font-bold">Хэрэглэгчдийн дашбоард</h2>
        <p className="text-gray-600">
          Нийт хэрэглэгч: <strong>{totalUsers}</strong>, Компанийн хэрэглэгч:{" "}
          <strong>{companyUsers}</strong>, Албаны хэрэглэгч:{" "}
          <strong>{departmentUsers}</strong>, Албан тушаалтай хэрэглэгч:{" "}
          <strong>{positionUsers}</strong>
        </p>
      </div>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default UsersDashboard;
