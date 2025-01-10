"use client";

import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, Title);

const TicketDashboard = ({ data }: { data: any }) => {
  // Chart data for Pie chart
  const chartData = {
    labels: ["Нийт", "Хүлээгдэж буй", "Хийгдэж байгаа", "Хаасан"],
    datasets: [
      {
        label: "Ажлын захиалгууд",
        data: [
          data.planned || 15,
          data.inProgress || 20,
          data.completed || 20,
          data.cancelled || 25,
        ],
        backgroundColor: [
          "rgba(75, 192, 192, 0.6)", // Төлөвлөсөн
          "rgba(255, 205, 86, 0.6)", // Хийгдэж байгаа
          "rgba(54, 162, 235, 0.6)", // Дууссан
          "rgba(255, 99, 132, 0.6)", // Цуцлагдсан
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(255, 205, 86, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 99, 132, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Нийт ажлын захиалга",
      },
    },
  };

  return (
    <div className="w-full bg-white p-6 rounded-lg shadow">
      <Pie data={chartData} options={options} />
    </div>
  );
};

export default TicketDashboard;
