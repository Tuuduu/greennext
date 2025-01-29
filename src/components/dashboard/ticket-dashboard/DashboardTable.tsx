import React from "react";
import TicketDashboardTable from "./TicketDashboardTable";
import TicketCompanyDashboard from "./TicketCompanyDashboard";

export default function DashboardTable() {
  return (
    <div className="w-full flex flex-col gap-y-5">
      <TicketDashboardTable />
      {/* <UserDashboardTab data={""} /> */}
      <TicketCompanyDashboard />
    </div>
  );
}
