"use client";

export default function ReportPage() {
  const downloadExcel = async () => {
    const response = await fetch("/api/export-excel");
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "report.xlsx";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <button
        onClick={downloadExcel}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700"
      >
        Excel татах
      </button>
    </div>
  );
}
