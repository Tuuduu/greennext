import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import DashboardTable from "@/components/dashboard/ticket-dashboard/DashboardTable";

export default async function page() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/");
  }

  return (
    <div className="w-full h-screen bg-gray-50 flex flex-col items-center">
      <DashboardTable />
    </div>
  );
}
