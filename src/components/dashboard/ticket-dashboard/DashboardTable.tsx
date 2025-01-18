import React from "react";
import TicketDashboardTable from "./TicketDashboardTable";
import UserDashboardTab from "./UserDashboardTab";
import TicketCompanyDashboard from "./TicketCompanyDashboard";

export default function DashboardTable() {
  return (
    <div className="w-auto p-6 flex flex-row">
      <TicketDashboardTable data={""} />
      {/* <UserDashboardTab data={""} /> */}
      <TicketCompanyDashboard />
    </div>
  );
}
