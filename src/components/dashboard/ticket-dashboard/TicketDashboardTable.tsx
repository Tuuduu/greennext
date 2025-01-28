"use client";

import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { useState } from "react";

// Chart.js бүртгэл
ChartJS.register(ArcElement, Tooltip, Legend, Title);
interface FormData {
  timeLine: string;
}

const TicketDashboard = ({ data }: { data: any }) => {
  // Өгөгдлийн анхдагч утга
  const planned = data?.planned || 15;
  const inProgress = data?.inProgress || 20;
  const completed = data?.completed || 20;
  const newTicket = data?.newTicket || 25;

  const total = planned + inProgress + completed + newTicket;

  const timeLine = ["өнөөдөр", "7 хоногт", "сард", "жилд"];

  const engineers = [
    {
      employment: "Мэдээлэл технологийн инженер",
      name: "Мөнхтогтох",
      calls: 15,
    },
    { employment: "Мэдээлэл технологийн инженер", name: "Төгөлдөр", calls: 15 },
    { employment: "Мэдээлэл технологийн инженер", name: "Сэрчмаа", calls: 12 },
    { employment: "Холбоо тохиолын инженер", name: "Оюунболд", calls: 15 },
    { employment: "Сүлжээний инженер", name: "Барсболд", calls: 13 },
    { employment: "Электроникийн инженер", name: "Хөхтөмөр", calls: 15 },
  ];

  const [formData, setFormData] = useState<FormData>({
    timeLine: "өнөөдөр",
  });

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
        borderColor: "#ffffff",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
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

  const handleChangeSelector = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="w-full bg-white p-6 rounded-lg shadow ">
      <h2 className="text-lg text-gray-600 font-bold">
        Мэдээлэл технологийн албаны ажлын захиалга
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Таймлайн хэсэг */}
        <div className="w-full ">
          <div>
            <select
              value={formData.timeLine}
              onChange={handleChangeSelector}
              name="timeLine"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-auto p-2.5 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              {timeLine.map((comp, index) => (
                <option key={index} value={comp}>
                  {comp}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full max-w-3xl mx-auto bg-white p-6">
            <h1 className="text-sm font-bold text-gray-800 mb-6">
              Хийсэн дуудлага
            </h1>
            <ul className="space-y-4 text-sm">
              {engineers.map((engineer, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow"
                >
                  <span className="text-gray-700 font-medium">
                    {engineer.employment}
                    {":"}
                    <p className="font-bold">{engineer.name}</p>
                  </span>
                  <span className="text-blue-600 font-bold">
                    {engineer.calls}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* Pie Chart хэсэг */}
        <div className="flex flex-col items-center">
          <div className="w-[300px] h-[300px]">
            <Pie data={chartData} options={options} />
          </div>
          <div className="mt-4 text-gray-600">
            <p>Шинэ: {newTicket}</p>
            <p>Хүлээгдэж буй: {planned}</p>
            <p>Хийгдэж байгаа: {inProgress}</p>
            <p>Хаасан: {completed}</p>
            <p className="font-bold">
              {formData.timeLine} нийт дуудлага: {total}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketDashboard;
