"use client";

import { useState, useEffect, useRef } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import anime from "animejs";
import EmploymentDashboard from "./EmploymentDashboard";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

interface TicketData {
  planned: number;
  inProgress: number;
  completed: number;
  newTicket: number;
}

interface Engineer {
  _id: string;
  firstName: string;
  employment: string;
  workingPart: string;
  ticketCount: number;
}

const TicketDashboard = () => {
  const loaderRef = useRef<HTMLDivElement>(null);
  const [tickets, setTickets] = useState<TicketData>({
    planned: 0,
    inProgress: 0,
    completed: 0,
    newTicket: 0,
  });
  const [statusCounts, setStatusCounts] = useState({
    Шинэ: 0,
    "Хүлээгдэж байна": 0,
    "Хийгдэж байна": 0,
    Хаасан: 0,
  });
  const [engineers, setEngineers] = useState<Engineer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (loaderRef.current) {
      anime({
        targets: ".loader-skeleton",
        opacity: [0.2, 1],
        duration: 1000,
        easing: "easeInOutQuad",
        loop: true,
        direction: "alternate",
      });
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, ticketsRes] = await Promise.all([
          fetch("/api/users"),
          fetch("/api/ticket-order"),
        ]);

        if (!usersRes.ok || !ticketsRes.ok) {
          throw new Error("API-с өгөгдөл татахад алдаа гарлаа");
        }

        const usersData = await usersRes.json();
        const ticketsData = await ticketsRes.json();

        // Ticket статусуудыг тоолох
        const counts = ticketsData.tickets.reduce(
          (acc: any, ticket: any) => {
            acc[ticket.status] = (acc[ticket.status] || 0) + 1;
            return acc;
          },
          { Шинэ: 0, "Хүлээгдэж байна": 0, "Хийгдэж байна": 0, Хаасан: 0 }
        );

        setStatusCounts(counts);

        // Захиалгын төлөвийг шинэчлэх
        setTickets({
          planned: counts["Хүлээгдэж байна"],
          inProgress: counts["Хийгдэж байна"],
          completed: counts["Хаасан"],
          newTicket: counts["Шинэ"],
        });

        // userTicketsCount-г object-оос массив болгон хөрвүүлэх
        const userTicketsArray = Object.entries(
          ticketsData.closedTicketsCount || {}
        ).map(([userId, ticketCount]) => ({
          userId: String(userId), // userId-г String болгох
          ticketCount: Number(ticketCount),
        }));

        // userTicketsCount-г ашиглан userData-тай нэгтгэх
        const updatedEngineers: Engineer[] = usersData.data.map((user: any) => {
          const userId = String(user._id);
          const userTicket = userTicketsArray.find(
            (ticket) => String(ticket.userId) === userId
          );
          return {
            ...user,
            userId: userId,
            ticketCount: userTicket ? userTicket.ticketCount : 0,
          };
        });
        console.log("updatedEngineers --> ", updatedEngineers);
        setEngineers(updatedEngineers);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (error) return <p className="text-red-500">Алдаа: {error}</p>;

  const { planned, inProgress, completed, newTicket } = tickets;
  const total =
    (planned || 0) + (inProgress || 0) + (completed || 0) + (newTicket || 0);

  const chartData = {
    labels: ["Шинэ", "Хүлээгдэж байна", "Хийгдэж байна", "Хаасан"],
    className: "text-gray0-600 dark:text-gray-300 text-[12px] 2xl:text-base",
    datasets: [
      {
        label: "Ажлын захиалгууд",
        data: [newTicket, planned, inProgress, completed],
        backgroundColor: ["#4BC0C0", "#FFCD56", "#36A2EB", "#FF6384"],
        hoverBackgroundColor: ["#5AD3D1", "#FFD685", "#4BC8FF", "#FF809B"],
        borderColor: "#ffffff",
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="w-full bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
      <h2 className="text-lg text-center text-gray-600 dark:text-gray-300 font-bold pb-4">
        Мэдээлэл технологийн албаны ажлын захиалга
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <EmploymentDashboard employment={engineers ?? []} />
        <div className="flex flex-col items-center">
          <div className="w-[300px] h-[300px]">
            <Pie data={chartData} />
          </div>
          <div className="mt-4 text-gray-600 dark:text-gray-300 text-[12px] 2xl:text-base">
            <p>Шинэ: {newTicket}</p>
            <p>Хүлээгдэж байна: {planned}</p>
            <p>Хийгдэж байна: {inProgress || 0}</p>
            <p>Хаасан: {completed}</p>
            <p className="font-bold">Нийт дуудлага: {total}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketDashboard;
