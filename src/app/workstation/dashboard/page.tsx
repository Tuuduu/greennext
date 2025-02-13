import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/library/nextauth/AuthOptions";
import DashboardTable from "@/components/workstation/ticket-dashboard/DashboardTable";

export default async function page() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/");
  }

  return (
    <div className="w-full h-screen flex flex-col items-center">
      <DashboardTable />
    </div>
  );
}
