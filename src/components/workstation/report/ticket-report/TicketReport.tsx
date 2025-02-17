"use client";
import { useState } from "react";

export default function TicketReport() {
  const [filterType, setFilterType] = useState("day");
  const [filterValue, setFilterValue] = useState("");

  const downloadExcel = async () => {
    if (!filterValue) {
      alert("Шүүлтүүрийн огноог оруулна уу!");
      return;
    }

    const response = await fetch(
      `/api/export-excel/tickets-report?filter=${filterType}&value=${filterValue}`
    );
    if (!response.ok) {
      alert("Excel татахад алдаа гарлаа.");
      return;
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `report_${filterType}_${filterValue}.xlsx`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="">
      <div className="w-full max-w-lg bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition duration-200 ease-in-out hover:shadow-xl">
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100 mb-4">
          📋 Ажлын захиалга
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* 🔹 Шүүлтүүрийн төрөл */}
          <div>
            <label className="block text-gray-600 dark:text-gray-300 font-medium mb-1">
              Шүүлтүүрийн төрөл:
            </label>
            <select
              className="w-full px-4 py-2 border rounded-md text-gray-700 dark:text-gray-200 bg-gray-50 dark:bg-gray-700 focus:ring focus:ring-blue-300"
              value={filterType}
              onChange={(e) => {
                setFilterType(e.target.value);
                setFilterValue(""); // Clear the filter input when changing type
              }}
            >
              <option value="day">Өдөр</option>
              <option value="week">7 хоног</option>
              <option value="month">Сар</option>
              <option value="year">Жил</option>
            </select>
          </div>

          {/* 🔹 Огнооны сонголт */}
          <div>
            <label className="block text-gray-600 dark:text-gray-300 font-medium mb-1">
              Огноо сонгох:
            </label>
            {filterType === "day" && (
              <input
                type="date"
                className="w-full px-4 py-2 border rounded-md text-gray-700 dark:text-gray-200 bg-gray-50 dark:bg-gray-700 focus:ring focus:ring-blue-300"
                value={filterValue}
                onChange={(e) => setFilterValue(e.target.value)}
              />
            )}

            {filterType === "week" && (
              <input
                type="date"
                className="w-full px-4 py-2 border rounded-md text-gray-700 dark:text-gray-200 bg-gray-50 dark:bg-gray-700 focus:ring focus:ring-blue-300"
                value={filterValue}
                onChange={(e) => setFilterValue(e.target.value)}
              />
            )}

            {filterType === "month" && (
              <input
                type="month"
                className="w-full px-4 py-2 border rounded-md text-gray-700 dark:text-gray-200 bg-gray-50 dark:bg-gray-700 focus:ring focus:ring-blue-300"
                value={filterValue}
                onChange={(e) => setFilterValue(e.target.value)}
              />
            )}

            {filterType === "year" && (
              <input
                type="number"
                className="w-full px-4 py-2 border rounded-md text-gray-700 dark:text-gray-200 bg-gray-50 dark:bg-gray-700 focus:ring focus:ring-blue-300"
                placeholder="2025"
                min="2000"
                max="2100"
                value={filterValue}
                onChange={(e) => setFilterValue(e.target.value)}
              />
            )}
          </div>
        </div>

        {/* 🔹 Excel татах товч */}
        <button
          onClick={downloadExcel}
          className="mt-6 w-full py-3 px-4 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-700 transition"
        >
          📂 Excel татах
        </button>
      </div>
    </div>
  );
}
