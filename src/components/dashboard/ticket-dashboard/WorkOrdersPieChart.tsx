import React from "react";
import { Bar } from "react-chartjs-2";

const DepartmentsBarChart = ({ data }) => {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: "Хэрэглэгчдийн тоо",
        data: data.values,
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Албадын хэрэглэгчдийн тоо",
      },
    },
    animation: {
      duration: 1000,
      easing: "easeInOutBounce",
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default DepartmentsBarChart;
