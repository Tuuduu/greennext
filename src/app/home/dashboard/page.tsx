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
    <div className="w-full h-screen flex flex-col items-center bg-gray-50 dark:bg-gray-900">
      <DashboardTable />
    </div>
  );
}
